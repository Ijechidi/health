// types/user.ts
export const UserRoles = {
    ADMIN: "ADMIN",
    MEDECIN: "MEDECIN", 
    PATIENT: "PATIENT",
    GUEST: "GUEST"
  } as const;
  
  export type AdminFunction = "gestionnaire" | "super_admin";
  
  export type Role = typeof UserRoles[keyof typeof UserRoles];
  
  export const Functions = {
    SUPER_ADMIN: "super_admin",
    GESTIONNAIRE: "gestionnaire",
    MEDECIN: "MEDECIN",
    PATIENT: "PATIENT",
  } as const;
  
  export type Functions = typeof Functions[keyof typeof Functions];
  
  export interface Hopital {
    id?: string;
    nom?: string;
    slug?: string;
    adresse?: string;
    description?: string;
    contact?: string;
    localisation?: string;
    permissions?: string[];
  }
  
  export interface UserInfo {
    id?: string;
    email?: string;
    role?: Role;
    nom?: string;
    prenom?: string;
    avatar_url?: string;
    telephone?: string;
    email_verified?: boolean;
    phone_verified?: boolean;
    function?: Functions;
    hopital?: Hopital;
    hopitaux?: Hopital[];
    
    // Informations spécifiques au médecin
    medecin?: {
      id?: string;
      specialite?: string;
      numLicence?: string;
      anneeExperience?: number;
      titre?: string;
    };
    
    // Informations spécifiques au patient
    patient?: {
      id?: string;
      dateNaissance?: string;
      adresse?: string;
      groupeSanguin?: string;
      poids?: number;
      taille?: number;
      sexe?: string;
    };
    
    // Informations d'administration
    administrateur?: {
      id?: string;
      fonction?: AdminFunction;
    };
    
    invited_by?: {
      id?: string;
      nom?: string;
      email?: string;
    };
    status?: string;
    invitationToken?: string;
    invitationType?: string;
    dateCreation?: string;
  }