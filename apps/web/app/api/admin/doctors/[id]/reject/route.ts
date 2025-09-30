import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doctorId = params.id;

    // Vérifier que le médecin existe
    const doctor = await prisma.medecin.findUnique({
      where: { id: doctorId },
      include: {
        utilisateur: true
      }
    });

    if (!doctor) {
      return NextResponse.json(
        { success: false, error: 'Médecin non trouvé' },
        { status: 404 }
      );
    }

    if (doctor.statutApproval === 'REJETE') {
      return NextResponse.json(
        { success: false, error: 'Ce médecin est déjà rejeté' },
        { status: 400 }
      );
    }

    // Mettre à jour le statut
    const updatedDoctor = await prisma.medecin.update({
      where: { id: doctorId },
      data: {
        statutApproval: 'REJETE'
      },
      include: {
        utilisateur: {
          select: {
            nom: true,
            prenom: true,
            email: true
          }
        },
        specialite: {
          select: {
            nom: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      data: updatedDoctor,
      message: 'Médecin rejeté'
    }, {
      headers: { 'Content-Type': 'application/json; charset=utf-8' }
    });

  } catch (error) {
    console.error('Erreur lors du rejet du médecin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
