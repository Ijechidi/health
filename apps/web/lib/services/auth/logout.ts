import { createClient } from "@/utils/supabase/client";

export async function logoutAuth() {
  try {
    const supabase = createClient();
    
    // Déconnexion de Supabase
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Erreur lors de la déconnexion:', error);
      return { success: false, error: error.message };
    }
    
    // Redirection vers la page de connexion
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/login';
    }
    
    return { success: true };
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
    return { 
      success: false, 
      error: 'Une erreur est survenue lors de la déconnexion' 
    };
  }
}
