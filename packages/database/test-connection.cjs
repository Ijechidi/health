const { execSync } = require('child_process');

async function testConnection() {
  try {
    console.log('🔄 Test de connexion à la base de données...');
    
    // Test simple avec prisma db pull
    const result = execSync('npx prisma db pull', { 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    
    console.log('✅ Connexion réussie !');
    console.log('📊 Base de données accessible');
    
    // Vérifier les tables
    console.log('\n🔍 Vérification des tables...');
    const tables = [
      'Utilisateur',
      'Hopital', 
      'Specialite',
      'Medecin',
      'Patient',
      'UtilisateurHopital'
    ];
    
    for (const table of tables) {
      try {
        const countResult = execSync(`npx prisma db execute --stdin`, {
          input: `SELECT COUNT(*) FROM "${table}";`,
          encoding: 'utf8',
          cwd: process.cwd()
        });
        console.log(`✅ Table ${table}: accessible`);
      } catch (error) {
        console.log(`❌ Table ${table}: erreur`);
      }
    }
    
    console.log('\n🎉 Test terminé !');
    console.log('📝 Vous pouvez maintenant ajouter des données via l\'interface web');
    
  } catch (error) {
    console.error('❌ Erreur de connexion:', error.message);
    console.log('💡 Suggestion: Vérifiez les credentials dans .env');
  }
}

testConnection();
