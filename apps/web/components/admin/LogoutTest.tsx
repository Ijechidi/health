"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, User } from "lucide-react";

export function LogoutTest() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // La redirection sera gérée par le service logoutAuth
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <div className="p-4 bg-white border rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Test de Déconnexion</h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <User className="h-5 w-5 text-gray-500" />
          <div>
            <p className="text-sm font-medium">
              {user ? `Connecté: ${user.email}` : 'Non connecté'}
            </p>
            <p className="text-xs text-gray-500">
              ID: {user?.id || 'N/A'}
            </p>
          </div>
        </div>
        
        <Button 
          onClick={handleLogout}
          variant="destructive"
          className="w-full"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Tester la déconnexion
        </Button>
      </div>
    </div>
  );
}
