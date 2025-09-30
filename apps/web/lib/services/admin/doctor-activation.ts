import { prisma } from "@/lib/database/prisma";
import { Role } from "@prisma/client";

export interface DoctorActivationData {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite?: string;
  hopital?: {
    nom: string;
    adresse: string;
  };
  status: 'pending' | 'active' | 'rejected';
  dateInscription: Date;
  dateValidation?: Date;
}

export interface PendingDoctorAccount {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  specialite?: string;
  hopital?: {
    nom: string;
    adresse: string;
  };
  status: 'pending';
  dateInscription: Date;
}

/**
 * Récupère tous les comptes médecins en attente d'activation
 */
export async function getPendingDoctorAccounts(): Promise<PendingDoctorAccount[]> {
  // Récupérer les utilisateurs qui ont un profil médecin mais pas encore assignés à un hôpital
  const pendingDoctors = await prisma.utilisateur.findMany({
    where: {
      medecin: {
        isNot: null
      },
      utilisateurHopitals: {
        none: {
          role: 'medecin'
        }
      }
    },
    include: {
      medecin: {
        include: {
          specialite: true
        }
      }
    },
    orderBy: {
      dateCreation: 'desc'
    }
  });

  return pendingDoctors.map(doctor => ({
    id: doctor.id,
    nom: doctor.nom,
    prenom: doctor.prenom || '',
    email: doctor.email,
    telephone: doctor.telephone,
    specialite: doctor.medecin?.specialite.nom,
    status: 'pending' as const,
    dateInscription: doctor.dateCreation
  }));
}

/**
 * Récupère tous les comptes médecins avec leur statut d'activation
 */
export async function getAllDoctorAccounts(): Promise<DoctorActivationData[]> {
  const doctors = await prisma.utilisateur.findMany({
    where: {
      medecin: {
        isNot: null
      }
    },
    include: {
      medecin: {
        include: {
          specialite: true
        }
      },
      utilisateurHopitals: {
        where: {
          role: 'medecin'
        },
        include: {
          hopital: true
        }
      }
    },
    orderBy: {
      dateCreation: 'desc'
    }
  });

  return doctors.map(doctor => {
    const userHopital = doctor.utilisateurHopitals
      .filter(uh => uh.dateFin === null)
      .sort((a, b) => b.dateDebut.getTime() - a.dateDebut.getTime())[0];

    let status: 'pending' | 'active' | 'rejected' = 'pending';
    let dateValidation: Date | undefined = undefined;

    if (userHopital) {
      status = 'active';
      dateValidation = userHopital.dateDebut;
    }

    return {
      id: doctor.id,
      nom: doctor.nom,
      prenom: doctor.prenom || '',
      email: doctor.email,
      telephone: doctor.telephone,
      specialite: doctor.medecin?.specialite.nom,
      hopital: userHopital ? {
        nom: userHopital.hopital.nom,
        adresse: userHopital.hopital.adresse
      } : undefined,
      status,
      dateInscription: doctor.dateCreation,
      dateValidation
    };
  });
}

/**
 * Active un compte médecin en l'assignant à un hôpital
 */
export async function activateDoctorAccount(
  doctorId: string, 
  hopitalId: string
): Promise<DoctorActivationData> {
  // Vérifier que le médecin existe
  const doctor = await prisma.utilisateur.findUnique({
    where: { id: doctorId },
    include: {
      medecin: true
    }
  });

  if (!doctor || !doctor.medecin) {
    throw new Error('Médecin non trouvé');
  }

  // Vérifier que l'hôpital existe
  const hospital = await prisma.hopital.findUnique({
    where: { id: hopitalId }
  });

  if (!hospital) {
    throw new Error('Hôpital non trouvé');
  }

  // Assigner le médecin à l'hôpital
  await prisma.utilisateurHopital.create({
    data: {
      utilisateurId: doctorId,
      hopitalId,
      role: 'medecin'
    }
  });

  // Récupérer les données mises à jour
  const updatedDoctor = await prisma.utilisateur.findUnique({
    where: { id: doctorId },
    include: {
      medecin: {
        include: {
          specialite: true
        }
      },
      utilisateurHopitals: {
        where: {
          role: 'medecin'
        },
        include: {
          hopital: true
        }
      }
    }
  });

  if (!updatedDoctor) {
    throw new Error('Erreur lors de la récupération du médecin');
  }

  const userHopital = updatedDoctor.utilisateurHopitals
    .filter(uh => uh.dateFin === null)
    .sort((a, b) => b.dateDebut.getTime() - a.dateDebut.getTime())[0];

  return {
    id: updatedDoctor.id,
    nom: updatedDoctor.nom,
    prenom: updatedDoctor.prenom || '',
    email: updatedDoctor.email,
    telephone: updatedDoctor.telephone,
    specialite: updatedDoctor.medecin?.specialite.nom,
    hopital: userHopital ? {
      nom: userHopital.hopital.nom,
      adresse: userHopital.hopital.adresse
    } : undefined,
    status: 'active',
    dateInscription: updatedDoctor.dateCreation,
    dateValidation: userHopital?.dateDebut
  };
}

/**
 * Rejette un compte médecin
 */
export async function rejectDoctorAccount(doctorId: string): Promise<void> {
  // Pour l'instant, on peut simplement supprimer le profil médecin
  // ou ajouter un champ de statut dans la base de données
  // Ici, on va supprimer le profil médecin pour simuler le rejet
  
  const doctor = await prisma.medecin.findFirst({
    where: { userId: doctorId }
  });

  if (doctor) {
    await prisma.medecin.delete({
      where: { id: doctor.id }
    });
  }
}

/**
 * Récupère les statistiques des comptes médecins
 */
export async function getDoctorActivationStats() {
  const [totalDoctors, pendingDoctors, activeDoctors] = await Promise.all([
    prisma.medecin.count(),
    prisma.utilisateur.count({
      where: {
        medecin: {
          isNot: null
        },
        utilisateurHopitals: {
          none: {
            role: 'medecin'
          }
        }
      }
    }),
    prisma.utilisateurHopital.count({
      where: {
        role: 'medecin',
        dateFin: null
      }
    })
  ]);

  return {
    totalDoctors,
    pendingDoctors,
    activeDoctors,
    rejectedDoctors: totalDoctors - pendingDoctors - activeDoctors
  };
}
