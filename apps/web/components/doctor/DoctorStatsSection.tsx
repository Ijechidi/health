import React from "react";
import { StatsCard } from "../dashboard/StatsCard";
import { CalendarDays, Users, FileText, Clock, Activity } from "lucide-react";

interface DoctorStatsSectionProps {
  totalPatients: number;
  todayAppointments: number;
  pendingConsultations: number;
  totalDocuments: number;
  averageConsultationTime: number;
}

export function DoctorStatsSection({ 
  totalPatients, 
  todayAppointments, 
  pendingConsultations, 
  totalDocuments, 
  averageConsultationTime 
}: DoctorStatsSectionProps) {
  const stats = [
    {
      title: "Patients totaux",
      value: totalPatients,
      subtitle: "Base de patients",
      icon: Users,
      trend: totalPatients > 0 ? {
        value: "Actifs",
        isPositive: true
      } : undefined
    },
    {
      title: "RDV aujourd'hui",
      value: todayAppointments,
      subtitle: "Consultations prévues",
      icon: CalendarDays,
      trend: todayAppointments > 0 ? {
        value: `${todayAppointments} RDV`,
        isPositive: true
      } : undefined
    },
    {
      title: "Consultations en attente",
      value: pendingConsultations,
      subtitle: "À traiter",
      icon: Clock,
      trend: pendingConsultations > 0 ? {
        value: `${pendingConsultations} consultations`,
        isPositive: false
      } : undefined
    },
    {
      title: "Documents générés",
      value: totalDocuments,
      subtitle: "Ordonnances, rapports",
      icon: FileText,
      trend: totalDocuments > 0 ? {
        value: "Disponibles",
        isPositive: true
      } : undefined
    },
    {
      title: "Temps moyen consultation",
      value: `${averageConsultationTime} min`,
      subtitle: "Durée moyenne",
      icon: Activity,
      trend: averageConsultationTime > 0 ? {
        value: "Optimisé",
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
