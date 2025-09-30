"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { useToast } from "@repo/ui/hooks/use-toast";
import { 
  Stethoscope, 
  Search, 
  Filter, 
  CheckCircle, 
  XCircle, 
  Clock,
  Eye,
  User,
  Building2,
  GraduationCap,
  Calendar
} from "lucide-react";

interface DoctorRequest {
  id: string;
  numLicence: string;
  anneeExperience?: number;
  titre: string;
  statutApproval: 'EN_ATTENTE' | 'APPROUVE' | 'REJETE';
  dateCreation: string;
  utilisateur: {
    nom: string;
    prenom?: string;
    email: string;
  };
  specialite: {
    nom: string;
  };
  hopitaux: Array<{
    hopital: {
      nom: string;
    };
  }>;
}

export default function AdminDoctorsPage() {
  const { toast } = useToast();
  const [doctors, setDoctors] = useState<DoctorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorRequest | null>(null);

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/doctors');
      const result = await response.json();
      
      if (result.success) {
        setDoctors(result.data);
      } else {
        toast.error("Erreur lors du chargement des médecins");
      }
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      toast.error("Erreur lors du chargement des médecins");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (doctorId: string) => {
    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}/approve`, {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Médecin approuvé avec succès");
        loadDoctors();
      } else {
        toast.error(result.error || "Erreur lors de l'approbation");
      }
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast.error("Erreur lors de l'approbation");
    }
  };

  const handleReject = async (doctorId: string) => {
    try {
      const response = await fetch(`/api/admin/doctors/${doctorId}/reject`, {
        method: 'POST'
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast.success("Médecin rejeté");
        loadDoctors();
      } else {
        toast.error(result.error || "Erreur lors du rejet");
      }
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      toast.error("Erreur lors du rejet");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'EN_ATTENTE':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'APPROUVE':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'REJETE':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'EN_ATTENTE':
        return 'bg-yellow-100 text-yellow-800';
      case 'APPROUVE':
        return 'bg-green-100 text-green-800';
      case 'REJETE':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'EN_ATTENTE':
        return 'En attente';
      case 'APPROUVE':
        return 'Approuvé';
      case 'REJETE':
        return 'Rejeté';
      default:
        return 'Inconnu';
    }
  };

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.utilisateur.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.utilisateur.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.numLicence.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || doctor.statutApproval === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const pendingCount = doctors.filter(d => d.statutApproval === 'EN_ATTENTE').length;
  const approvedCount = doctors.filter(d => d.statutApproval === 'APPROUVE').length;
  const rejectedCount = doctors.filter(d => d.statutApproval === 'REJETE').length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des médecins...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Gestion des médecins</h1>
              <p className="text-sm sm:text-base text-gray-600">Approbation des demandes de médecins</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">En attente</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Approuvés</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{approvedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">Rejetés</p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">{rejectedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filtres */}
        <Card className="mb-4 sm:mb-6">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Rechercher par nom, email ou numéro de licence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 text-sm"
                  />
                </div>
              </div>
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                    <SelectItem value="APPROUVE">Approuvé</SelectItem>
                    <SelectItem value="REJETE">Rejeté</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Liste des médecins */}
        <div className="space-y-4">
          {filteredDoctors.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Stethoscope className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun médecin trouvé</h3>
                <p className="text-gray-500">
                  {searchTerm || statusFilter !== "all" 
                    ? "Aucun médecin ne correspond à vos critères de recherche."
                    : "Aucune demande de médecin pour le moment."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Stethoscope className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                              {doctor.utilisateur.prenom} {doctor.utilisateur.nom}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600">{doctor.utilisateur.email}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(doctor.statutApproval)}>
                          {getStatusIcon(doctor.statutApproval)}
                          <span className="ml-1 text-xs">{getStatusText(doctor.statutApproval)}</span>
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">Spécialité:</span>
                          <span className="font-medium truncate">{doctor.specialite.nom}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <User className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">Licence:</span>
                          <span className="font-medium truncate">{doctor.numLicence}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <Building2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">Hôpitaux:</span>
                          <span className="font-medium">{doctor.hopitaux.length}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs sm:text-sm">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 flex-shrink-0" />
                          <span className="text-gray-600">Demande:</span>
                          <span className="font-medium">
                            {new Date(doctor.dateCreation).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>

                      {doctor.hopitaux.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Hôpitaux demandés:</p>
                          <div className="flex flex-wrap gap-1 sm:gap-2">
                            {doctor.hopitaux.map((hopital, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {hopital.hopital.nom}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 lg:ml-4">
                      {doctor.statutApproval === 'EN_ATTENTE' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApprove(doctor.id)}
                            className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                          >
                            <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Approuver</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(doctor.id)}
                            className="w-full sm:w-auto"
                          >
                            <XCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            <span className="text-xs sm:text-sm">Rejeter</span>
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedDoctor(doctor)}
                        className="w-full sm:w-auto"
                      >
                        <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        <span className="text-xs sm:text-sm">Voir</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
