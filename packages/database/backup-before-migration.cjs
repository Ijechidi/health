const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function createBackup() {
  try {
    console.log('🔄 Début de la sauvegarde...');
    
    // 1. Sauvegarder tous les utilisateurs
    const utilisateurs = await prisma.utilisateur.findMany({
      include: {
        medecin: {
          include: {
            specialite: true
          }
        },
        patient: true,
        administrateur: true,
        utilisateurHopitals: {
          include: {
            hopital: true
          }
        }
      }
    });

    // 2. Sauvegarder tous les hôpitaux
    const hopitaux = await prisma.hopital.findMany();

    // 3. Sauvegarder toutes les spécialités
    const specialites = await prisma.specialite.findMany();

    // 4. Sauvegarder tous les rendez-vous
    const rendezVous = await prisma.rendezVous.findMany();

    // 5. Créer le fichier de sauvegarde
    const backup = {
      timestamp: new Date().toISOString(),
      utilisateurs,
      hopitaux,
      specialites,
      rendezVous,
      counts: {
        utilisateurs: utilisateurs.length,
        hopitaux: hopitaux.length,
        specialites: specialites.length,
        rendezVous: rendezVous.length
      }
    };

    // 6. Sauvegarder dans un fichier
    const backupPath = path.join(__dirname, `backup-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));

    console.log('✅ Sauvegarde créée avec succès !');
    console.log(`📁 Fichier: ${backupPath}`);
    console.log('📊 Statistiques:');
    console.log(`   - Utilisateurs: ${backup.counts.utilisateurs}`);
    console.log(`   - Hôpitaux: ${backup.counts.hopitaux}`);
    console.log(`   - Spécialités: ${backup.counts.specialites}`);
    console.log(`   - Rendez-vous: ${backup.counts.rendezVous}`);

    return backupPath;

  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter la sauvegarde
createBackup()
  .then(backupPath => {
    console.log(`\n🎉 Sauvegarde terminée: ${backupPath}`);
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Échec de la sauvegarde:', error);
    process.exit(1);
  });
