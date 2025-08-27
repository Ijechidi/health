import React from "react";
import { StatsCard } from "./StatsCard";
import { CalendarDays, Activity, FileText, Users } from "lucide-react";

interface StatsSectionProps {
  appointments: Array<{ id: string; statut: string }>;
  documents: Array<{ id: string }>;
  doctorsCount?: number;
}

export function StatsSection({ appointments, documents, doctorsCount = 2 }: StatsSectionProps) {
  const confirmedAppointments = appointments.filter(a => a.statut === "CONFIRME").length;
  const pendingAppointments = appointments.filter(a => a.statut === "EN_ATTENTE").length;

  const stats = [
    {
      title: "Rendez-vous (total)",
      value: appointments.length,
      subtitle: "Période récente",
      icon: CalendarDays,
      trend: appointments.length > 0 ? {
        value: `${Math.round((confirmedAppointments / appointments.length) * 100)}% confirmés`,
        isPositive: true
      } : undefined
    },
    {
      title: "Prochains confirmés",
      value: confirmedAppointments,
      subtitle: "Cette semaine",
      icon: Activity,
      trend: confirmedAppointments > 0 ? {
        value: `${confirmedAppointments} RDV`,
        isPositive: true
      } : undefined
    },
    {
      title: "En attente",
      value: pendingAppointments,
      subtitle: "À confirmer",
      icon: Activity,
      trend: pendingAppointments > 0 ? {
        value: `${pendingAppointments} RDV`,
        isPositive: false
      } : undefined
    },
    {
      title: "Documents",
      value: documents.length,
      subtitle: "Récemment ajoutés",
      icon: FileText,
      trend: documents.length > 0 ? {
        value: "Disponibles",
        isPositive: true
      } : undefined
    },
    {
      title: "Équipe soignante",
      value: doctorsCount,
      subtitle: "Médecins suivis",
      icon: Users,
      trend: doctorsCount > 0 ? {
        value: "Actifs",
        isPositive: true
      } : undefined
    }
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </section>
  );
}
