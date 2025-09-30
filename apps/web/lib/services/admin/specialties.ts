import { prisma } from "@/lib/database/prisma";

export interface CreateSpecialtyData {
  nom: string;
  description?: string;
}

export interface UpdateSpecialtyData {
  nom?: string;
  description?: string;
}

export interface SpecialtyWithStats {
  id: string;
  nom: string;
  description?: string;
  stats: {
    totalMedecins: number;
  };
}

/**
 * Récupère toutes les spécialités avec leurs statistiques
 */
export async function getAllSpecialties(): Promise<SpecialtyWithStats[]> {
  try {
    const specialties = await prisma.specialite.findMany({
      select: {
        id: true,
        nom: true,
        description: true,
        medecins: {
          select: {
            id: true
          }
        }
      },
      orderBy: {
        nom: 'asc'
      }
    });

    return specialties.map(specialty => ({
      id: specialty.id,
      nom: specialty.nom,
      description: specialty.description,
      stats: {
        totalMedecins: specialty.medecins.length
      }
    }));
  } catch (error) {
    console.error('Error fetching specialties:', error);
    return [];
  }
}

/**
 * Récupère une spécialité par son ID
 */
export async function getSpecialtyById(id: string): Promise<SpecialtyWithStats | null> {
  try {
    const specialty = await prisma.specialite.findUnique({
      where: { id },
      select: {
        id: true,
        nom: true,
        description: true,
        medecins: {
          select: {
            id: true
          }
        }
      }
    });

    if (!specialty) return null;

    return {
      id: specialty.id,
      nom: specialty.nom,
      description: specialty.description,
      stats: {
        totalMedecins: specialty.medecins.length
      }
    };
  } catch (error) {
    console.error('Error fetching specialty by ID:', error);
    return null;
  }
}

/**
 * Crée une nouvelle spécialité
 */
export async function createSpecialty(data: CreateSpecialtyData): Promise<SpecialtyWithStats> {
  try {
    const specialty = await prisma.specialite.create({
      data: {
        nom: data.nom,
        description: data.description
      }
    });

    return {
      id: specialty.id,
      nom: specialty.nom,
      description: specialty.description,
      stats: {
        totalMedecins: 0
      }
    };
  } catch (error) {
    console.error('Error creating specialty:', error);
    throw error;
  }
}

/**
 * Met à jour une spécialité
 */
export async function updateSpecialty(id: string, data: UpdateSpecialtyData): Promise<SpecialtyWithStats> {
  try {
    await prisma.specialite.update({
      where: { id },
      data
    });

    return getSpecialtyById(id) as Promise<SpecialtyWithStats>;
  } catch (error) {
    console.error('Error updating specialty:', error);
    throw error;
  }
}

/**
 * Supprime une spécialité
 */
export async function deleteSpecialty(id: string): Promise<void> {
  try {
    await prisma.specialite.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error deleting specialty:', error);
    throw error;
  }
}

/**
 * Récupère les statistiques des spécialités
 */
export async function getSpecialtyStats() {
  try {
    const [totalSpecialties, totalMedecins] = await Promise.all([
      prisma.specialite.count(),
      prisma.medecin.count()
    ]);
    
    return {
      totalSpecialties,
      totalMedecins
    };
  } catch (error) {
    console.error('Error fetching specialty stats:', error);
    return {
      totalSpecialties: 0,
      totalMedecins: 0
    };
  }
}