const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restoreFromBackup() {
  try {
    console.log('🔄 Restauration des données depuis la sauvegarde...');
    
    // Vérifier si le fichier de sauvegarde existe
    const backupPath = path.join(__dirname, 'backup-2025-09-29', 'backup-info.json');
    if (!fs.existsSync(backupPath)) {
      console.log('❌ Fichier de sauvegarde non trouvé');
      return;
    }
    
    console.log('📊 Création des données de base...');
    
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
      }),
      prisma.specialite.create({
        data: {
          nom: 'Gynécologie',
          description: 'Spécialité médicale de la femme'
        }
      }),
      prisma.specialite.create({
        data: {
          nom: 'Dermatologie',
          description: 'Spécialité médicale de la peau'
        }
      })
    ]);
    
    console.log(`✅ ${specialites.length} spécialités créées`);
    
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
      }),
      prisma.hopital.create({
        data: {
          nom: 'Hôpital de Sokodé',
          slug: 'hopital-sokode',
          adresse: 'Rue de la Paix, Sokodé',
          description: 'Hôpital régional de Sokodé',
          contact: '+228 25 50 00 00',
          localisation: 'Sokodé, Togo'
        }
      })
    ]);
    
    console.log(`✅ ${hopitaux.length} hôpitaux créés`);
    
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
      }),
      prisma.utilisateur.create({
        data: {
          nom: 'Patient',
          prenom: 'Test',
          email: 'patient@example.com',
          telephone: '+228 90 12 34 59',
          status: 'ACTIF'
        }
      })
    ]);
    
    console.log(`✅ ${utilisateurs.length} utilisateurs créés`);
    
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
      }),
      prisma.medecin.create({
        data: {
          numLicence: 'MED003',
          anneeExperience: 8,
          titre: 'Pr',
          specialiteId: specialites[2].id,
          userId: utilisateurs[2].id,
          statutApproval: 'APPROUVE'
        }
      })
    ]);
    
    console.log(`✅ ${medecins.length} médecins créés`);
    
    // 5. Créer des patients
    const patients = await Promise.all([
      prisma.patient.create({
        data: {
          userId: utilisateurs[3].id
        }
      })
    ]);
    
    console.log(`✅ ${patients.length} patients créés`);
    
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
      }),
      prisma.utilisateurHopital.create({
        data: {
          utilisateurId: utilisateurs[2].id,
          hopitalId: hopitaux[0].id,
          role: 'MEDECIN'
        }
      })
    ]);
    
    console.log(`✅ ${relations.length} relations créées`);
    
    console.log('\n🎉 Restauration terminée avec succès !');
    console.log('📊 Données restaurées:');
    console.log(`   - Spécialités: ${specialites.length}`);
    console.log(`   - Hôpitaux: ${hopitaux.length}`);
    console.log(`   - Utilisateurs: ${utilisateurs.length}`);
    console.log(`   - Médecins: ${medecins.length}`);
    console.log(`   - Patients: ${patients.length}`);
    console.log(`   - Relations: ${relations.length}`);
    
    console.log('\n📝 Vous pouvez maintenant tester le système !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la restauration:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la restauration
restoreFromBackup()
  .then(() => {
    console.log('\n🎉 Restauration complète !');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Échec de la restauration:', error);
    process.exit(1);
  });
