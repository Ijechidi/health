"use client";

import React from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from './sidebar'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Ne pas afficher la sidebar sur les pages de bienvenue
  const isWelcomePage = pathname?.includes('/welcome')
  
  if (isWelcomePage) {
    return <>{children}</>
  }
  
  return (
    <AuthGuard redirectTo="/admin/login">
      <div className="flex h-screen bg-gray-50">
        <AdminSidebar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}

