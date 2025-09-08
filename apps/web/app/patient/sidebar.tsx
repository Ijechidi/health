"use client";

import React from "react";
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
  Stethoscope
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

  return (
    <div className="h-full bg-background border rounded-lg p-4 flex flex-col">
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
  );
}
