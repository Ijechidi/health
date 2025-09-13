"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { 
  Users, 
  Building2, 
  Stethoscope,
  Settings, 
  LogOut,
  Shield,
  BarChart3,
  UserCheck
} from "lucide-react";

const navigationItems = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: BarChart3,
    description: "Tableau de bord"
  },
  {
    name: "Utilisateurs",
    href: "/admin/users",
    icon: Users,
    description: "Gérer les utilisateurs"
  },
  {
    name: "Hôpitaux",
    href: "/admin/hospitals",
    icon: Building2,
    description: "Gestion des hôpitaux"
  },
  {
    name: "Spécialités",
    href: "/admin/specialties",
    icon: Stethoscope,
    description: "Gestion des spécialités"
  },
  {
    name: "Assignations",
    href: "/admin/assignments",
    icon: UserCheck,
    description: "Rôles et assignations"
  },
  {
    name: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
    description: "Configuration système"
  }
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-black/10 rounded-lg">
            <Shield className="h-6 w-6 text-black" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Administration</h1>
            <p className="text-sm text-gray-500">Panel d'administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-12 px-4 ${
                  isActive 
                    ? "bg-black hover:bg-neutral-800 text-white" 
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="h-5 w-5 mr-3" />
                <div className="text-left">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
              </Button>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-black">
          <LogOut className="h-5 w-5 mr-3" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
}
