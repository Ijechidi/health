"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { useToast } from "@repo/ui/hooks/use-toast";
import { 
  Users, 
  Building2, 
  Stethoscope, 
  Calendar,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { 
  useUserStats, 
  useHospitalStats, 
  useSpecialtyStats, 
  useDoctorStats 
} from "@/hooks/useAdminData";

export default function AdminHomePage() {
  const { toast } = useToast();
  
  // Récupération des statistiques réelles
  const { data: userStats, isLoading: loadingUsers, error: usersError } = useUserStats();
  const { data: hospitalStats, isLoading: loadingHospitals, error: hospitalsError } = useHospitalStats();
  const { data: specialtyStats, isLoading: loadingSpecialties, error: specialtiesError } = useSpecialtyStats();
  const { data: doctorStats, isLoading: loadingDoctors, error: doctorsError } = useDoctorStats();

  // Gestion des erreurs
  if (usersError) {
    toast.error("Erreur lors du chargement des statistiques utilisateurs");
  }
  if (hospitalsError) {
    toast.error("Erreur lors du chargement des statistiques hôpitaux");
  }
  if (specialtiesError) {
    toast.error("Erreur lors du chargement des statistiques spécialités");
  }
  if (doctorsError) {
    toast.error("Erreur lors du chargement des statistiques médecins");
  }

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
      title: "Activation Médecins",
      description: "Activer les comptes médecins",
      icon: Calendar,
      href: "/admin/assignments",
      color: "bg-orange-600"
    }
  ];

  // Statistiques réelles
  const stats = [
    { 
      label: "Utilisateurs totaux", 
      value: userStats?.totalUsers?.toString() || "0",
      icon: Users,
      color: "text-blue-600"
    },
    { 
      label: "Médecins", 
      value: doctorStats?.totalDoctors?.toString() || "0",
      icon: Stethoscope,
      color: "text-green-600"
    },
    { 
      label: "Patients", 
      value: userStats?.totalPatients?.toString() || "0",
      icon: Users,
      color: "text-purple-600"
    },
    { 
      label: "Hôpitaux", 
      value: hospitalStats?.totalHospitals?.toString() || "0",
      icon: Building2,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Administration</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Gestion globale du système de santé</p>
        </div>
        {/* <div className="flex items-center gap-3">
          <Button className="bg-black hover:bg-neutral-800">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle action
          </Button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          const isLoading = loadingUsers || loadingHospitals || loadingSpecialties || loadingDoctors;
          
          return (
            <Card key={index}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                    <p className="text-xl sm:text-2xl font-bold text-gray-900">
                      {isLoading ? "..." : stat.value}
                    </p>
                  </div>
                  <div className={`p-2 sm:p-3 rounded-lg bg-gray-100 ${stat.color} flex-shrink-0 ml-2`}>
                    <IconComponent className="h-4 w-4 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Médecins en attente d'activation */}
      {doctorStats?.pendingDoctors && doctorStats.pendingDoctors > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Clock className="h-5 w-5" />
              Médecins en attente d'activation
            </CardTitle>
            <CardDescription>
              {doctorStats.pendingDoctors} médecin(s) en attente de validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-orange-700">
                  Action requise pour {doctorStats.pendingDoctors} compte(s)
                </span>
              </div>
              <Button 
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => window.location.href = '/admin/assignments'}
              >
                Voir les comptes
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <Button 
                  variant="ghost" 
                  className="w-full justify-between p-0 h-auto"
                  onClick={() => window.location.href = action.href}
                >
                  <span className="text-sm font-medium">Accéder</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div> */}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
