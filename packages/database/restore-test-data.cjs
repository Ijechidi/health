const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestData() {
  try {
    console.log('🔄 Création des données de test...');
    
    // 1. Créer des spécialités
    const specialites = await Promise.all([
      prisma.specialite.create({
        data: {
          nom: 'Cardiologie',
          description: 'Spécialité médicale du cœur et des vaisseaux'
        }
      }),
      prisma.specialite.create({
        data: {
          nom: 'Neurologie',
          description: 'Spécialité médicale du système nerveux'
        }
      }),
      prisma.specialite.create({
        data: {
          nom: 'Pédiatrie',
          description: 'Spécialité médicale des enfants'
        }
      })
    ]);
    
    console.log('✅ Spécialités créées:', specialites.length);
    
    // 2. Créer des hôpitaux
    const hopitaux = await Promise.all([
      prisma.hopital.create({
        data: {
          nom: 'CHU de Lomé',
          slug: 'chu-lome',
          adresse: 'Boulevard du 13 Janvier, Lomé',
          description: 'Centre Hospitalier Universitaire de Lomé',
          contact: '+228 22 21 20 19',
          localisation: 'Lomé, Togo'
        }
      }),
      prisma.hopital.create({
        data: {
          nom: 'Hôpital de Kara',
          slug: 'hopital-kara',
          adresse: 'Avenue de la République, Kara',
          description: 'Hôpital régional de Kara',
          contact: '+228 26 60 00 00',
          localisation: 'Kara, Togo'
        }
      })
    ]);
    
    console.log('✅ Hôpitaux créés:', hopitaux.length);
    
    // 3. Créer des utilisateurs
    const utilisateurs = await Promise.all([
      prisma.utilisateur.create({
        data: {
          nom: 'Doe',
          prenom: 'John',
          email: 'john.doe@example.com',
          telephone: '+228 90 12 34 56',
          status: 'ACTIF'
        }
      }),
      prisma.utilisateur.create({
        data: {
          nom: 'Smith',
          prenom: 'Jane',
          email: 'jane.smith@example.com',
          telephone: '+228 90 12 34 57',
          status: 'ACTIF'
        }
      }),
      prisma.utilisateur.create({
        data: {
          nom: 'Admin',
          prenom: 'Super',
          email: 'admin@example.com',
          telephone: '+228 90 12 34 58',
          status: 'ACTIF'
        }
      })
    ]);
    
    console.log('✅ Utilisateurs créés:', utilisateurs.length);
    
    // 4. Créer des médecins
    const medecins = await Promise.all([
      prisma.medecin.create({
        data: {
          numLicence: 'MED001',
          anneeExperience: 5,
          titre: 'Dr',
          specialiteId: specialites[0].id,
          userId: utilisateurs[0].id,
          statutApproval: 'APPROUVE'
        }
      }),
      prisma.medecin.create({
        data: {
          numLicence: 'MED002',
          anneeExperience: 3,
          titre: 'Dr',
          specialiteId: specialites[1].id,
          userId: utilisateurs[1].id,
          statutApproval: 'EN_ATTENTE'
        }
      })
    ]);
    
    console.log('✅ Médecins créés:', medecins.length);
    
    // 5. Créer des patients
    const patients = await Promise.all([
      prisma.patient.create({
        data: {
          userId: utilisateurs[2].id
        }
      })
    ]);
    
    console.log('✅ Patients créés:', patients.length);
    
    // 6. Créer des relations utilisateur-hôpital
    const relations = await Promise.all([
      prisma.utilisateurHopital.create({
        data: {
          utilisateurId: utilisateurs[0].id,
          hopitalId: hopitaux[0].id,
          role: 'MEDECIN'
        }
      }),
      prisma.utilisateurHopital.create({
        data: {
          utilisateurId: utilisateurs[1].id,
          hopitalId: hopitaux[1].id,
          role: 'MEDECIN'
        }
      })
    ]);
    
    console.log('✅ Relations créées:', relations.length);
    
    console.log('🎉 Données de test créées avec succès !');
    console.log('📊 Résumé:');
    console.log(`   - Spécialités: ${specialites.length}`);
    console.log(`   - Hôpitaux: ${hopitaux.length}`);
    console.log(`   - Utilisateurs: ${utilisateurs.length}`);
    console.log(`   - Médecins: ${medecins.length}`);
    console.log(`   - Patients: ${patients.length}`);
    console.log(`   - Relations: ${relations.length}`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la création des données:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la création des données
createTestData()
  .then(() => {
    console.log('\n🎉 Récupération terminée avec succès !');
    console.log('📝 Vous pouvez maintenant tester le système');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Échec de la récupération:', error);
    process.exit(1);
  });
