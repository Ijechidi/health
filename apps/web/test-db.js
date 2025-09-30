const { PrismaClient } = require('../../packages/database/generated/prisma');

async function testConnection() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: "postgresql://postgres.jmpyywklilgqruacvtlj:Ijeoma3,@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
      }
    }
  });

  try {
    console.log('Testing database connection...');
    const users = await prisma.utilisateur.findMany();
    console.log('✅ Database connected successfully!');
    console.log(`Found ${users.length} users`);
    console.log('Users:', users.map(u => ({ id: u.id, nom: u.nom, email: u.email })));
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

testConnection();
