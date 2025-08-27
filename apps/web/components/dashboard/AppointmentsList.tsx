import React from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Calendar, Clock, User, Filter } from "lucide-react";

interface Appointment {
  id: string;
  date: string;
  heure: string;
  statut: string;
  medecin: { id: string; titre: string };
}

interface AppointmentsListProps {
  appointments: Appointment[];
  onFilterChange?: (period: string) => void;
  currentFilter?: string;
}

export function AppointmentsList({ 
  appointments, 
  onFilterChange, 
  currentFilter = "7 jours" 
}: AppointmentsListProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "CONFIRME":
        return "default";
      case "EN_ATTENTE":
        return "secondary";
      case "ANNULE":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRME":
        return "text-white";
      case "EN_ATTENTE":
        return "text-yellow-600";
      case "ANNULE":
        return "text-red-600";
      default:
        return "text-muted-foreground";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Aujourd'hui";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Demain";
    } else {
      return date.toLocaleDateString('fr-FR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
    }
  };

  const filterOptions = [
    { value: "7 jours", label: "7 jours" },
    { value: "30 jours", label: "30 jours" },
    { value: "3 mois", label: "3 mois" }
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-semibold text-foreground">Prochains rendez-vous</h2>
        </div>
        <div className="flex gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={currentFilter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterChange?.(option.value)}
              className="flex items-center gap-1"
            >
              <Filter className="h-3 w-3" />
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {appointment.medecin.titre}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(appointment.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {appointment.heure}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Badge 
                  variant={getStatusVariant(appointment.statut)}
                  className={`${getStatusColor(appointment.statut)} border-current`}
                >
                  {appointment.statut.replace('_', ' ')}
                </Badge>
                
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Détails
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <Calendar className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">Aucun rendez-vous à venir</p>
            <p className="text-sm">Prenez votre premier rendez-vous pour commencer</p>
          </div>
        )}
      </div>

      {appointments.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <Button variant="outline" className="w-full">
            Voir tous les rendez-vous
          </Button>
        </div>
      )}
    </Card>
  );
}
