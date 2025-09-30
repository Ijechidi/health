import { NextRequest, NextResponse } from "next/server";
import { getAllHospitals, createHospital, getHospitalStats } from "@/lib/services/admin/hospitals";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      const stats = await getHospitalStats();
      return NextResponse.json({
        success: true,
        data: stats
      }, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }

    const hospitals = await getAllHospitals();
    
    return NextResponse.json({
      success: true,
      data: hospitals
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Error in hospitals API:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors du chargement des hôpitaux" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom, slug, adresse, description, contact, localisation } = body;

    if (!nom || !adresse || !contact) {
      return NextResponse.json(
        { success: false, message: "Nom, adresse et contact sont requis" },
        { status: 400 }
      );
    }

    const hospital = await createHospital({
      nom,
      slug,
      adresse,
      description,
      contact,
      localisation
    });

    return NextResponse.json({
      success: true,
      message: "Hôpital créé avec succès",
      data: hospital
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

  } catch (error) {
    console.error('Error creating hospital:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la création de l'hôpital" },
      { status: 500 }
    );
  }
}