//src/services/auth/signup.ts
"use server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "./database";
import { syncUserToPrisma } from "@/lib/services/auth/sync-user";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function signupAuth(email: string, password: string, nom?: string, prenom?: string, role?: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${baseUrl}/auth/callback`,
      data: {
        nom: nom || '',
        prenom: prenom || '',
        role: role || 'PATIENT', // Par défaut PATIENT
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  // Synchroniser automatiquement l'utilisateur vers Prisma
  if (data.user) {
    try {
      await syncUserToPrisma({
        id: data.user.id,
        email: data.user.email!,
        nom: nom || '',
        prenom: prenom || '',
        role: role || 'PATIENT',
        created_at: data.user.created_at
      });
      console.log(`✅ User ${email} automatically synced to Prisma`);
    } catch (syncError) {
      console.error('Error syncing user to Prisma:', syncError);
      // Ne pas faire échouer l'inscription si la synchronisation échoue
    }
  }

  return { data: data.user };
}


export async function signupWithDatabase(email: string, prenom: string, nom: string) {
  const user = await prisma.utilisateur.create({
    data: { email, nom: nom, prenom:prenom },
  });

  return { data: user };
}

