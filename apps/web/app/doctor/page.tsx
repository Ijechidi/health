"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { 
  Stethoscope, 
  Calendar, 
  Users, 
  FileText, 
  Plus,
  ArrowRight
} from "lucide-react";

export default function DoctorHomePage() {
  const quickActions = [
    {
      title: "Voir mon planning",
      description: "Consultez vos rendez-vous du jour",
      icon: Calendar,
      href: "/doctor/schedule"
    },
    {
      title: "Mes patients",
      description: "Accédez à votre base de patients",
      icon: Users,
      href: "/doctor/patients"
    },
    {
      title: "Nouvelle consultation",
      description: "Démarrer une consultation",
      icon: Stethoscope,
      href: "/doctor/consultations"
    },
    {
      title: "Documents",
      description: "Gérer ordonnances et rapports",
      icon: FileText,
      href: "/doctor/documents"
    }
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Accueil</h2>
        
      </div>

      {/* Welcome Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-full">
              <Stethoscope className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl">Bienvenue, Docteur</CardTitle>
              <CardDescription className="text-blue-100">
                Votre plateforme de gestion médicale intelligente
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-blue-100 mb-4">
            Commencez votre journée en consultant votre planning ou en accédant rapidement aux fonctionnalités essentielles.
          </p>
          <div className="flex space-x-2">
            <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
              Voir mon planning
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Commencer ma journée
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow border-blue-100">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {action.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground mb-4">
                  {action.description}
                </p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" variant="default">
                  Accéder
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Stats Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Aperçu de la journée</CardTitle>
          <CardDescription>
            Résumé de vos activités du jour
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-muted-foreground">Rendez-vous</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-green-600">5</div>
              <div className="text-sm text-muted-foreground">Consultations terminées</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-muted-foreground">Documents générés</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
