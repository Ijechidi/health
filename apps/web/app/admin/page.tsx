"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { 
  Users, 
  Building2, 
  Stethoscope, 
  Calendar,
  TrendingUp,
  AlertCircle,
  Plus,
  ArrowRight
} from "lucide-react";

export default function AdminHomePage() {
  const quickActions = [
    {
      title: "Gérer les utilisateurs",
      description: "Créer et modifier les comptes",
      icon: Users,
      href: "/admin/users",
      color: "bg-blue-600"
    },
    {
      title: "Hôpitaux",
      description: "Gérer les établissements",
      icon: Building2,
      href: "/admin/hospitals",
      color: "bg-green-600"
    },
    {
      title: "Spécialités médicales",
      description: "Configurer les spécialités",
      icon: Stethoscope,
      href: "/admin/specialties",
      color: "bg-purple-600"
    },
    {
      title: "Assignations",
      description: "Attribuer les rôles",
      icon: Calendar,
      href: "/admin/assignments",
      color: "bg-orange-600"
    }
  ];

  const stats = [
    { label: "Utilisateurs totaux", value: "1,247", change: "+12%", trend: "up" },
    { label: "Médecins actifs", value: "89", change: "+5%", trend: "up" },
    { label: "Patients", value: "1,158", change: "+8%", trend: "up" },
    { label: "Hôpitaux", value: "12", change: "0%", trend: "stable" }
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-600 mt-2">Gestion globale du système de santé</p>
        </div>
        {/* <div className="flex items-center gap-3">
          <Button className="bg-black hover:bg-neutral-800">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle action
          </Button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 
                  stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <TrendingUp className="h-4 w-4" />
                  {stat.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="ghost" className="w-full justify-between p-0 h-auto">
                  <span className="text-sm font-medium">Accéder</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Activité récente
            </CardTitle>
            <CardDescription>Dernières actions du système</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Nouveau médecin ajouté</p>
                  <p className="text-xs text-gray-500">Dr. Ndiaye - Cardiologie</p>
                </div>
                <span className="text-xs text-gray-400">Il y a 2h</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Patient enregistré</p>
                  <p className="text-xs text-gray-500">Marie Dupont</p>
                </div>
                <span className="text-xs text-gray-400">Il y a 4h</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Hôpital mis à jour</p>
                  <p className="text-xs text-gray-500">Hôpital Principal</p>
                </div>
                <span className="text-xs text-gray-400">Il y a 6h</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Statistiques rapides
            </CardTitle>
            <CardDescription>Vue d'ensemble du système</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Rendez-vous aujourd'hui</span>
                <span className="font-semibold">47</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Documents créés</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Recommandations</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Utilisateurs connectés</span>
                <span className="font-semibold">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
