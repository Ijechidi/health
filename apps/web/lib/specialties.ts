// Utilitaire pour gérer les spécialités médicales

export interface Specialty {
  id: string;
  nom: string;
  description?: string;
}

export const SPECIALTIES: Specialty[] = [
  { 
    id: 's1', 
    nom: 'Cardiologie', 
    description: 'Spécialité médicale qui traite les maladies du cœur et des vaisseaux sanguins' 
  },
  { 
    id: 's2', 
    nom: 'Dermatologie', 
    description: 'Spécialité médicale qui traite les maladies de la peau, des cheveux et des ongles' 
  },
  { 
    id: 's3', 
    nom: 'Pédiatrie', 
    description: 'Spécialité médicale qui traite les enfants de la naissance à l\'adolescence' 
  },
  { 
    id: 's4', 
    nom: 'Gynécologie', 
    description: 'Spécialité médicale qui traite les maladies de l\'appareil génital féminin' 
  },
  { 
    id: 's5', 
    nom: 'Neurologie', 
    description: 'Spécialité médicale qui traite les maladies du système nerveux' 
  },
  { 
    id: 's6', 
    nom: 'Orthopédie', 
    description: 'Spécialité chirurgicale qui traite les maladies des os et des articulations' 
  },
  { 
    id: 's7', 
    nom: 'Ophtalmologie', 
    description: 'Spécialité médicale qui traite les maladies des yeux' 
  },
  { 
    id: 's8', 
    nom: 'Psychiatrie', 
    description: 'Spécialité médicale qui traite les troubles mentaux et comportementaux' 
  },
  { 
    id: 's9', 
    nom: 'Radiologie', 
    description: 'Spécialité médicale qui utilise l\'imagerie médicale pour le diagnostic' 
  },
  { 
    id: 's10', 
    nom: 'Chirurgie générale', 
    description: 'Spécialité chirurgicale qui traite les interventions chirurgicales générales' 
  }
];

export const getSpecialtyById = (id: string): Specialty | undefined => {
  return SPECIALTIES.find(specialty => specialty.id === id);
};

export const getSpecialtyName = (id: string): string => {
  const specialty = getSpecialtyById(id);
  return specialty ? specialty.nom : 'Inconnue';
};

export const getSpecialtyDescription = (id: string): string | undefined => {
  const specialty = getSpecialtyById(id);
  return specialty ? specialty.description : undefined;
};

