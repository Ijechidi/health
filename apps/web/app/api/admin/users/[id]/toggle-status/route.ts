import { NextRequest, NextResponse } from "next/server";
import { toggleUserStatus } from "@/lib/services/admin/user-status";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['actif', 'inactif'].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Statut invalide" },
        { status: 400 }
      );
    }

    const result = await toggleUserStatus({
      userId: id,
      status
    });

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: result.message
    });

  } catch (error) {
    console.error('Error in toggle user status API:', error);
    return NextResponse.json(
      { success: false, message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
