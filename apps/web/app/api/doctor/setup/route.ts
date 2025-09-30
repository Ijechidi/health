import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      numLicence, 
      anneeExperience, 
      titre, 
      specialiteId, 
      hopitauxIds 
    } = body;

    // Validation des données
    if (!numLicence || !titre || !specialiteId || !hopitauxIds || hopitauxIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs obligatoires doivent être remplis' },
        { status: 400 }
      );
    }

    // Vérifier que la spécialité existe
    const specialite = await prisma.specialite.findUnique({
      where: { id: specialiteId }
    });

    if (!specialite) {
      return NextResponse.json(
        { success: false, error: 'Spécialité non trouvée' },
        { status: 404 }
      );
    }

    // Vérifier que les hôpitaux existent
    const hopitaux = await prisma.hopital.findMany({
      where: { id: { in: hopitauxIds } }
    });

    if (hopitaux.length !== hopitauxIds.length) {
      return NextResponse.json(
        { success: false, error: 'Un ou plusieurs hôpitaux non trouvés' },
        { status: 404 }
      );
    }

    // Pour l'instant, on utilise un userId fictif
    // Dans un vrai système, on récupérerait l'ID de l'utilisateur connecté
    const userId = "temp-user-id"; // À remplacer par l'ID de l'utilisateur connecté

    // Créer le médecin
    const medecin = await prisma.medecin.create({
      data: {
        numLicence,
        anneeExperience: anneeExperience ? parseInt(anneeExperience) : null,
        titre,
        specialiteId,
        userId,
        statutApproval: 'EN_ATTENTE'
      }
    });

    // Créer les relations médecin-hôpital
    const relations = await Promise.all(
      hopitauxIds.map(hopitalId =>
        prisma.utilisateurHopital.create({
          data: {
            utilisateurId: userId,
            hopitalId,
            role: 'MEDECIN'
          }
        })
      )
    );

    return NextResponse.json({
      success: true,
      data: {
        medecin,
        relations
      }
    }, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });

  } catch (error) {
    console.error('Erreur lors de la création du médecin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
