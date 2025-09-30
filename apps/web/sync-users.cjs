const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('../../packages/database/generated/prisma');

const supabase = createClient(
  'https://jmpyywklilgqruacvtlj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcHl5d2tsaWxncXJ1YWN2dGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NDEwMDMsImV4cCI6MjA3NDAxNzAwM30.dCjMmsmJbUIUVi79xMs5IfFgMuGRiigTO5Cc2vXRLb8',
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.jmpyywklilgqruacvtlj:Ijeoma3,@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
    }
  }
});

async function syncUsers() {
  try {
    console.log('🔄 Synchronizing users from Supabase to Prisma...');
    
    // Récupérer les utilisateurs de Supabase
    const { data: supabaseUsers, error: supabaseError } = await supabase.auth.admin.listUsers();
    
    if (supabaseError) {
      console.error('❌ Error fetching Supabase users:', supabaseError);
      return;
    }
    
    console.log(`📊 Found ${supabaseUsers.users.length} users in Supabase`);
    
    for (const user of supabaseUsers.users) {
      try {
        const userMetadata = user.user_metadata || {};
        const role = userMetadata.role || 'patient';
        
        console.log(`👤 Processing user: ${userMetadata.prenom} ${userMetadata.nom} (${user.email}) - Role: ${role}`);
        
        // Vérifier si l'utilisateur existe déjà dans Prisma
        const existingUser = await prisma.utilisateur.findUnique({
          where: { email: user.email }
        });
        
        if (existingUser) {
          console.log(`⚠️  User ${user.email} already exists, skipping...`);
          continue;
        }
        
        // Créer l'utilisateur dans Prisma
        const newUser = await prisma.utilisateur.create({
          data: {
            id: user.id,
            nom: userMetadata.nom || 'Unknown',
            prenom: userMetadata.prenom || null,
            email: user.email,
            telephone: userMetadata.telephone || null,
            dateCreation: new Date(user.created_at)
          }
        });
        
        // Créer le profil spécifique selon le rôle
        if (role === 'admin') {
          await prisma.administrateur.create({
            data: {
              userId: newUser.id,
              fonction: 'gestionnaire'
            }
          });
          console.log(`✅ Created admin profile for ${user.email}`);
        } else if (role === 'medecin') {
          // Créer une spécialité par défaut si nécessaire
          let specialite = await prisma.specialite.findFirst({
            where: { nom: 'Médecine générale' }
          });
          
          if (!specialite) {
            specialite = await prisma.specialite.create({
              data: {
                nom: 'Médecine générale',
                description: 'Spécialité par défaut'
              }
            });
          }
          
          await prisma.medecin.create({
            data: {
              userId: newUser.id,
              specialiteId: specialite.id,
              numLicence: `LIC-${Date.now()}`,
              titre: 'Dr.',
              anneeExperience: 0
            }
          });
          console.log(`✅ Created doctor profile for ${user.email}`);
        } else if (role === 'patient') {
          await prisma.patient.create({
            data: {
              userId: newUser.id,
              dateNaissance: new Date('1990-01-01'),
              sexe: 'Homme'
            }
          });
          console.log(`✅ Created patient profile for ${user.email}`);
        }
        
      } catch (error) {
        console.error(`❌ Error processing user ${user.email}:`, error.message);
      }
    }
    
    console.log('✅ Synchronization completed!');
    
    // Vérifier les utilisateurs dans Prisma
    const prismaUsers = await prisma.utilisateur.findMany({
      include: {
        administrateur: true,
        medecin: { include: { specialite: true } },
        patient: true
      }
    });
    
    console.log(`📊 Total users in Prisma database: ${prismaUsers.length}`);
    prismaUsers.forEach(user => {
      let role = 'patient';
      if (user.administrateur) role = 'admin';
      else if (user.medecin) role = 'medecin';
      
      console.log(`- ${user.prenom} ${user.nom} (${user.email}) - ${role}`);
    });
    
  } catch (error) {
    console.error('❌ Synchronization failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

syncUsers();
