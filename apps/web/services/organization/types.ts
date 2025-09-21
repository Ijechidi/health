

export interface CreateOrganizationInput {
  name: string;
  domain?: string;
  logo?: string;
  userId?: string;
  slug?: string;
}

export interface OrganizationResponse {
  id: string;
  name: string;
  slug?: string;
  domain?: string;
  logo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrganizationWithUser extends OrganizationResponse {
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

// Extension des types existants pour inclure les métadonnées
// declare module '@/types/user' {
//   interface Organization {
//     permissions?: string[];
//   }
  
//   interface UserInfo {
//     orgId?: string;
//     orgLogo?: string;
//     orgSlug?: string;
//   }
// }