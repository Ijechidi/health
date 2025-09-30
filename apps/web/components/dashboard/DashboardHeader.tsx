import React from "react";
import { Button } from "@repo/ui/components/button";
import { Calendar, File, Plus } from "lucide-react";

interface DashboardHeaderProps {
  onNewAppointment: () => void;
  patientName?: string;
}

export function DashboardHeader({ onNewAppointment, patientName }: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6 sm:mb-8">
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <div className="space-y-1">
          <p className="text-base sm:text-lg text-foreground/80">
            {patientName ? `Bienvenue, ${patientName}` : "Vue d'ensemble de votre santé"}
          </p>
          <p className="text-xs sm:text-sm text-foreground/60">
            Gérez vos rendez-vous, consultez vos documents et suivez votre parcours médical
          </p>
        </div>
      </div>


      
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button title="Voir les documents"
          variant="outline" 
          size="sm"
          className="hidden sm:flex items-center gap-2 text-xs sm:text-sm"
        >
          <File className="h-3 w-3 sm:h-4 sm:w-4" />
          <span>2</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="hidden sm:flex items-center gap-2 text-xs sm:text-sm"
        >
          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden lg:inline">Mes RDV</span>
          <span className="lg:hidden">RDV</span>
        </Button>
        <Button 
          onClick={onNewAppointment}
          size="sm"
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow text-xs sm:text-sm"
        >
          <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Prendre un RDV</span>
          <span className="sm:hidden">RDV</span>
        </Button>
      </div>
    </header>
  );
}
