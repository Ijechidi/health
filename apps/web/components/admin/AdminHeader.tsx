"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { useAuth } from "@/hooks/useAuth";
import { LogoutModal } from "@/components/admin/LogoutModal";
import { useToast } from "@repo/ui/hooks/use-toast";
import { logoutAuth } from "@/lib/services/auth/logout";
import { 
  LogOut, 
  User, 
  Settings,
  Bell
} from "lucide-react";

export function AdminHeader() {
  const { user } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900">
              Administration
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </Button>
            
            {/* User Menu */}
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user?.email || 'Administrateur'}
                </p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
              
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon"
                onClick={handleLogoutClick}
                disabled={isLoggingOut}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

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
