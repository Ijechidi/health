import { NextRequest, NextResponse } from "next/server";
import { getSpecialtyById, updateSpecialty, deleteSpecialty } from "@/lib/services/admin/specialties";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const specialty = await getSpecialtyById(id);

    if (!specialty) {
      return NextResponse.json(
        { success: false, message: "Spécialité non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: specialty
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

  } catch (error) {
    console.error('Error in specialty API:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors du chargement de la spécialité" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nom, description } = body;

    const specialty = await updateSpecialty(id, {
      nom,
      description
    });

    return NextResponse.json({
      success: true,
      message: "Spécialité mise à jour avec succès",
      data: specialty
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

  } catch (error) {
    console.error('Error updating specialty:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la mise à jour de la spécialité" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteSpecialty(id);

    return NextResponse.json({
      success: true,
      message: "Spécialité supprimée avec succès"
    }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });

  } catch (error) {
    console.error('Error deleting specialty:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors de la suppression de la spécialité" },
      { status: 500 }
    );
  }
}