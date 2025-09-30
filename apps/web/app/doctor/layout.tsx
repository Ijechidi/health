"use client";

import React from 'react'
import { usePathname } from 'next/navigation'
import DoctorSidebar from './sidebar'

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  
  // Ne pas afficher la sidebar sur les pages de bienvenue, setup et pending
  const isWelcomePage = pathname?.includes('/welcome')
  const isSetupPage = pathname?.includes('/setup')
  const isPendingPage = pathname?.includes('/pending')
  
  if (isWelcomePage || isSetupPage || isPendingPage) {
    return <>{children}</>
  }
  
  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 flex-shrink-0">
        <DoctorSidebar />
      </div>
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}

