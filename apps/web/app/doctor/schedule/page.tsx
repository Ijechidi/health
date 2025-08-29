"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Calendar, Plus, Clock, User, MapPin } from "lucide-react";

export default function DoctorSchedulePage() {
  const appointments = [
    {
      id: "1",
      date: "2024-01-15",
      time: "09:00",
      patientName: "Marie Dupont",
      type: "Consultation de suivi",
      status: "CONFIRME",
      duration: "30 min",
      location: "Cabinet A"
    },
    {
      id: "2",
      date: "2024-01-15",
      time: "09:30",
      patientName: "Jean Martin",
      type: "Première consultation",
      status: "EN_ATTENTE",
      duration: "45 min",
      location: "Cabinet A"
    },
    {
      id: "3",
      date: "2024-01-15",
      time: "10:15",
      patientName: "Sophie Bernard",
      type: "Contrôle post-opératoire",
      status: "CONFIRME",
      duration: "20 min",
      location: "Cabinet B"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONFIRME":
        return "bg-green-100 text-green-800 border-green-200";
      case "EN_ATTENTE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "ANNULE":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Planning</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            Aujourd'hui
          </Button>
          <Button className=" bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Nouveau RDV
          </Button>
        </div>
      </div>

      {/* Calendar Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Vue d'ensemble</CardTitle>
          <CardDescription>
            Votre planning pour la semaine du 15 au 21 janvier 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-7">
            {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
              <div key={day} className="text-center p-4 border rounded-lg">
                <div className="font-medium text-sm text-muted-foreground">{day}</div>
                <div className="text-2xl font-bold mt-2">{15 + index}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {index === 0 ? "3 RDV" : index === 1 ? "2 RDV" : "0 RDV"}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Appointments */}
      <Card>
        <CardHeader>
          <CardTitle>Rendez-vous d'aujourd'hui</CardTitle>
          <CardDescription>
            Mardi 15 janvier 2024
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {appointment.time}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {appointment.duration}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {appointment.patientName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.type}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {appointment.location}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.replace('_', ' ')}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    Modifier
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Gérez votre planning efficacement
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Plus className="h-6 w-6" />
              <span>Nouveau RDV</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="h-6 w-6" />
              <span>Voir semaine</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="h-6 w-6" />
              <span>Horaires</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
