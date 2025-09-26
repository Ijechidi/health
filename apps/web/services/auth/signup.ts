//src/services/auth/signup.ts
"use server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "./database";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function signupAuth(email: string, password: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${baseUrl}/auth/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { data: data.user };
}


export async function signupWithDatabase(email: string, prenom: string, nom: string) {
  const user = await prisma.utilisateur.create({
    data: { email, nom: nom, prenom:prenom },
  });

  return { data: user };
}

