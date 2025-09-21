"use server";
/* FONCTION SERVER */

// Provider Supabase
export * from "./supabase";

// Fonctions utilitaires
export * from "./utils";












/**
 * Exemple d'utilisation depuis un composant server/client :
 * 
 * import { getOrganization, getOrgId, isSuperAdmin, signUpResponsable } from "@/services/auth/auth";
 * 
 * const org = await getOrganization();
 * const orgId = await getOrgId();
 * const superAdmin = await isSuperAdmin();
 */
