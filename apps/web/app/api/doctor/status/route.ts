import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Pour l'instant, on utilise un userId fictif
    // Dans un vrai système, on récupérerait l'ID de l'utilisateur connecté
    const userId = "temp-user-id"; // À remplacer par l'ID de l'utilisateur connecté

    // Récupérer le médecin avec ses informations
    const medecin = await prisma.medecin.findFirst({
      where: { userId },
      include: {
        specialite: true,
        utilisateur: {
          include: {
            utilisateurHopitals: {
              include: {
                hopital: true
              }
            }
          }
        }
      }
    });

    if (!medecin) {
      return NextResponse.json(
        { success: false, error: 'Aucun profil médecin trouvé' },
        { status: 404 }
      );
    }

    // Formater les données
    const data = {
      statutApproval: medecin.statutApproval,
      specialite: medecin.specialite.nom,
      hopitaux: medecin.utilisateur.utilisateurHopitals
        .filter(uh => uh.role === 'MEDECIN')
        .map(uh => uh.hopital.nom),
      dateDemande: medecin.utilisateur.dateCreation,
      commentaire: null // À ajouter si on veut des commentaires d'approbation
    };

    return NextResponse.json({
      success: true,
      data
    }, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération du statut:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
