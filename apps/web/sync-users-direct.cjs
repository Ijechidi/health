const { PrismaClient } = require('../../packages/database/generated/prisma');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://postgres.jmpyywklilgqruacvtlj:Ijeoma3,@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
    }
  }
});

async function syncUsersDirect() {
  try {
    console.log('🔄 Synchronizing users directly from Supabase auth.users table...');
    
    // Récupérer les utilisateurs directement de la table auth.users
    const authUsers = await prisma.$queryRaw`
      SELECT id, email, created_at, raw_user_meta_data, raw_app_meta_data
      FROM auth.users 
      WHERE deleted_at IS NULL
    `;
    
    console.log(`📊 Found ${authUsers.length} users in Supabase auth.users`);
    
    for (const user of authUsers) {
      try {
        const userMetadata = user.raw_user_meta_data || {};
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

syncUsersDirect();
