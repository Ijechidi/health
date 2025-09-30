import { NextRequest, NextResponse } from "next/server";
import { getAllSpecialties, createSpecialty, getSpecialtyStats } from "@/lib/services/admin/specialties";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      const stats = await getSpecialtyStats();
    return NextResponse.json({
      success: true,
      data: stats
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
    }

    const specialties = await getAllSpecialties();
    
    return NextResponse.json({
      success: true,
      data: specialties
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Error in specialties API:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors du chargement des spécialités" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, description } = body;

    if (!nom) {
      return NextResponse.json(
        { success: false, message: "Le nom de la spécialité est requis" },
        { status: 400 }
      );
    }

    const specialty = await createSpecialty({
      nom,
      description
    });

    return NextResponse.json({
      success: true,
      message: "Spécialité créée avec succès",
      data: specialty
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

  } catch (error) {
    console.error('Error creating specialty:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de la spécialité" },
      { status: 500 }
    );
  }
}