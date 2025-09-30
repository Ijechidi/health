const { PrismaClient } = require('../../packages/database/generated/prisma');

async function testNewDatabase() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres.jgtouhbsfnkarnmqghbv:Ijeoma3,@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
      }
    }
  });

  try {
    console.log('🔄 Testing new database connection...');
    const users = await prisma.utilisateur.findMany();
    console.log('✅ New database connected successfully!');
    console.log(`📊 Found ${users.length} users`);
    users.forEach(user => {
      console.log(`- ${user.prenom} ${user.nom} (${user.email})`);
    });
  } catch (error) {
    console.error('❌ New database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testNewDatabase();
