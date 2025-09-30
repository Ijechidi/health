// src/services/auth/supabase.ts
import { createClient } from "@/utils/supabase/client";

export const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  success?: boolean;
  redirectPath?: string;
  error?: string;
}

export async function login(credentials: LoginCredentials): Promise<LoginResponse> {
  const { email, password } = credentials;

  const supabase = await createClient();

  try {
    const { data: authData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.log("erreur login:", signInError);
      return { error: "Email ou mot de passe incorrect" };
    }

    if (!authData.user) {
      return { error: "Erreur lors de la connexion" };
    }

    // Les données utilisateur seront revalidées automatiquement par Supabase
    
    // Déterminer le chemin de redirection selon le rôle
    let redirectPath = `${baseUrl}/hopital`; // Par défaut
    
    try {
      // Récupérer les informations utilisateur depuis le token
      const token: any = authData.session?.access_token;
      if (token) {
        const { jwtDecode } = await import('jwt-decode');
        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken.user_metadata?.role;
        
        // Rediriger selon le rôle vers les pages de bienvenue
        switch (userRole) {
          case 'ADMIN':
            redirectPath = `${baseUrl}/admin/welcome`;
            break;
          case 'MEDECIN':
            redirectPath = `${baseUrl}/doctor/welcome`;
            break;
          case 'PATIENT':
            redirectPath = `${baseUrl}/patient/welcome`;
            break;
          default:
            redirectPath = `${baseUrl}/welcome`;
        }
      }
    } catch (tokenError) {
      console.log("Erreur lors du décodage du token:", tokenError);
      // Utiliser le chemin par défaut en cas d'erreur
    }
    
    return { success: true, redirectPath };
    
  } catch (error) {
    console.error("Unexpected error during login:", error);
    return { error: "Une erreur inattendue est survenue" };
  }
}