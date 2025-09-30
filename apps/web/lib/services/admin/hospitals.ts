import { prisma } from "@/lib/database/prisma";

export interface CreateHospitalData {
  nom: string;
  slug: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
}

export interface UpdateHospitalData {
  nom?: string;
  slug?: string;
  adresse?: string;
  description?: string;
  contact?: string;
  localisation?: string;
}

export interface HospitalWithStats {
  id: string;
  nom: string;
  slug: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
  stats: {
    totalUsers: number;
    totalMedecins: number;
    totalPatients: number;
    totalAdmins: number;
  };
}

/**
 * Récupère tous les hôpitaux avec leurs statistiques
 */
export async function getAllHospitals(): Promise<HospitalWithStats[]> {
  try {
    const hospitals = await prisma.hopital.findMany({
      select: {
        id: true,
        nom: true,
        slug: true,
        adresse: true,
        description: true,
        contact: true,
        localisation: true,
        utilisateurHopitals: {
          where: {
            dateFin: null
          },
          select: {
            role: true
          }
        }
      },
      orderBy: {
        nom: 'asc'
      }
    });

    return hospitals.map(hospital => {
      const stats = {
        totalUsers: hospital.utilisateurHopitals.length,
        totalMedecins: hospital.utilisateurHopitals.filter(uh => uh.role === 'medecin').length,
        totalPatients: hospital.utilisateurHopitals.filter(uh => uh.role === 'patient').length,
        totalAdmins: hospital.utilisateurHopitals.filter(uh => uh.role === 'admin').length
      };

      return {
        id: hospital.id,
        nom: hospital.nom,
        slug: hospital.slug,
        adresse: hospital.adresse,
        description: hospital.description,
        contact: hospital.contact,
        localisation: hospital.localisation,
        stats
      };
    });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    return [];
  }
}

/**
 * Récupère un hôpital par son ID
 */
export async function getHospitalById(id: string): Promise<HospitalWithStats | null> {
  try {
    const hospital = await prisma.hopital.findUnique({
      where: { id },
      select: {
        id: true,
        nom: true,
        slug: true,
        adresse: true,
        description: true,
        contact: true,
        localisation: true,
        utilisateurHopitals: {
          where: {
            dateFin: null
          },
          select: {
            role: true
          }
        }
      }
    });

    if (!hospital) return null;

    const stats = {
      totalUsers: hospital.utilisateurHopitals.length,
      totalMedecins: hospital.utilisateurHopitals.filter(uh => uh.role === 'medecin').length,
      totalPatients: hospital.utilisateurHopitals.filter(uh => uh.role === 'patient').length,
      totalAdmins: hospital.utilisateurHopitals.filter(uh => uh.role === 'admin').length
    };

    return {
      id: hospital.id,
      nom: hospital.nom,
      slug: hospital.slug,
      adresse: hospital.adresse,
      description: hospital.description,
      contact: hospital.contact,
      localisation: hospital.localisation,
      stats
    };
  } catch (error) {
    console.error('Error fetching hospital by ID:', error);
    return null;
  }
}

/**
 * Crée un nouvel hôpital
 */
export async function createHospital(data: CreateHospitalData): Promise<HospitalWithStats> {
  try {
    const hospital = await prisma.hopital.create({
      data: {
        nom: data.nom,
        slug: data.slug || data.nom.toLowerCase().replace(/\s+/g, '-'),
        adresse: data.adresse,
        description: data.description,
        contact: data.contact,
        localisation: data.localisation
      }
    });

    return {
      id: hospital.id,
      nom: hospital.nom,
      slug: hospital.slug,
      adresse: hospital.adresse,
      description: hospital.description,
      contact: hospital.contact,
      localisation: hospital.localisation,
      stats: {
        totalUsers: 0,
        totalMedecins: 0,
        totalPatients: 0,
        totalAdmins: 0
      }
    };
  } catch (error) {
    console.error('Error creating hospital:', error);
    throw error;
  }
}

/**
 * Met à jour un hôpital
 */
export async function updateHospital(id: string, data: UpdateHospitalData): Promise<HospitalWithStats> {
  await prisma.hopital.update({
    where: { id },
    data
  });

  return getHospitalById(id) as Promise<HospitalWithStats>;
}

/**
 * Supprime un hôpital
 */
export async function deleteHospital(id: string): Promise<void> {
  try {
    await prisma.hopital.delete({
      where: { id }
    });
  } catch (error) {
    console.error('Error deleting hospital:', error);
    throw error;
  }
}

/**
 * Récupère les statistiques des hôpitaux
 */
export async function getHospitalStats() {
  try {
    const [totalHospitals, totalUsers, totalMedecins, totalPatients, totalAdmins] = await Promise.all([
      prisma.hopital.count(),
      prisma.utilisateur.count(),
      prisma.medecin.count(),
      prisma.patient.count(),
      prisma.administrateur.count()
    ]);
    
    return {
      totalHospitals,
      totalUsers,
      totalMedecins,
      totalPatients,
      totalAdmins
    };
  } catch (error) {
    console.error('Error fetching hospital stats:', error);
    return {
      totalHospitals: 0,
      totalUsers: 0,
      totalMedecins: 0,
      totalPatients: 0,
      totalAdmins: 0
    };
  }
}