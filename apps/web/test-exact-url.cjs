const { PrismaClient } = require('../../packages/database/generated/prisma');

async function testExactUrl() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres.jgtouhbsfnkarnmqghbv:Ijeoma3,@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
      }
    }
  });

  try {
    console.log('🔄 Testing exact database URL...');
    const users = await prisma.utilisateur.findMany();
    console.log('✅ Database connected successfully!');
    console.log(`📊 Found ${users.length} users`);
    users.forEach(user => {
      console.log(`- ${user.prenom} ${user.nom} (${user.email})`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testExactUrl();
