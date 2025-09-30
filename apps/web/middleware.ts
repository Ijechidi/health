import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  // Pour l'instant, on laisse passer toutes les requêtes
  // La protection sera gérée côté client avec AuthGuard
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/doctor/:path*',
    '/patient/:path*'
  ]
};
