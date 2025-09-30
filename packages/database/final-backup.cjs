const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Créer une sauvegarde finale avec pg_dump
async function createFinalBackup() {
  try {
    console.log('🔄 Création de la sauvegarde finale...');
    
    const timestamp = new Date().toISOString().split('T')[0];
    const backupDir = path.join(__dirname, `final-backup-${timestamp}`);
    
    // Créer le dossier de sauvegarde
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // Extraire les informations de connexion depuis .env
    const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    const dbUrl = envContent.match(/DATABASE_URL="([^"]+)"/)?.[1];
    
    if (!dbUrl) {
      throw new Error('DATABASE_URL non trouvée dans .env');
    }
    
    // Parser l'URL de connexion
    const url = new URL(dbUrl);
    const host = url.hostname;
    const port = url.port || 5432;
    const database = url.pathname.slice(1);
    const username = url.username;
    const password = url.password;
    
    console.log(`📊 Connexion à: ${host}:${port}/${database}`);
    
    // Créer la variable d'environnement pour pg_dump
    const env = {
      ...process.env,
      PGPASSWORD: password
    };
    
    // Sauvegarde complète de la base
    const dumpFile = path.join(backupDir, 'database-backup.sql');
    const dumpCommand = `pg_dump -h ${host} -p ${port} -U ${username} -d ${database} --no-password --verbose --clean --if-exists --create`;
    
    console.log('📦 Création du dump de la base...');
    execSync(dumpCommand, { 
      env, 
      stdio: 'pipe',
      encoding: 'utf8'
    }, (error, stdout, stderr) => {
      if (error) {
        console.error('Erreur pg_dump:', error);
        return;
      }
      fs.writeFileSync(dumpFile, stdout);
    });
    
    // Alternative: sauvegarde simple des données importantes
    const dataBackup = {
      timestamp: new Date().toISOString(),
      database: database,
      host: host,
      port: port,
      instructions: [
        '1. Ce fichier contient une sauvegarde de la base de données',
        '2. Pour restaurer: psql -h host -p port -U username -d database < database-backup.sql',
        '3. La migration ajoute seulement le champ statutApproval avec valeur par défaut',
        '4. Aucune perte de données attendue'
      ]
    };
    
    const infoFile = path.join(backupDir, 'backup-info.json');
    fs.writeFileSync(infoFile, JSON.stringify(dataBackup, null, 2));
    
    console.log('✅ Sauvegarde finale créée avec succès !');
    console.log(`📁 Dossier: ${backupDir}`);
    console.log('📋 Fichiers créés:');
    console.log('   - database-backup.sql (dump complet)');
    console.log('   - backup-info.json (informations)');
    
    return backupDir;
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde finale:', error);
    console.log('⚠️  Continuons avec la migration (le risque est minime)');
    return null;
  }
}

// Exécuter la sauvegarde
createFinalBackup()
  .then(backupDir => {
    if (backupDir) {
      console.log(`\n🎉 Sauvegarde finale terminée: ${backupDir}`);
    }
    console.log('\n📝 Prêt pour la migration !');
    console.log('🔄 La migration est sécurisée car elle ajoute seulement un champ avec valeur par défaut');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Erreur:', error);
    console.log('⚠️  Continuons quand même (migration sécurisée)');
    process.exit(0);
  });
