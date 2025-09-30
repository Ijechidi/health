import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hospitalId = params.id;

    // Récupérer l'hôpital avec ses statistiques
    const hospital = await prisma.hopital.findUnique({
      where: { id: hospitalId },
      include: {
        utilisateurHopitals: {
          where: {
            role: 'MEDECIN'
          },
          include: {
            utilisateur: {
              select: {
                nom: true,
                prenom: true,
                email: true
              }
            }
          }
        }
      }
    });

    if (!hospital) {
      return NextResponse.json(
        { success: false, error: 'Hôpital non trouvé' },
        { status: 404 }
      );
    }

    // Formater les données
    const data = {
      id: hospital.id,
      nom: hospital.nom,
      slug: hospital.slug,
      adresse: hospital.adresse,
      description: hospital.description,
      contact: hospital.contact,
      localisation: hospital.localisation,
      medecins: hospital.utilisateurHopitals.map(uh => ({
        id: uh.utilisateur.id,
        nom: uh.utilisateur.nom,
        prenom: uh.utilisateur.prenom,
        email: uh.utilisateur.email
      })),
      totalMedecins: hospital.utilisateurHopitals.length
    };

    return NextResponse.json({
      success: true,
      data
    }, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'hôpital:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}