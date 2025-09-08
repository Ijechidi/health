"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { 
  Calendar, 
  Users, 
  Clock, 
  FileText,
  Plus,
  Eye,
  TrendingUp,
  Activity,
  UserCheck,
  FileCheck
} from "lucide-react";

export default function DoctorDashboardPage() {
  const todayAppointments = [
    {
      id: "1",
      time: "09:00",
      patientName: "Marie Dupont",
      patientAge: 45,
      type: "Consultation de suivi",
      status: "EN_COURS"
    },
    {
      id: "2",
      time: "09:30",
      patientName: "Jean Martin",
      patientAge: 62,
      type: "Première consultation",
      status: "EN_ATTENTE"
    },
    {
      id: "3",
      time: "10:00",
      patientName: "Sophie Bernard",
      patientAge: 38,
      type: "Contrôle post-opératoire",
      status: "EN_ATTENTE"
    }
  ];

  const stats = [
    { label: "Patients aujourd'hui", value: "12", icon: Users, trend: "+2", color: "text-blue-600" },
    { label: "Consultations terminées", value: "8", icon: UserCheck, trend: "+1", color: "text-green-600" },
    { label: "Documents générés", value: "5", icon: FileCheck, trend: "+3", color: "text-orange-600" }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "EN_COURS":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "EN_ATTENTE":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "TERMINE":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          
          
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                <div className="flex items-center space-x-1 text-xs text-green-600">
                  <TrendingUp className="h-3 w-3" />
                  <span>{stat.trend}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Rendez-vous du jour */}
      <Card className="border-blue-100">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>Rendez-vous du jour</CardTitle>
              <CardDescription>
                Aperçu de votre planning du jour
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
              Voir tout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {appointment.time}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {appointment.patientName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {appointment.patientAge} ans • {appointment.type}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status.replace('_', ' ')}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides */}
      {/* <Card className="border-blue-100">
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
          <CardDescription>
            Accédez rapidement aux fonctionnalités essentielles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
              <Calendar className="h-6 w-6" />
              <span>Nouveau RDV</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
              <FileText className="h-6 w-6" />
              <span>Ordonnance</span>
            </Button>
            
            <Button variant="outline" className="h-20 flex-col gap-2 border-blue-200 text-blue-700 hover:bg-blue-50">
              <Clock className="h-6 w-6" />
              <span>Planning</span>
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}
