"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Badge } from "@repo/ui/components/badge";
import { 
  UserCheck, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Users,
  Building2,
  Calendar,
  Shield,
  Stethoscope,
  Heart
} from "lucide-react";

interface Assignment {
  id: string;
  utilisateurId: string;
  hopitalId: string;
  role: 'admin' | 'medecin' | 'patient';
  dateDebut: string;
  dateFin?: string;
  utilisateur: {
    nom: string;
    prenom?: string;
    email: string;
  };
  hopital: {
    nom: string;
    adresse: string;
  };
  status: 'actif' | 'inactif';
}

export default function AdminAssignmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock data selon le schéma UtilisateurHopital
  const assignments = useMemo(() => ([
    {
      id: 'a1',
      utilisateurId: 'u1',
      hopitalId: 'h1',
      role: 'medecin' as const,
      dateDebut: '2024-01-15',
      dateFin: undefined,
      utilisateur: {
        nom: 'Ndiaye',
        prenom: 'Ahmadou',
        email: 'ahmadou.ndiaye@email.com'
      },
      hopital: {
        nom: 'Hôpital Principal',
        adresse: '123 Avenue de la République, Dakar'
      },
      status: 'actif' as const
    },
    {
      id: 'a2',
      utilisateurId: 'u2',
      hopitalId: 'h1',
      role: 'medecin' as const,
      dateDebut: '2024-01-20',
      dateFin: undefined,
      utilisateur: {
        nom: 'Diop',
        prenom: 'Fatou',
        email: 'fatou.diop@email.com'
      },
      hopital: {
        nom: 'Hôpital Principal',
        adresse: '123 Avenue de la République, Dakar'
      },
      status: 'actif' as const
    },
    {
      id: 'a3',
      utilisateurId: 'u3',
      hopitalId: 'h1',
      role: 'patient' as const,
      dateDebut: '2024-02-01',
      dateFin: undefined,
      utilisateur: {
        nom: 'Dupont',
        prenom: 'Marie',
        email: 'marie.dupont@email.com'
      },
      hopital: {
        nom: 'Hôpital Principal',
        adresse: '123 Avenue de la République, Dakar'
      },
      status: 'actif' as const
    },
    {
      id: 'a4',
      utilisateurId: 'u4',
      hopitalId: 'h1',
      role: 'admin' as const,
      dateDebut: '2024-01-01',
      dateFin: undefined,
      utilisateur: {
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@system.com'
      },
      hopital: {
        nom: 'Hôpital Principal',
        adresse: '123 Avenue de la République, Dakar'
      },
      status: 'actif' as const
    },
    {
      id: 'a5',
      utilisateurId: 'u5',
      hopitalId: 'h2',
      role: 'medecin' as const,
      dateDebut: '2024-01-10',
      dateFin: '2024-03-15',
      utilisateur: {
        nom: 'Fall',
        prenom: 'Moussa',
        email: 'moussa.fall@email.com'
      },
      hopital: {
        nom: 'Centre Médical Saint-Louis',
        adresse: '456 Rue de la Santé, Saint-Louis'
      },
      status: 'inactif' as const
    }
  ]), []);

  const filteredAssignments = useMemo(() => {
    return assignments.filter(assignment => {
      const matchesSearch = 
        assignment.utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.utilisateur.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assignment.hopital.nom.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || assignment.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [assignments, searchTerm, roleFilter, statusFilter]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'medecin': return <Stethoscope className="h-4 w-4" />;
      case 'patient': return <Heart className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    // Thème noir & blanc: badges en nuances de gris
    return 'bg-gray-200 text-gray-800 border-gray-300';
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des assignations</h1>
          <p className="text-gray-600 mt-2">Attribuer les rôles utilisateur-hôpital</p>
        </div>
        <Button className="bg-black hover:bg-neutral-800">
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle assignation
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Utilisateur, hôpital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Rôle</label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600">
                  <SelectValue placeholder="Tous les rôles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les rôles</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="medecin">Médecin</SelectItem>
                  <SelectItem value="patient">Patient</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600">
                  <SelectValue placeholder="Tous les statuts" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="actif">Actif</SelectItem>
                  <SelectItem value="inactif">Inactif</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Réinitialiser
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Liste des assignations ({filteredAssignments.length})
          </CardTitle>
          <CardDescription>
            Gérer les rôles et permissions par hôpital
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getRoleIcon(assignment.role)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-900">
                        {assignment.utilisateur.prenom} {assignment.utilisateur.nom}
                      </h3>
                      <Badge className={getRoleColor(assignment.role)}>
                        {assignment.role === 'admin' ? 'Admin' : 
                         assignment.role === 'medecin' ? 'Médecin' : 'Patient'}
                      </Badge>
                      <Badge className={`${assignment.status === 'actif' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'} border border-gray-300`}>
                        {assignment.status === 'actif' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <div className="flex items-center gap-1 mb-1">
                        <Building2 className="h-3 w-3" />
                        <span>{assignment.hopital.nom}</span>
                      </div>
                      <p>{assignment.utilisateur.email}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Début: {assignment.dateDebut}
                        </span>
                        {assignment.dateFin && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Fin: {assignment.dateFin}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total assignations</p>
                <p className="text-2xl font-bold text-gray-900">{assignments.length}</p>
              </div>
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Assignations actives</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter(a => a.status === 'actif').length}
                </p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Médecins assignés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter(a => a.role === 'medecin' && a.status === 'actif').length}
                </p>
              </div>
              <Stethoscope className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patients assignés</p>
                <p className="text-2xl font-bold text-gray-900">
                  {assignments.filter(a => a.role === 'patient' && a.status === 'actif').length}
                </p>
              </div>
              <Heart className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div> */}
    </div>
  );
}
