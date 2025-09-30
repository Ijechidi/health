const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Configuration de la base de données depuis .env
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL
});

async function backupRealData() {
  try {
    console.log('🔄 Connexion à la base de données...');
    await client.connect();
    
    console.log('📊 Récupération des données...');
    
    // Récupérer toutes les données importantes
    const queries = {
      utilisateurs: 'SELECT * FROM "Utilisateur"',
      hopitaux: 'SELECT * FROM "Hopital"',
      specialites: 'SELECT * FROM "Specialite"',
      medecins: 'SELECT * FROM "Medecin"',
      patients: 'SELECT * FROM "Patient"',
      administrateurs: 'SELECT * FROM "Administrateur"',
      utilisateurHopitals: 'SELECT * FROM "UtilisateurHopital"',
      rendezVous: 'SELECT * FROM "RendezVous"'
    };
    
    const data = {};
    const counts = {};
    
    for (const [table, query] of Object.entries(queries)) {
      try {
        const result = await client.query(query);
        data[table] = result.rows;
        counts[table] = result.rows.length;
        console.log(`✅ ${table}: ${result.rows.length} enregistrements`);
      } catch (error) {
        console.log(`⚠️  ${table}: Table non trouvée ou erreur (${error.message})`);
        data[table] = [];
        counts[table] = 0;
      }
    }
    
    // Créer le fichier de sauvegarde
    const backup = {
      timestamp: new Date().toISOString(),
      database: 'postgres',
      schema: 'public',
      data,
      counts,
      totalRecords: Object.values(counts).reduce((sum, count) => sum + count, 0)
    };
    
    const timestamp = new Date().toISOString().split('T')[0];
    const backupPath = path.join(__dirname, `backup-data-${timestamp}.json`);
    fs.writeFileSync(backupPath, JSON.stringify(backup, null, 2));
    
    console.log('✅ Sauvegarde des données créée avec succès !');
    console.log(`📁 Fichier: ${backupPath}`);
    console.log('📊 Statistiques:');
    Object.entries(counts).forEach(([table, count]) => {
      console.log(`   - ${table}: ${count}`);
    });
    console.log(`   - Total: ${backup.totalRecords} enregistrements`);
    
    return backupPath;
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error);
    throw error;
  } finally {
    await client.end();
  }
}

// Exécuter la sauvegarde
backupRealData()
  .then(backupPath => {
    console.log(`\n🎉 Sauvegarde des données terminée: ${backupPath}`);
    console.log('\n📝 Vous pouvez maintenant procéder à la migration en toute sécurité !');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Échec de la sauvegarde des données:', error);
    process.exit(1);
  });
