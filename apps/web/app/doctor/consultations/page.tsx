"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Stethoscope, Plus, Clock, Calendar } from "lucide-react";

export default function DoctorConsultationsPage() {
  const consultations = [
    {
      id: "1",
      patientName: "Marie Dupont",
      date: "2024-01-15",
      time: "09:00",
      type: "Consultation de suivi",
      status: "TERMINEE",
      duration: "30 min"
    },
    {
      id: "2",
      patientName: "Jean Martin",
      date: "2024-01-15",
      time: "09:30",
      type: "Première consultation",
      status: "EN_COURS",
      duration: "45 min"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "TERMINEE":
        return "bg-green-100 text-green-800 border-green-200";
      case "EN_COURS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Consultations</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle Consultation
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Consultations</CardTitle>
            <Stethoscope className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Ce mois</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <Stethoscope className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76</div>
            <p className="text-xs text-muted-foreground">85% du total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En Cours</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Aujourd'hui</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps Moyen</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25 min</div>
            <p className="text-xs text-muted-foreground">Par consultation</p>
          </CardContent>
        </Card>
      </div>

      {/* Consultations List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des consultations</CardTitle>
          <CardDescription>
            Historique de vos consultations avec les patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consultations.map((consultation) => (
              <div
                key={consultation.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {consultation.patientName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {consultation.type}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{consultation.date} à {consultation.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{consultation.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(consultation.status)}>
                    {consultation.status.replace('_', ' ')}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Voir détails
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
