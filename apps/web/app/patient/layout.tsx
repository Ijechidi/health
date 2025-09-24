"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Bell, Menu } from "lucide-react";

export default function PatientLayout({
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
    <main className="min-h-screen bg-design-bg">
      <div className="max-w-7xl mx-auto px-4 py-6 relative">
        {/* Sidebar fixe à gauche */}
        <aside
          className={
            `fixed z-30 inset-y-6 left-4 w-64 transition-transform duration-200 ` +
            `${sidebarOpen ? 'translate-x-0' : '-translate-x-[120%]'} ` +
            `md:translate-x-0`
          }
        >
          <Sidebar />
        </aside>

        {/* Backdrop pour mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-20 bg-black/30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Espace contenu avec marge gauche quand sidebar visible */}
        <section className={`min-h-[60vh] space-y-4 md:pl-[280px] transition-all`}>
          {/* <div className="bg-background border rounded-md px-4 py-3 flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={() => setSidebarOpen(v => !v)} aria-label="Basculer la sidebar" className="md:hidden">
              <Menu className="h-4 w-4" />
            </Button>
            <div className="hidden md:flex items-center gap-2 text-sm text-foreground/70">
              <Badge variant="secondary">Patient</Badge>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <Button variant="outline" size="icon" aria-label="Notifications">
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </div> */}
          {children}
        </section>
      </div>
    </main>
  );
}


