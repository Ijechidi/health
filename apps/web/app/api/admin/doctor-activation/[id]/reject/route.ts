import { NextRequest, NextResponse } from 'next/server';
import { rejectDoctorAccount } from '@/lib/services/admin/doctor-activation';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await rejectDoctorAccount(params.id);
    return NextResponse.json({ success: true, message: 'Compte médecin rejeté avec succès' });
  } catch (error) {
    console.error('Erreur lors du rejet du compte médecin:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors du rejet du compte médecin' },
      { status: 500 }
    );
  }
}
