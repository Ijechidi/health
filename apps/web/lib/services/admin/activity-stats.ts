import { prisma } from "@/lib/database/prisma";

export interface ActivityStats {
  rendezVous: number;
  documents: number;
  assignations: number;
  utilisateursActifs: number;
}

/**
 * Récupère les statistiques d'activité
 */
export async function getActivityStats(): Promise<ActivityStats> {
  try {
    const [
      rendezVousCount,
      documentsCount,
      assignationsCount,
      utilisateursActifsCount
    ] = await Promise.all([
      prisma.rendezVous.count(),
      prisma.document.count(),
      prisma.utilisateurHopital.count({
        where: { dateFin: null }
      }),
      prisma.utilisateur.count()
    ]);

    return {
      rendezVous: rendezVousCount,
      documents: documentsCount,
      assignations: assignationsCount,
      utilisateursActifs: utilisateursActifsCount
    };
  } catch (error) {
    console.error('Error getting activity stats:', error);
    return {
      rendezVous: 0,
      documents: 0,
      assignations: 0,
      utilisateursActifs: 0
    };
  }
}
