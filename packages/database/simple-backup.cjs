const fs = require('fs');
const path = require('path');

// Créer une sauvegarde simple des fichiers importants
async function createSimpleBackup() {
  try {
    console.log('🔄 Création de la sauvegarde simple...');
    
    const timestamp = new Date().toISOString().split('T')[0];
    const backupDir = path.join(__dirname, `backup-${timestamp}`);
    
    // Créer le dossier de sauvegarde
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    // 1. Sauvegarder le schéma Prisma
    const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');
    const schemaBackup = path.join(backupDir, 'schema.prisma');
    fs.copyFileSync(schemaPath, schemaBackup);
    console.log('✅ Schéma Prisma sauvegardé');
    
    // 2. Sauvegarder les migrations existantes
    const migrationsDir = path.join(__dirname, 'prisma', 'migrations');
    const migrationsBackup = path.join(backupDir, 'migrations');
    if (fs.existsSync(migrationsDir)) {
      fs.cpSync(migrationsDir, migrationsBackup, { recursive: true });
      console.log('✅ Migrations sauvegardées');
    }
    
    // 3. Sauvegarder le fichier .env
    const envPath = path.join(__dirname, '.env');
    const envBackup = path.join(backupDir, '.env');
    if (fs.existsSync(envPath)) {
      fs.copyFileSync(envPath, envBackup);
      console.log('✅ Fichier .env sauvegardé');
    }
    
    // 4. Créer un fichier d'information
    const info = {
      timestamp: new Date().toISOString(),
      backupType: 'simple',
      description: 'Sauvegarde avant migration - ajout statutApproval',
      files: [
        'schema.prisma',
        'migrations/',
        '.env'
      ],
      instructions: [
        '1. Ceci est une sauvegarde des fichiers de configuration',
        '2. Les données de la base ne sont pas sauvegardées ici',
        '3. Pour restaurer: copier les fichiers depuis ce dossier',
        '4. La migration ajoute seulement un champ avec valeur par défaut'
      ]
    };
    
    const infoPath = path.join(backupDir, 'backup-info.json');
    fs.writeFileSync(infoPath, JSON.stringify(info, null, 2));
    
    console.log('✅ Sauvegarde simple créée avec succès !');
    console.log(`📁 Dossier: ${backupDir}`);
    console.log('📋 Fichiers sauvegardés:');
    console.log('   - schema.prisma');
    console.log('   - migrations/');
    console.log('   - .env');
    console.log('   - backup-info.json');
    
    return backupDir;
    
  } catch (error) {
    console.error('❌ Erreur lors de la sauvegarde:', error);
    throw error;
  }
}

// Exécuter la sauvegarde
createSimpleBackup()
  .then(backupDir => {
    console.log(`\n🎉 Sauvegarde terminée: ${backupDir}`);
    console.log('\n📝 Prochaines étapes:');
    console.log('1. Vérifier que la connexion à la base fonctionne');
    console.log('2. Exécuter la migration: npx prisma migrate dev');
    console.log('3. Vérifier que les données sont préservées');
    process.exit(0);
  })
  .catch(error => {
    console.error('💥 Échec de la sauvegarde:', error);
    process.exit(1);
  });
