const fetch = require('node-fetch');

async function addTestData() {
  const baseUrl = 'http://localhost:3000/api';
  
  try {
    console.log('🔄 Ajout des données de test via API...');
    
    // 1. Ajouter des spécialités
    const specialites = [
      { nom: 'Cardiologie', description: 'Spécialité médicale du cœur et des vaisseaux' },
      { nom: 'Neurologie', description: 'Spécialité médicale du système nerveux' },
      { nom: 'Pédiatrie', description: 'Spécialité médicale des enfants' }
    ];
    
    console.log('📊 Ajout des spécialités...');
    for (const spec of specialites) {
      try {
        const response = await fetch(`${baseUrl}/admin/specialties`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(spec)
        });
        const result = await response.json();
        console.log(`✅ Spécialité "${spec.nom}" ajoutée`);
      } catch (error) {
        console.log(`⚠️  Spécialité "${spec.nom}": ${error.message}`);
      }
    }
    
    // 2. Ajouter des hôpitaux
    const hopitaux = [
      {
        nom: 'CHU de Lomé',
        slug: 'chu-lome',
        adresse: 'Boulevard du 13 Janvier, Lomé',
        description: 'Centre Hospitalier Universitaire de Lomé',
        contact: '+228 22 21 20 19',
        localisation: 'Lomé, Togo'
      },
      {
        nom: 'Hôpital de Kara',
        slug: 'hopital-kara',
        adresse: 'Avenue de la République, Kara',
        description: 'Hôpital régional de Kara',
        contact: '+228 26 60 00 00',
        localisation: 'Kara, Togo'
      }
    ];
    
    console.log('🏥 Ajout des hôpitaux...');
    for (const hopital of hopitaux) {
      try {
        const response = await fetch(`${baseUrl}/admin/hospitals`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(hopital)
        });
        const result = await response.json();
        console.log(`✅ Hôpital "${hopital.nom}" ajouté`);
      } catch (error) {
        console.log(`⚠️  Hôpital "${hopital.nom}": ${error.message}`);
      }
    }
    
    console.log('\n🎉 Données de test ajoutées !');
    console.log('📝 Vous pouvez maintenant tester le système via http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des données:', error);
  }
}

// Attendre que le serveur démarre
setTimeout(() => {
  addTestData();
}, 5000);
