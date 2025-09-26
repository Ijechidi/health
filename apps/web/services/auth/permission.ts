import { Functions, Role, UserInfo } from "@/types/user";
import { getUserInfo } from "../users/userInfo";


  // ==========================================
  // autorisation
  // ==========================================
  
  // types pour plus de clarté
  // export type AuthorizationResult = { success: true } | { success: false; error: string };
  
  // /**
  //  * Vérifie si l'utilisateur a le rôle requis pour effectuer une action
  //  * @param user L'utilisateur connecté
  //  * @param requiredRole Rôle minimum requis
  //  */
  // export async function getAuthorization(user: UserInfo, requiredRole: Role): Promise<AuthorizationResult> {
  //   const userRole = user.role;
  //   const userFunction = user.function;
  
  //   if (!userRole) {
  //     return { success: false, error: "Utilisateur non authentifié" };
  //   }
  
  //   // SUPER_ADMIN passe toujours
  //   if (userFunction === Functions.SUPER_ADMIN
  //   }
  
  //   // Vérification stricte selon le rôle requis
  //   if (requiredRole === "ADMIN" && userRole !== "ADMIN") {
  //     return { success: false, error: "Seuls les administrateurs peuvent effectuer cette action" };
  //   }
  
  //   if (requiredRole === "TEACHER" && !["ADMIN", "TEACHER"].includes(userRole)) {
  //     return { success: false, error: "Privilèges insuffisants pour cette action" };
  //   }
  
  //   // Si aucun des cas n'a échoué, autorisation OK
  //   return { success: true };
  //   }
  
  
  /**
   * Vérifie si l'utilisateur a une permission spécifique dans son organisation
   * @param user L'utilisateur connecté
   * @param permission Nom de la permission à vérifier
   */
  // export async function userHasPermission(user: UserInfo, permission: string):  Promise<boolean> {
  //   if (!user.organization?.permissions) return false;
  //   return user.organization.permissions.includes(permission);
  // }
  
  /**
   * Vérifie à la fois rôle et permission
   * @param user L'utilisateur
   * @param requiredRole Rôle minimum requis
   * @param permission Permission à vérifier (optionnel)
   */
  // export async function authorize(user: UserInfo, requiredRole: Role, permission?: string): Promise<AuthorizationResult>  {
  //   const roleCheck = await getAuthorization(user, requiredRole);
  //   if (!roleCheck.success) return roleCheck;
  
  //   if (permission && !userHasPermission(user, permission)) {
  //     return { success: false, error: "Vous n'avez pas la permission requise pour cette action" };
  //   }
  
  //   return { success: true };
  // }
  
  // Fonction pour vérifier si l'utilisateur a un rôle spécifique
export async function userHasRole(role: Role): Promise<boolean> {
    const userInfo = await getUserInfo();
    return userInfo?.role === role ;
  }
  
  
  
  // // Fonction pour vérifier si l'utilisateur a une permission spécifique
//   export async function userHasPermission(permission: string): Promise<boolean> {
//     const userInfo = await getUserInfo();
//     return userInfo?.organization?.permissions?.includes(permission) || false;
//   }