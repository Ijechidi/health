export interface Hospital {
  id: string;
  slug: string;
  nom: string;
  adresse: string;
  description?: string;
  contact: string;
  email?: string;
  localisation?: string;
  services?: string[];
  nombreMedecins?: number;
}

export interface Doctor {
  id: string;
  nom: string;
  prenom: string;
  specialite: string;
  specialiteId: string;
  experience: number;
  dureeConsultation: string;
  photo?: string;
}

export interface Specialty {
  id: string;
  nom: string;
  description: string;
  medecins: Doctor[];
}

export interface HospitalDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}