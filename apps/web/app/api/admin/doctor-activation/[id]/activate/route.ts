import { NextRequest, NextResponse } from 'next/server';
import { activateDoctorAccount } from '@/lib/services/admin/doctor-activation';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { hopitalId } = body;

    if (!hopitalId) {
      return NextResponse.json(
        { success: false, error: 'ID de l\'hôpital requis' },
        { status: 400 }
      );
    }

    const doctor = await activateDoctorAccount(params.id, hopitalId);
    return NextResponse.json({ success: true, data: doctor });
  } catch (error) {
    console.error('Erreur lors de l\'activation du compte médecin:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Erreur lors de l\'activation du compte médecin' },
      { status: 500 }
    );
  }
}
