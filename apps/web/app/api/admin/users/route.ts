import { NextRequest, NextResponse } from 'next/server';
import { getAllUsers, createUser, getUserStats } from '@/lib/services/admin/users';
import { CreateUserData } from '@/lib/services/admin/users';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'stats') {
      const stats = await getUserStats();
      return NextResponse.json({ success: true, data: stats }, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      });
    }

    const users = await getAllUsers();
    return NextResponse.json({ success: true, data: users }, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la récupération des utilisateurs' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserData = await request.json();
    
    // Validation des données requises
    if (!body.nom || !body.email || !body.role) {
      return NextResponse.json(
        { success: false, error: 'Nom, email et rôle sont requis' },
        { status: 400 }
      );
    }

    // Validation du rôle
    if (!['admin', 'medecin', 'patient'].includes(body.role)) {
      return NextResponse.json(
        { success: false, error: 'Rôle invalide' },
        { status: 400 }
      );
    }

    // Validation spécialité pour les médecins
    if (body.role === 'medecin' && !body.specialiteId) {
      return NextResponse.json(
        { success: false, error: 'Spécialité requise pour les médecins' },
        { status: 400 }
      );
    }

    const user = await createUser(body);
    return NextResponse.json({ success: true, data: user }, { 
      status: 201,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    });
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de la création de l\'utilisateur' },
      { status: 500 }
    );
  }
}
