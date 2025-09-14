"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { Plus, Search, Building2, MapPin, Phone, Calendar, Edit, Trash2 } from "lucide-react";
import { DeleteHospitalModal } from "@/components/admin/DeleteHospitalModal";
import { NewHospitalModal } from "@/components/admin/NewHospitalModal";
import { EditHospitalModal } from "@/components/admin/EditHospitalModal";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newHospitalModalOpen, setNewHospitalModalOpen] = useState(false);
  const [editHospitalModalOpen, setEditHospitalModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Mock data selon le schéma - Hôpitaux du Togo
  const hospitals = useMemo(() => ([
    {
      id: 'h1',
      nom: 'Centre Hospitalier Universitaire (CHU) de Lomé',
      adresse: 'Boulevard du 13 Janvier, Lomé',
      description: 'Hôpital de référence principal du Togo',
      contact: '+228 22 21 20 19',
      localisation: 'Lomé, Togo',
      medecinsCount: 45,
      patientsCount: 1200,
      dateCreation: '2024-01-01'
    },
    {
      id: 'h2',
      nom: 'Hôpital Régional de Kara',
      adresse: 'Avenue du 15 Janvier, Kara',
      description: 'Hôpital régional du nord du Togo',
      contact: '+228 26 60 00 00',
      localisation: 'Kara, Togo',
      medecinsCount: 23,
      patientsCount: 800,
      dateCreation: '2024-01-15'
    },
    {
      id: 'h3',
      nom: 'Centre Médical de Sokodé',
      adresse: 'Rue de la Santé, Sokodé',
      description: 'Centre médical de la région centrale',
      contact: '+228 25 50 00 00',
      localisation: 'Sokodé, Togo',
      medecinsCount: 18,
      patientsCount: 450,
      dateCreation: '2024-02-01'
    },
    {
      id: 'h4',
      nom: 'Hôpital de Kpalimé',
      adresse: 'Boulevard de l\'Indépendance, Kpalimé',
      description: 'Hôpital de la région des Plateaux',
      contact: '+228 24 40 00 00',
      localisation: 'Kpalimé, Togo',
      medecinsCount: 15,
      patientsCount: 350,
      dateCreation: '2024-02-15'
    },
    {
      id: 'h5',
      nom: 'Centre de Santé d\'Atakpamé',
      adresse: 'Avenue du Général Gnassingbé, Atakpamé',
      description: 'Centre de santé de la région des Plateaux',
      contact: '+228 25 50 00 00',
      localisation: 'Atakpamé, Togo',
      medecinsCount: 12,
      patientsCount: 280,
      dateCreation: '2024-03-01'
    }
  ]), []);

  const handleDeleteHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedHospital) {
      // Mock: Simuler la suppression
      console.log('Suppression de l\'hôpital:', selectedHospital.id);
      // En réalité, appeler l'API de suppression
    }
  };

  const handleCreateHospital = async (hospitalData: any) => {
    setCreating(true);
    try {
      // Mock: Simuler la création
      console.log('Création de l\'hôpital:', hospitalData);
      // En réalité, appeler l'API de création
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      setNewHospitalModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleEditHospital = (hospital: Hospital) => {
    setSelectedHospital(hospital);
    setEditHospitalModalOpen(true);
  };

  const handleSaveHospital = async (hospitalData: any) => {
    setSaving(true);
    try {
      // Mock: Simuler la sauvegarde
      console.log('Sauvegarde de l\'hôpital:', hospitalData);
      // En réalité, appeler l'API de mise à jour
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      setEditHospitalModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  // Mock: Simuler le nombre d'utilisateurs assignés
  const getAssignedUsersCount = (hospitalId: string) => {
    // En réalité, faire une requête pour compter les assignations actives
    const mockCounts: { [key: string]: number } = {
      'h1': 12, // CHU de Lomé
      'h2': 0,  // Kara
      'h3': 5,  // Sokodé
      'h4': 0,  // Kpalimé
      'h5': 0   // Atakpamé
    };
    return mockCounts[hospitalId] || 0;
  };

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
        <Button 
          className="bg-black hover:bg-neutral-800"
          onClick={() => setNewHospitalModalOpen(true)}
        >
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
              className="pl-10 border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
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
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditHospital(hospital)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteHospital(hospital)}
                  >
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


              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Créé le {hospital.dateCreation}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modals */}
      {selectedHospital && (
        <DeleteHospitalModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          hospital={selectedHospital}
          assignedUsers={getAssignedUsersCount(selectedHospital.id)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <NewHospitalModal
        open={newHospitalModalOpen}
        onOpenChange={setNewHospitalModalOpen}
        onCreate={handleCreateHospital}
        loading={creating}
      />

      {selectedHospital && (
        <EditHospitalModal
          open={editHospitalModalOpen}
          onOpenChange={setEditHospitalModalOpen}
          hospital={selectedHospital}
          onSave={handleSaveHospital}
          loading={saving}
        />
      )}
    </div>
  );
}
