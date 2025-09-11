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
  TrendingDown,
  Activity,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3
} from "lucide-react";

export default function AdminDashboardPage() {
  const stats = [
    { 
      label: "Utilisateurs totaux", 
      value: "1,247", 
      change: "+12%", 
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    { 
      label: "Médecins actifs", 
      value: "89", 
      change: "+5%", 
      trend: "up",
      icon: Stethoscope,
      color: "text-green-600"
    },
    { 
      label: "Patients", 
      value: "1,158", 
      change: "+8%", 
      trend: "up",
      icon: Users,
      color: "text-purple-600"
    },
    { 
      label: "Hôpitaux", 
      value: "12", 
      change: "0%", 
      trend: "stable",
      icon: Building2,
      color: "text-orange-600"
    },
    { 
      label: "Rendez-vous aujourd'hui", 
      value: "47", 
      change: "+15%", 
      trend: "up",
      icon: Calendar,
      color: "text-indigo-600"
    },
    { 
      label: "Documents créés", 
      value: "23", 
      change: "+3%", 
      trend: "up",
      icon: Activity,
      color: "text-pink-600"
    }
  ];

  const recentActivities = [
    { 
      type: "user_created", 
      message: "Nouveau médecin ajouté", 
      details: "Dr. Ndiaye - Cardiologie", 
      time: "Il y a 2h",
      icon: Stethoscope,
      color: "text-green-600"
    },
    { 
      type: "patient_registered", 
      message: "Patient enregistré", 
      details: "Marie Dupont", 
      time: "Il y a 4h",
      icon: Users,
      color: "text-blue-600"
    },
    { 
      type: "hospital_updated", 
      message: "Hôpital mis à jour", 
      details: "Hôpital Principal", 
      time: "Il y a 6h",
      icon: Building2,
      color: "text-purple-600"
    },
    { 
      type: "appointment_confirmed", 
      message: "Rendez-vous confirmé", 
      details: "Dr. Diop - 14h00", 
      time: "Il y a 8h",
      icon: Calendar,
      color: "text-indigo-600"
    },
    { 
      type: "document_created", 
      message: "Document créé", 
      details: "Ordonnance #1234", 
      time: "Il y a 10h",
      icon: Activity,
      color: "text-pink-600"
    }
  ];

  const systemHealth = [
    { label: "Serveur", status: "healthy", value: "99.9%" },
    { label: "Base de données", status: "healthy", value: "99.8%" },
    { label: "API", status: "warning", value: "98.5%" },
    { label: "Stockage", status: "healthy", value: "85%" }
  ];

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Administrateur</h1>
          <p className="text-gray-600 mt-2">Vue d'ensemble du système de santé</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Rapports
          </Button>
          <Button className="bg-black hover:bg-neutral-800">
            <Activity className="h-4 w-4 mr-2" />
            Actions rapides
          </Button>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 mt-2">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 text-green-600" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  ) : (
                    <Activity className="h-4 w-4 text-gray-600" />
                  )}
                  <span className={`text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 
                    stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              Activité récente
            </CardTitle>
            <CardDescription>Dernières actions du système</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 ${activity.color.replace('text-', 'bg-')} rounded-full`}></div>
                    <Icon className={`h-4 w-4 ${activity.color}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-gray-500">{activity.details}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Santé du système
            </CardTitle>
            <CardDescription>État des services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((health, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      health.status === 'healthy' ? 'bg-green-500' : 
                      health.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="text-sm font-medium">{health.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{health.value}</span>
                    {health.status === 'healthy' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : health.status === 'warning' ? (
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Gérer les utilisateurs</h3>
                <p className="text-sm text-gray-600">Créer et modifier les comptes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Hôpitaux</h3>
                <p className="text-sm text-gray-600">Gérer les établissements</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Spécialités</h3>
                <p className="text-sm text-gray-600">Configurer les spécialités</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Assignations</h3>
                <p className="text-sm text-gray-600">Attribuer les rôles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
