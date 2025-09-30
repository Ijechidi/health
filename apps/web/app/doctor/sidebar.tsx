"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { 
  Home, 
  Calendar, 
  Users, 
  FileText, 
  Stethoscope,
  Settings, 
  LogOut,
  Heart,
  Activity,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
 
  {
    name: "Dashboard",
    href: "/doctor/dashboard",
    icon: Activity,
    description: "Vue d'ensemble"
  },
  {
    name: "Planning",
    href: "/doctor/schedule",
    icon: Calendar,
    description: "Gérer mes RDV"
  },
  {
    name: "Patients",
    href: "/doctor/patients",
    icon: Users,
    description: "Base de patients"
  },
  
  {
    name: "Documents",
    href: "/doctor/documents",
    icon: FileText,
    description: "Ordonnances, rapports"
  },
  {
    name: "Recommandations",
    href: "/doctor/recommendations",
    icon: Stethoscope,
    description: "Référer à un médecin"
  },
  {
    name: "Paramètres",
    href: "/doctor/settings",
    icon: Settings,
    description: "Configuration"
  }
];

export default function DoctorSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white shadow-lg"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 h-full bg-background border-r p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Heart className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">MedEasy</h1>
            <p className="text-xs text-muted-foreground">Espace Médecin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-auto p-3 ${
                  isActive 
                    ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                    : 'hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                <Icon className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className={`text-xs ${
                    isActive ? "text-blue-100" : "text-muted-foreground"
                  }`}>
                    {item.description}
                  </div>
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="pt-4 border-t">
        <div className="space-y-2">
          <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4 text-blue-600" />
            <span>Mode Médecin</span>
          </div>
          <Button variant="outline" size="sm" className="w-full border-blue-200 text-blue-700 hover:bg-blue-50">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}
