"use client";

import React, { useEffect, useState } from "react";
import DoctorSidebar from "./sidebar";

export default function DoctorLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Ouvrir par défaut sur desktop, fermé sur mobile
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    setSidebarOpen(mql.matches);
    const handler = (e: MediaQueryListEvent) => setSidebarOpen(e.matches);
    mql.addEventListener?.('change', handler);
    return () => mql.removeEventListener?.('change', handler);
  }, []);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed z-30 inset-y-0 left-0 w-64 border-r bg-background transition-transform duration-200 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <DoctorSidebar />
      </aside>

      {/* Backdrop pour mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Contenu principal */}
      <main className="flex-1 md:ml-64">
        {children}
      </main>
    </div>
  );
}
