"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { 
  Home, 
  Calendar, 
  FileText, 
  User, 
  Settings, 
  Bell,
  LogOut,
  Heart,
  Stethoscope,
  Menu,
  X
} from "lucide-react";

const navigationItems = [
  {
    name: "Tableau de bord",
    href: "/patient/dashboard",
    icon: Home,
    description: "Vue d'ensemble"
  },
  {
    name: "Rendez-vous",
    href: "/patient/appointments",
    icon: Calendar,
    description: "Gérer mes RDV"
  },
  {
    name: "Documents",
    href: "/patient/documents",
    icon: FileText,
    description: "Mes documents"
  },
  {
    name: "Profil",
    href: "/patient/profile",
    icon: User,
    description: "Informations personnelles"
  },
  {
    name: "Notifications",
    href: "/patient/notification",
    icon: Bell,
    description: "Alertes et messages"
  },
 
];

export default function Sidebar() {
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
        fixed lg:static inset-y-0 left-0 z-50 w-64 h-full bg-background border rounded-lg p-4 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Heart className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-lg text-foreground">MedEasy</h1>
            <p className="text-xs text-muted-foreground"> Portal Patient</p>
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
                    ? "bg-primary text-primary-foreground" 
                    : "hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className={`text-xs ${
                    isActive ? "text-primary-foreground/70" : "text-muted-foreground"
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
            <Stethoscope className="h-4 w-4" />
            <span>Mode Patient</span>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}
