import React from "react";
import { Button } from "@repo/ui/components/button";
import { Calendar, Plus, Users, FileText } from "lucide-react";

interface DoctorDashboardHeaderProps {
  onNewPatient?: () => void;
  onViewSchedule?: () => void;
  doctorName?: string;
  specialty?: string;
}

export function DoctorDashboardHeader({ 
  onNewPatient, 
  onViewSchedule, 
  doctorName, 
  specialty 
}: DoctorDashboardHeaderProps) {
  return (
    <header className="flex items-end justify-between mb-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
          Dashboard Médecin
        </h1>
        <div className="space-y-1">
          <p className="text-lg text-foreground/80">
            {doctorName ? `Dr. ${doctorName}` : "Bienvenue, Docteur"}
          </p>
          {specialty && (
            <p className="text-sm text-foreground/60">
              Spécialité: {specialty}
            </p>
          )}
          <p className="text-sm text-foreground/60">
            Gérez vos patients, rendez-vous et consultations
          </p>
        </div>
      </div>
      
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          size="lg"
          onClick={onViewSchedule}
          className="hidden sm:flex items-center gap-2"
        >
          <Calendar className="h-4 w-4" />
          Mon Planning
        </Button>
        <Button 
          variant="outline" 
          size="lg"
          className="hidden sm:flex items-center gap-2"
        >
          <Users className="h-4 w-4" />
          Mes Patients
        </Button>
        <Button 
          onClick={onNewPatient}
          size="lg"
          className="flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Nouveau Patient
        </Button>
      </div>
    </header>
  );
}
