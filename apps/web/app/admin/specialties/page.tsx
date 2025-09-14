"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { 
  Stethoscope, 
  Search, 
  Plus,
  Edit,
  Trash2,
  Users,
  Calendar,
  Activity
} from "lucide-react";
import { DeleteSpecialtyModal } from "@/components/admin/DeleteSpecialtyModal";
import { NewSpecialtyModal } from "@/components/admin/NewSpecialtyModal";
import { EditSpecialtyModal } from "@/components/admin/EditSpecialtyModal";

interface Specialty {
  id: string;
  nom: string;
  description?: string;
  dateCreation: string;
}

export default function AdminSpecialtiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newSpecialtyModalOpen, setNewSpecialtyModalOpen] = useState(false);
  const [editSpecialtyModalOpen, setEditSpecialtyModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  // Mock data selon le schéma
  const specialties = useMemo(() => ([
    {
      id: 's1',
      nom: 'Cardiologie',
      description: 'Spécialité médicale qui traite les maladies du cœur et des vaisseaux sanguins',
      dateCreation: '2024-01-01'
    },
    {
      id: 's2',
      nom: 'Dermatologie',
      description: 'Spécialité médicale qui traite les maladies de la peau, des cheveux et des ongles',
      dateCreation: '2024-01-05'
    },
    {
      id: 's3',
      nom: 'Pédiatrie',
      description: 'Spécialité médicale qui traite les enfants de la naissance à l\'adolescence',
      dateCreation: '2024-01-10'
    },
    {
      id: 's4',
      nom: 'Gynécologie',
      description: 'Spécialité médicale qui traite les maladies de l\'appareil génital féminin',
      dateCreation: '2024-01-15'
    },
    {
      id: 's5',
      nom: 'Neurologie',
      description: 'Spécialité médicale qui traite les maladies du système nerveux',
      dateCreation: '2024-01-20'
    },
    {
      id: 's6',
      nom: 'Orthopédie',
      description: 'Spécialité chirurgicale qui traite les maladies des os et des articulations',
      dateCreation: '2024-01-25'
    }
  ]), []);

  const handleDeleteSpecialty = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedSpecialty) {
      // Mock: Simuler la suppression
      console.log('Suppression de la spécialité:', selectedSpecialty.id);
      // En réalité, appeler l'API de suppression
    }
  };

  const handleCreateSpecialty = async (specialtyData: any) => {
    setCreating(true);
    try {
      // Mock: Simuler la création
      console.log('Création de la spécialité:', specialtyData);
      // En réalité, appeler l'API de création
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      setNewSpecialtyModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la création:', error);
    } finally {
      setCreating(false);
    }
  };

  const handleEditSpecialty = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setEditSpecialtyModalOpen(true);
  };

  const handleSaveSpecialty = async (specialtyData: any) => {
    setSaving(true);
    try {
      // Mock: Simuler la sauvegarde
      console.log('Sauvegarde de la spécialité:', specialtyData);
      // En réalité, appeler l'API de mise à jour
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulation
      setEditSpecialtyModalOpen(false);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    } finally {
      setSaving(false);
    }
  };

  // Mock: Simuler le nombre de médecins utilisant cette spécialité
  const getAssignedUsersCount = (specialtyId: string) => {
    // En réalité, faire une requête pour compter les médecins avec cette spécialité
    const mockCounts: { [key: string]: number } = {
      's1': 12, // Cardiologie
      's2': 8,  // Dermatologie
      's3': 15, // Pédiatrie
      's4': 6,  // Gynécologie
      's5': 4,  // Neurologie
      's6': 7   // Orthopédie
    };
    return mockCounts[specialtyId] || 0;
  };

  const filteredSpecialties = useMemo(() => {
    return specialties.filter(specialty =>
      specialty.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      specialty.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [specialties, searchTerm]);

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des spécialités</h1>
          <p className="text-gray-600 mt-2">Administrer les spécialités médicales</p>
        </div>
        <Button 
          className="bg-black hover:bg-neutral-800"
          onClick={() => setNewSpecialtyModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle spécialité
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Rechercher une spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
            />
          </div>
        </CardContent>
      </Card>

      {/* Specialties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialties.map((specialty) => (
          <Card key={specialty.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{specialty.nom}</CardTitle>
                    <CardDescription className="mt-1">
                      {specialty.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleEditSpecialty(specialty)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleDeleteSpecialty(specialty)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-sm font-medium">Médecins</span>
                  </div>
              
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                    <Activity className="h-4 w-4" />
                    <span className="text-sm font-medium">Patients</span>
                  </div>
                  <p className="text-xl font-bold text-green-600">{specialty.patientsCount}</p>
                </div>
              </div> */}

              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Créé le {specialty.dateCreation}
                </span>
                {/* <Badge variant="outline">Actif</Badge> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total spécialités</p>
                <p className="text-2xl font-bold text-gray-900">{specialties.length}</p>
              </div>
              <Stethoscope className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Médecins total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {specialties.reduce((sum, s) => sum + s.medecinsCount, 0)}
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
                  {specialties.reduce((sum, s) => sum + s.patientsCount, 0)}
                </p>
              </div>
              <Activity className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Moyenne médecin/spécialité</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.round(specialties.reduce((sum, s) => sum + s.medecinsCount, 0) / specialties.length)}
                </p>
              </div>
              <Users className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {selectedSpecialty && (
        <DeleteSpecialtyModal
          open={deleteModalOpen}
          onOpenChange={setDeleteModalOpen}
          specialty={selectedSpecialty}
          assignedUsers={getAssignedUsersCount(selectedSpecialty.id)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <NewSpecialtyModal
        open={newSpecialtyModalOpen}
        onOpenChange={setNewSpecialtyModalOpen}
        onCreate={handleCreateSpecialty}
        loading={creating}
      />

      {selectedSpecialty && (
        <EditSpecialtyModal
          open={editSpecialtyModalOpen}
          onOpenChange={setEditSpecialtyModalOpen}
          specialty={selectedSpecialty}
          onSave={handleSaveSpecialty}
          loading={saving}
        />
      )}
    </div>
  );
}
