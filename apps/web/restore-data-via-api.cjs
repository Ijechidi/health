// Script pour restaurer les données via l'API web
// Attendre que le serveur soit prêt, puis ajouter les données

const https = require('https');
const http = require('http');

function makeRequest(url, data) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    };

    const req = client.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(body);
          resolve({ status: res.statusCode, data: result });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    req.write(JSON.stringify(data));
    req.end();
  });
}

async function restoreData() {
  const baseUrl = 'http://localhost:3000/api';
  
  console.log('🔄 Restauration des données via API...');
  
  try {
    // 1. Ajouter des spécialités
    console.log('📊 Ajout des spécialités...');
    const specialites = [
      { nom: 'Cardiologie', description: 'Spécialité médicale du cœur et des vaisseaux' },
      { nom: 'Neurologie', description: 'Spécialité médicale du système nerveux' },
      { nom: 'Pédiatrie', description: 'Spécialité médicale des enfants' },
      { nom: 'Gynécologie', description: 'Spécialité médicale de la femme' },
      { nom: 'Dermatologie', description: 'Spécialité médicale de la peau' }
    ];
    
    for (const spec of specialites) {
      try {
        const response = await makeRequest(`${baseUrl}/admin/specialties`, spec);
        console.log(`✅ Spécialité "${spec.nom}" ajoutée`);
      } catch (error) {
        console.log(`⚠️  Spécialité "${spec.nom}": ${error.message}`);
      }
    }
    
    // 2. Ajouter des hôpitaux
    console.log('🏥 Ajout des hôpitaux...');
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
      },
      {
        nom: 'Hôpital de Sokodé',
        slug: 'hopital-sokode',
        adresse: 'Rue de la Paix, Sokodé',
        description: 'Hôpital régional de Sokodé',
        contact: '+228 25 50 00 00',
        localisation: 'Sokodé, Togo'
      }
    ];
    
    for (const hopital of hopitaux) {
      try {
        const response = await makeRequest(`${baseUrl}/admin/hospitals`, hopital);
        console.log(`✅ Hôpital "${hopital.nom}" ajouté`);
      } catch (error) {
        console.log(`⚠️  Hôpital "${hopital.nom}": ${error.message}`);
      }
    }
    
    console.log('\n🎉 Données restaurées avec succès !');
    console.log('📝 Vous pouvez maintenant tester le système sur http://localhost:3000');
    
  } catch (error) {
    console.error('❌ Erreur lors de la restauration:', error);
  }
}

// Attendre 10 secondes que le serveur démarre, puis restaurer
console.log('⏳ Attente du démarrage du serveur...');
setTimeout(() => {
  restoreData();
}, 10000);
