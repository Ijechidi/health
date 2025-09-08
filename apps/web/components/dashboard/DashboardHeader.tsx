import React from "react";
import { Button } from "@repo/ui/components/button";
import { Calendar, File, Plus } from "lucide-react";

interface DashboardHeaderProps {
  onNewAppointment: () => void;
  patientName?: string;
}

export function DashboardHeader({ onNewAppointment, patientName }: DashboardHeaderProps) {
  return (
    <header className="flex items-end justify-between mb-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold  bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Tableau de bord
        </h1>
        <div className="space-y-1">
          <p className="text-lg text-foreground/80">
            {patientName ? `Bienvenue, ${patientName}` : "Vue d'ensemble de votre santé"}
          </p>
          <p className="text-sm text-foreground/60">
            Gérez vos rendez-vous, consultez vos documents et suivez votre parcours médical
          </p>
        </div>
      </div>


      
      <div className="flex gap-3">
                      <Button title="Voir les documents"
          variant="outline" 
          size="lg"
          className="hidden sm:flex items-center gap-2"
        >
          <File className="h-4 w-4" />
          <span>2</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="hidden sm:flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Mes RDV
        </Button>
        <Button 
          onClick={onNewAppointment}
          size="lg"
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="h-4 w-4" />
          Prendre un RDV
        </Button>
      </div>
    </header>
  );
}
