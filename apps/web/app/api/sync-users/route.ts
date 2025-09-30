import { NextResponse } from "next/server";
import { prisma } from "@/lib/database/prisma";

export async function POST() {
  try {
    console.log('🔄 Starting automatic user synchronization...');
    
    // Récupérer les utilisateurs depuis la table auth.users de Supabase
    const authUsers = await prisma.$queryRaw`
      SELECT id, email, raw_user_meta_data, created_at 
      FROM auth.users 
      ORDER BY created_at DESC
    `;

    console.log(`📊 Found ${authUsers.length} users in Supabase Auth`);

    const syncedUsers = [];

    for (const user of authUsers) {
      const { id: authId, email, raw_user_meta_data, created_at } = user;
      const metadata = raw_user_meta_data || {};
      const { nom, prenom, role } = metadata;

      // Vérifier si l'utilisateur existe déjà dans notre table Utilisateur
      const existingUser = await prisma.utilisateur.findUnique({
        where: { email }
      });

      if (existingUser) {
        console.log(`⚠️  User ${email} already exists, skipping...`);
        continue;
      }

      // Créer l'utilisateur dans notre table Utilisateur
      const newUser = await prisma.utilisateur.create({
        data: {
          id: authId, // Utiliser l'ID de Supabase
          nom: nom || 'Unknown',
          prenom: prenom || null,
          email,
          telephone: null,
          dateCreation: new Date(created_at)
        }
      });

      console.log(`✅ Created user: ${prenom || 'Unknown'} ${nom || 'User'} (${email})`);

      // Déterminer le rôle et créer le profil approprié
      const userRole = role || 'patient'; // Par défaut patient si pas de rôle spécifié

      if (userRole === 'admin' || userRole === 'ADMIN') {
        await prisma.administrateur.create({
          data: {
            userId: newUser.id,
            fonction: 'gestionnaire'
          }
        });
        console.log(`✅ Created admin profile for ${email}`);
      } else if (userRole === 'medecin' || userRole === 'MEDECIN') {
        // Créer une spécialité par défaut si elle n'existe pas
        let specialite = await prisma.specialite.findFirst({
          where: { nom: 'Médecine générale' }
        });
        
        if (!specialite) {
          specialite = await prisma.specialite.create({
            data: {
              id: 'clx0123456789abcdefghijk',
              nom: 'Médecine générale',
              description: 'Spécialité de médecine générale'
            }
          });
        }

        await prisma.medecin.create({
          data: {
            userId: newUser.id,
            specialiteId: specialite.id,
            numLicence: `LIC-${Date.now()}`,
            titre: 'Dr.'
          }
        });
        console.log(`✅ Created doctor profile for ${email}`);
      } else {
        // Par défaut, créer un profil patient
        await prisma.patient.create({
          data: {
            userId: newUser.id,
            dateNaissance: new Date('1990-01-01'),
            sexe: 'Homme'
          }
        });
        console.log(`✅ Created patient profile for ${email}`);
      }

      syncedUsers.push({
        id: newUser.id,
        email: newUser.email,
        nom: newUser.nom,
        prenom: newUser.prenom,
        role: userRole
      });
    }

    console.log('✅ Automatic synchronization completed!');

    return NextResponse.json({
      success: true,
      message: `Synchronized ${syncedUsers.length} users`,
      data: syncedUsers
    });

  } catch (error) {
    console.error('❌ Automatic synchronization failed:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la synchronisation automatique" },
      { status: 500 }
    );
  }
}
