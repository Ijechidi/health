"use client";

import React from 'react'
import { usePathname } from 'next/navigation'
import PatientSidebar from './sidebar'

export default function PatientLayout({
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
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <PatientSidebar />
      </div>
      <main className="flex-1 overflow-auto p-6">
        {children}
      </main>
    </div>
  )
}
