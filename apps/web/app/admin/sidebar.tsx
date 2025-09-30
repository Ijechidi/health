"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@repo/ui/components/button";
import { useToast } from "@repo/ui/hooks/use-toast";
import { logoutAuth } from "@/lib/services/auth/logout";
import { LogoutModal } from "@/components/admin/LogoutModal";
import { 
  Users, 
  Building2, 
  Stethoscope,
  Settings, 
  LogOut,
  Shield,
  BarChart3,
  UserCheck,
  Menu,
  X
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
    name: "Demandes Médecins",
    href: "/admin/doctors",
    icon: Stethoscope,
    description: "Approbation des médecins"
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
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { toast } = useToast();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirm = async () => {
    try {
      setIsLoggingOut(true);
      toast.info("Déconnexion en cours...");
      
      const result = await logoutAuth();
      
      if (result.success) {
        toast.success("Déconnexion réussie");
        setShowLogoutModal(false);
      } else {
        toast.error(result.error || "Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      toast.error("Erreur lors de la déconnexion");
    } finally {
      setIsLoggingOut(false);
    }
  };

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
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
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
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
        >
          <LogOut className="h-5 w-5 mr-3" />
          {isLoggingOut ? "Déconnexion..." : "Déconnexion"}
        </Button>
      </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal
        open={showLogoutModal}
        onOpenChange={setShowLogoutModal}
        onConfirm={handleLogoutConfirm}
        loading={isLoggingOut}
      />
    </>
  );
}
