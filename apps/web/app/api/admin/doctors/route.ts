import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const doctors = await prisma.medecin.findMany({
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true,
            dateCreation: true
          }
        },
        specialite: {
          select: {
            nom: true
          }
        },
        utilisateur: {
          include: {
            utilisateurHopitals: {
              where: {
                role: 'MEDECIN'
              },
              include: {
                hopital: {
                  select: {
                    nom: true
                  }
                }
              }
            }
          }
        }
      },
      orderBy: {
        utilisateur: {
          dateCreation: 'desc'
        }
      }
    });

    // Formater les données
    const formattedDoctors = doctors.map(doctor => ({
      id: doctor.id,
      numLicence: doctor.numLicence,
      anneeExperience: doctor.anneeExperience,
      titre: doctor.titre,
      statutApproval: doctor.statutApproval,
      dateCreation: doctor.utilisateur.dateCreation,
      utilisateur: {
        nom: doctor.utilisateur.nom,
        prenom: doctor.utilisateur.prenom,
        email: doctor.utilisateur.email
      },
      specialite: {
        nom: doctor.specialite.nom
      },
      hopitaux: doctor.utilisateur.utilisateurHopitals.map(uh => ({
        hopital: {
          nom: uh.hopital.nom
        }
      }))
    }));

    return NextResponse.json({
      success: true,
      data: formattedDoctors
    }, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des médecins:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
