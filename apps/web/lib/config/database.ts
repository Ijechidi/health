// Configuration de la base de données
export const databaseConfig = {
  url: "postgresql://postgres.jgtouhbsfnkarnmqghbv:Ijeoma3,@aws-1-eu-north-1.pooler.supabase.com:5432/postgres",
  shadowUrl: "postgresql://postgres.jgtouhbsfnkarnmqghbv:Ijeoma3,@aws-1-eu-north-1.pooler.supabase.com:5432/postgres"
};

// Configuration Supabase
export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://jgtouhbsfnkarnmqghbv.supabase.co",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcHl5d2tsaWxncXJ1YWN2dGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg0NDEwMDMsImV4cCI6MjA3NDAxNzAwM30.dCjMmsmJbUIUVi79xMs5IfFgMuGRiigTO5Cc2vXRLb8"
};
