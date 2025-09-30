import { prisma } from "@/lib/database/prisma";

export interface CreateUserData {
  nom: string;
  prenom?: string;
  email: string;
  telephone?: string;
  role: 'admin' | 'medecin' | 'patient';
  specialiteId?: string; // Pour les médecins
  hopitalId?: string; // Pour l'assignation
}

export interface UpdateUserData {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  specialiteId?: string; // Pour les médecins
}

export interface UserWithDetails {
  id: string;
  nom: string;
  prenom?: string | null;
  email: string;
  telephone?: string | null;
  dateCreation: Date;
  role: 'admin' | 'medecin' | 'patient';
  status: 'actif' | 'inactif';
  specialite?: {
    id: string;
    nom: string;
  };
  hopital?: {
    id: string;
    nom: string;
    adresse: string;
  };
}

/**
 * Récupère tous les utilisateurs avec leurs détails
 */
export async function getAllUsers(): Promise<UserWithDetails[]> {
  const users = await prisma.utilisateur.findMany({
    select: {
      id: true,
      nom: true,
      prenom: true,
      email: true,
      telephone: true,
      dateCreation: true,
      status: true,
      administrateur: {
        select: {
          id: true,
          fonction: true
        }
      },
      medecin: {
        select: {
          id: true,
          numLicence: true,
          titre: true,
          specialite: {
            select: {
              id: true,
              nom: true
            }
          }
        }
      },
      patient: {
        select: {
          id: true,
          dateNaissance: true,
          sexe: true
        }
      },
      utilisateurHopitals: {
        where: {
          dateFin: null
        },
        select: {
          dateDebut: true,
          hopital: {
            select: {
              id: true,
              nom: true,
              adresse: true
            }
          }
        },
        orderBy: {
          dateDebut: 'desc'
        },
        take: 1
      }
    },
    orderBy: {
      dateCreation: 'desc'
    }
  });

  return users.map(user => {
    let role: 'admin' | 'medecin' | 'patient' = 'patient';
    let specialite = undefined;
    let hopital = undefined;


    if (user.administrateur) {
      role = 'admin';
    } else if (user.medecin) {
      role = 'medecin';
      specialite = {
        id: user.medecin.specialite.id,
        nom: user.medecin.specialite.nom
      };
    }

    // Récupérer l'hôpital principal (le plus récent)
    const userHopital = user.utilisateurHopitals
      .filter(uh => uh.dateFin === null)
      .sort((a, b) => b.dateDebut.getTime() - a.dateDebut.getTime())[0];

    if (userHopital) {
      hopital = {
        id: userHopital.hopital.id,
        nom: userHopital.hopital.nom,
        adresse: userHopital.hopital.adresse
      };
    }

        return {
          id: user.id,
          nom: user.nom,
          prenom: user.prenom,
          email: user.email,
          telephone: user.telephone,
          dateCreation: user.dateCreation,
          role,
          specialite,
          hopital,
          status: user.status === 'ACTIF' ? 'actif' : 'inactif'
        };
  });
}

/**
 * Récupère un utilisateur par son ID
 */
export async function getUserById(id: string): Promise<UserWithDetails | null> {
  const user = await prisma.utilisateur.findUnique({
    where: { id },
    include: {
      administrateur: true,
      medecin: {
        include: {
          specialite: true
        }
      },
      patient: true,
      utilisateurHopitals: {
        include: {
          hopital: true
        }
      }
    }
  });

  if (!user) return null;

  let role: 'admin' | 'medecin' | 'patient' = 'patient';
  let specialite = undefined;
  let hopital = undefined;

  if (user.administrateur) {
    role = 'admin';
  } else if (user.medecin) {
    role = 'medecin';
    specialite = {
      id: user.medecin.specialite.id,
      nom: user.medecin.specialite.nom
    };
  }

  // Récupérer l'hôpital principal
  const userHopital = user.utilisateurHopitals
    .filter(uh => uh.dateFin === null)
    .sort((a, b) => b.dateDebut.getTime() - a.dateDebut.getTime())[0];

  if (userHopital) {
    hopital = {
      id: userHopital.hopital.id,
      nom: userHopital.hopital.nom,
      adresse: userHopital.hopital.adresse
    };
  }

      return {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        telephone: user.telephone,
        dateCreation: user.dateCreation,
        role,
        specialite,
        hopital,
        status: user.status === 'ACTIF' ? 'actif' : 'inactif'
      };
}

/**
 * Crée un nouvel utilisateur
 */
export async function createUser(data: CreateUserData): Promise<UserWithDetails> {
  const { role, specialiteId, hopitalId, ...userData } = data;

  // Créer l'utilisateur de base
  const user = await prisma.utilisateur.create({
    data: userData
  });

  // Créer le profil spécifique selon le rôle
  if (role === 'admin') {
    await prisma.administrateur.create({
      data: {
        userId: user.id,
        fonction: 'gestionnaire'
      }
    });
  } else if (role === 'medecin' && specialiteId) {
    await prisma.medecin.create({
      data: {
        userId: user.id,
        specialiteId,
        numLicence: `LIC-${Date.now()}`, // Générer un numéro de licence temporaire
        titre: 'Dr.'
      }
    });
  } else if (role === 'patient') {
    await prisma.patient.create({
      data: {
        userId: user.id,
        dateNaissance: new Date('1990-01-01'), // Date par défaut
        sexe: 'Homme'
      }
    });
  }

  // Assigner à un hôpital si spécifié
  if (hopitalId) {
    await prisma.utilisateurHopital.create({
      data: {
        utilisateurId: user.id,
        hopitalId,
        role
      }
    });
  }

  return getUserById(user.id) as Promise<UserWithDetails>;
}

/**
 * Met à jour un utilisateur
 */
export async function updateUser(id: string, data: UpdateUserData): Promise<UserWithDetails> {
  const { specialiteId, ...userData } = data;

  // Mettre à jour les données de base
  await prisma.utilisateur.update({
    where: { id },
    data: userData
  });

  // Mettre à jour la spécialité si c'est un médecin
  if (specialiteId) {
    const medecin = await prisma.medecin.findFirst({
      where: { userId: id }
    });

    if (medecin) {
      await prisma.medecin.update({
        where: { id: medecin.id },
        data: { specialiteId }
      });
    }
  }

  return getUserById(id) as Promise<UserWithDetails>;
}

/**
 * Supprime un utilisateur
 */
export async function deleteUser(id: string): Promise<void> {
  await prisma.utilisateur.delete({
    where: { id }
  });
}

/**
 * Récupère les statistiques des utilisateurs
 */
export async function getUserStats() {
  const [totalUsers, totalAdmins, totalMedecins, totalPatients] = await Promise.all([
    prisma.utilisateur.count(),
    prisma.administrateur.count(),
    prisma.medecin.count(),
    prisma.patient.count()
  ]);

  return {
    totalUsers,
    totalAdmins,
    totalMedecins,
    totalPatients
  };
}
