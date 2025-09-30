import { prisma } from "@/lib/database/prisma";

export interface SyncUserData {
  id: string;
  email: string;
  nom?: string;
  prenom?: string;
  role?: string;
  created_at: string;
}

/**
 * Synchronise un utilisateur de Supabase vers Prisma
 */
export async function syncUserToPrisma(userData: SyncUserData): Promise<{ success: boolean; message: string }> {
  try {
    const { id, email, nom, prenom, role, created_at } = userData;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.utilisateur.findUnique({
      where: { email }
    });

    if (existingUser) {
      return { success: true, message: "Utilisateur déjà synchronisé" };
    }

    // Créer l'utilisateur dans Prisma
    const newUser = await prisma.utilisateur.create({
      data: {
        id, // Utiliser l'ID de Supabase
        nom: nom || 'Unknown',
        prenom: prenom || null,
        email,
        telephone: null,
        dateCreation: new Date(created_at)
      }
    });

    // Créer le profil selon le rôle
    const userRole = role || 'patient';

    if (userRole === 'admin' || userRole === 'ADMIN') {
      await prisma.administrateur.create({
        data: {
          userId: newUser.id,
          fonction: 'gestionnaire'
        }
      });
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
    } else {
      // Par défaut, créer un profil patient
      await prisma.patient.create({
        data: {
          userId: newUser.id,
          dateNaissance: new Date('1990-01-01'),
          sexe: 'Homme'
        }
      });
    }

    return { success: true, message: "Utilisateur synchronisé avec succès" };

  } catch (error) {
    console.error('Error syncing user to Prisma:', error);
    return { success: false, message: "Erreur lors de la synchronisation" };
  }
}

/**
 * Synchronise tous les utilisateurs de Supabase vers Prisma
 */
export async function syncAllUsersFromSupabase(): Promise<{ success: boolean; message: string; count: number }> {
  try {
    // Récupérer tous les utilisateurs de Supabase
    const authUsers = await prisma.$queryRaw`
      SELECT id, email, raw_user_meta_data, created_at 
      FROM auth.users 
      ORDER BY created_at DESC
    `;

    let syncedCount = 0;

    for (const user of authUsers) {
      const { id, email, raw_user_meta_data, created_at } = user;
      const metadata = raw_user_meta_data || {};
      const { nom, prenom, role } = metadata;

      const result = await syncUserToPrisma({
        id,
        email,
        nom,
        prenom,
        role,
        created_at
      });

      if (result.success) {
        syncedCount++;
      }
    }

    return { 
      success: true, 
      message: `Synchronisation terminée: ${syncedCount} utilisateurs traités`,
      count: syncedCount
    };

  } catch (error) {
    console.error('Error syncing all users:', error);
    return { success: false, message: "Erreur lors de la synchronisation globale", count: 0 };
  }
}
