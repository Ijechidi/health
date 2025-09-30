import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllDoctorAccounts, 
  getPendingDoctorAccounts, 
  getDoctorActivationStats 
} from '@/lib/services/admin/doctor-activation';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      const stats = await getDoctorActivationStats();
      return NextResponse.json({ success: true, data: stats });
    }

    if (action === 'pending') {
      const pendingDoctors = await getPendingDoctorAccounts();
      return NextResponse.json({ success: true, data: pendingDoctors });
    }

    const doctors = await getAllDoctorAccounts();
    return NextResponse.json({ success: true, data: doctors });
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes médecins:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des comptes médecins' },
      { status: 500 }
    );
  }
}
