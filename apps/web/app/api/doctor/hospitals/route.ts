import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Pour l'instant, on utilise un userId fictif
    // Dans un vrai système, on récupérerait l'ID de l'utilisateur connecté
    const userId = "temp-user-id"; // À remplacer par l'ID de l'utilisateur connecté

    // Récupérer les hôpitaux du médecin
    const utilisateurHopitals = await prisma.utilisateurHopital.findMany({
      where: {
        utilisateurId: userId,
        role: 'MEDECIN'
      },
      include: {
        hopital: {
          select: {
            id: true,
            nom: true,
            localisation: true
          }
        }
      }
    });

    // Formater les données
    const hospitals = utilisateurHopitals.map(uh => ({
      id: uh.hopital.id,
      nom: uh.hopital.nom,
      localisation: uh.hopital.localisation
    }));

    return NextResponse.json({
      success: true,
      data: hospitals
    }, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des hôpitaux du médecin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
