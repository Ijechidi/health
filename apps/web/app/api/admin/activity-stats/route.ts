import { NextResponse } from "next/server";
import { getActivityStats } from "@/lib/services/admin/activity-stats";

export async function GET() {
  try {
    const stats = await getActivityStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error in activity stats API:', error);
    return NextResponse.json(
      { success: false, message: "Erreur lors du chargement des statistiques" },
      { status: 500 }
    );
  }
}
