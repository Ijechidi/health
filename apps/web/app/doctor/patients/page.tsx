"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Input } from "@repo/ui/components/input";
import { Users, Plus, Search, Eye, Edit, Phone, Mail, Calendar } from "lucide-react";

export default function DoctorPatientsPage() {
  const patients = [
    {
      id: "1",
      name: "Marie Dupont",
      age: 45,
      email: "marie.dupont@email.com",
      phone: "06 12 34 56 78",
      lastVisit: "2024-01-10",
      status: "ACTIF",
      specialty: "Cardiologie"
    },
    {
      id: "2",
      name: "Jean Martin",
      age: 62,
      email: "jean.martin@email.com",
      phone: "06 98 76 54 32",
      lastVisit: "2024-01-08",
      status: "ACTIF",
      specialty: "Cardiologie"
    },
    {
      id: "3",
      name: "Sophie Bernard",
      age: 38,
      email: "sophie.bernard@email.com",
      phone: "06 11 22 33 44",
      lastVisit: "2024-01-05",
      status: "ACTIF",
      specialty: "Cardiologie"
    },
    {
      id: "4",
      name: "Pierre Dubois",
      age: 55,
      email: "pierre.dubois@email.com",
      phone: "06 55 66 77 88",
      lastVisit: "2023-12-20",
      status: "INACTIF",
      specialty: "Cardiologie"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIF":
        return "bg-green-100 text-green-800 border-green-200";
      case "INACTIF":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
        
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Rechercher un patient</CardTitle>
          <CardDescription>
            Trouvez rapidement les informations de vos patients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  className="pl-8"
                />
              </div>
            </div>
            <Button variant="outline">Filtres</Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              +12 ce mois
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">
              91% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux ce mois</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 cette semaine
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des patients</CardTitle>
          <CardDescription>
            Vos patients avec leurs informations de contact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} ans • {patient.specialty}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{patient.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Dernière visite
                    </div>
                    <div className="text-sm font-medium">
                      {patient.lastVisit}
                    </div>
                  </div>
                  <Badge className={getStatusColor(patient.status)}>
                    {patient.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
