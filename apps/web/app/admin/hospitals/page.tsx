"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { 
  Building2, 
  Search, 
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Users,
  Calendar
} from "lucide-react";

interface Hospital {
  id: string;
  nom: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
  medecinsCount: number;
  patientsCount: number;
  dateCreation: string;
}

export default function AdminHospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data selon le schéma
  const hospitals = useMemo(() => ([
    {
      id: 'h1',
      nom: 'Hôpital Principal',
      adresse: '123 Avenue de la République, Dakar',
      description: 'Hôpital de référence principal de la région',
      contact: '+221 33 123 45 67',
      localisation: 'Dakar, Sénégal',
      medecinsCount: 45,
      patientsCount: 1200,
      dateCreation: '2024-01-01'
    },
    {
      id: 'h2',
      nom: 'Centre Médical Saint-Louis',
      adresse: '456 Rue de la Santé, Saint-Louis',
      description: 'Centre médical spécialisé',
      contact: '+221 33 234 56 78',
      localisation: 'Saint-Louis, Sénégal',
      medecinsCount: 23,
      patientsCount: 800,
      dateCreation: '2024-01-15'
    },
    {
      id: 'h3',
      nom: 'Clinique Privée Excellence',
      adresse: '789 Boulevard de l\'Excellence, Thiès',
      description: 'Clinique privée de haute qualité',
      contact: '+221 33 345 67 89',
      localisation: 'Thiès, Sénégal',
      medecinsCount: 18,
      patientsCount: 450,
      dateCreation: '2024-02-01'
    }
  ]), []);

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital =>
      hospital.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.localisation?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [hospitals, searchTerm]);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des hôpitaux</h1>
          <p className="text-gray-600 mt-2">Administrer les établissements de santé</p>
        </div>
        <Button className="bg-black hover:bg-neutral-800">
          <Plus className="h-4 w-4 mr-2" />
          Nouvel hôpital
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher un hôpital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Hospitals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card key={hospital.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{hospital.nom}</CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      {hospital.localisation}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">{hospital.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{hospital.adresse}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{hospital.contact}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-blue-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Médecins</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{hospital.medecinsCount}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-green-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Patients</span>
                  </div>
                  <p className="text-lg font-bold text-green-600">{hospital.patientsCount}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Créé le {hospital.dateCreation}
                </span>
                <Badge variant="outline">Actif</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total hôpitaux</p>
                <p className="text-2xl font-bold text-gray-900">{hospitals.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Médecins total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {hospitals.reduce((sum, h) => sum + h.medecinsCount, 0)}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Patients total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {hospitals.reduce((sum, h) => sum + h.patientsCount, 0)}
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
                <p className="text-sm font-medium text-gray-600">Moyenne médecin/hôpital</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(hospitals.reduce((sum, h) => sum + h.medecinsCount, 0) / hospitals.length)}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
