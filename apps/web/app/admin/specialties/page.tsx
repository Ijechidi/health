"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Badge } from "@repo/ui/components/badge";
import { useToast } from "@repo/ui/hooks/use-toast";
import { 
  Search, 
  Plus,
  Stethoscope, 
  Users, 
  Edit,
  Trash2,
  Heart,
  Baby,
  User
} from "lucide-react";
import { useSpecialties, useSpecialtyStats, useCreateSpecialty, useDeleteSpecialty, useUpdateSpecialty } from "@/hooks/useSpecialtyData";
import { NewSpecialtyModal } from "@/components/admin/NewSpecialtyModal";
import { EditSpecialtyModal } from "@/components/admin/EditSpecialtyModal";
import { DeleteSpecialtyModal } from "@/components/admin/DeleteSpecialtyModal";

interface Specialty {
  id: string;
  nom: string;
  description?: string;
  stats: {
    totalMedecins: number;
  };
}

export default function AdminSpecialtiesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [newSpecialtyModalOpen, setNewSpecialtyModalOpen] = useState(false);
  const [editSpecialtyModalOpen, setEditSpecialtyModalOpen] = useState(false);
  const [specialtyToEdit, setSpecialtyToEdit] = useState<Specialty | null>(null);
  const [deleteSpecialtyModalOpen, setDeleteSpecialtyModalOpen] = useState(false);
  const [specialtyToDelete, setSpecialtyToDelete] = useState<Specialty | null>(null);

  // Hooks pour les données
  const { data: specialties = [], isLoading: loadingSpecialties, error: specialtiesError } = useSpecialties();
  const { data: specialtyStats, isLoading: loadingStats } = useSpecialtyStats();
  const { toast } = useToast();

  // Mutations
  const createSpecialtyMutation = useCreateSpecialty();
  const updateSpecialtyMutation = useUpdateSpecialty();
  const deleteSpecialtyMutation = useDeleteSpecialty();

  // Filtrage des spécialités
  const filteredSpecialties = specialties.filter((specialty: Specialty) =>
    specialty.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (specialty.description && specialty.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Fonction pour créer une spécialité
  const handleCreateSpecialty = async (data: { nom: string; description?: string }) => {
    try {
      await createSpecialtyMutation.mutateAsync(data);
      toast.success("Spécialité créée avec succès");
      setNewSpecialtyModalOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la création de la spécialité");
    }
  };

  // Fonction pour ouvrir le modal de suppression
  const handleDeleteSpecialty = (specialty: Specialty) => {
    setSpecialtyToDelete(specialty);
    setDeleteSpecialtyModalOpen(true);
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!specialtyToDelete) return;

    try {
      await deleteSpecialtyMutation.mutateAsync(specialtyToDelete.id);
      toast.success("Spécialité supprimée avec succès");
      setDeleteSpecialtyModalOpen(false);
      setSpecialtyToDelete(null);
    } catch (error) {
      toast.error("Erreur lors de la suppression de la spécialité");
    }
  };

  // Fonction pour éditer une spécialité
  const handleEditSpecialty = (specialty: Specialty) => {
    setSpecialtyToEdit(specialty);
    setEditSpecialtyModalOpen(true);
  };

  // Fonction pour sauvegarder les modifications
  const handleSaveSpecialty = async (data: { nom: string; description?: string }) => {
    if (!specialtyToEdit) return;

    try {
      await updateSpecialtyMutation.mutateAsync({
        id: specialtyToEdit.id,
        data
      });
      toast.success("Spécialité mise à jour avec succès");
      setEditSpecialtyModalOpen(false);
      setSpecialtyToEdit(null);
    } catch (error) {
      toast.error("Erreur lors de la mise à jour de la spécialité");
    }
  };

  // Fonction pour obtenir l'icône selon la spécialité
  const getSpecialtyIcon = (nom: string) => {
    const lowerNom = nom.toLowerCase();
    if (lowerNom.includes('cardio')) return <Heart className="h-5 w-5 text-red-500" />;
    if (lowerNom.includes('pédiatrie') || lowerNom.includes('pediatrie')) return <Baby className="h-5 w-5 text-blue-500" />;
    if (lowerNom.includes('gynéco') || lowerNom.includes('gyneco')) return <User className="h-5 w-5 text-pink-500" />;
    return <Stethoscope className="h-5 w-5 text-green-500" />;
  };

  if (loadingSpecialties) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-2 text-gray-600">Chargement des spécialités...</p>
          </div>
        </div>
      </div>
    );
  }

  if (specialtiesError) {
    return (
      <div className="p-6">
        <div className="text-center">
          <p className="text-red-600">Erreur lors du chargement des spécialités</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Spécialités</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Gestion des spécialités médicales</p>
        </div>
        <Button 
          className="bg-black hover:bg-neutral-800 text-sm sm:text-base"
          onClick={() => setNewSpecialtyModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Nouvelle spécialité</span>
          <span className="sm:hidden">Nouvelle</span>
        </Button>
      </div>

      {/* Stats Cards */}
      {specialtyStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spécialités</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{specialtyStats.totalSpecialties}</div>
            </CardContent>
          </Card>
      <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Médecins</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{specialtyStats.totalMedecins}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher une spécialité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            />
          </div>
      </div>

      {/* Specialties List */}
      <div className="space-y-4">
        {filteredSpecialties.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Stethoscope className="h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune spécialité trouvée</h3>
              <p className="text-gray-500 text-center">
                {searchTerm ? "Aucune spécialité ne correspond à votre recherche." : "Commencez par créer votre première spécialité."}
              </p>
        </CardContent>
      </Card>
        ) : (
          filteredSpecialties.map((specialty: Specialty) => (
            <Card key={specialty.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="p-2 bg-gray-100 rounded-lg flex-shrink-0">
                      {getSpecialtyIcon(specialty.nom)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{specialty.nom}</h3>
                      {specialty.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{specialty.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <Badge variant="secondary" className="flex items-center gap-1 text-xs">
                          <Users className="h-3 w-3" />
                          <span className="hidden sm:inline">{specialty.stats.totalMedecins} médecin(s)</span>
                          <span className="sm:hidden">{specialty.stats.totalMedecins} méd</span>
                        </Badge>
                      </div>
                  </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button 
                      variant="outline"
                    size="sm"
                    onClick={() => handleEditSpecialty(specialty)}
                    className="text-xs sm:text-sm"
                  >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">Modifier</span>
                      <span className="sm:hidden">Mod</span>
                  </Button>
                  <Button 
                      variant="outline"
                    size="sm" 
                    onClick={() => handleDeleteSpecialty(specialty)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                  >
                      <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">Supprimer</span>
                      <span className="sm:hidden">Supp</span>
                  </Button>
                  </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {/* New Specialty Modal */}
      <NewSpecialtyModal
        open={newSpecialtyModalOpen}
        onOpenChange={setNewSpecialtyModalOpen}
        onCreate={handleCreateSpecialty}
        loading={createSpecialtyMutation.isPending}
      />

      {/* Edit Specialty Modal */}
      {specialtyToEdit && (
        <EditSpecialtyModal
          open={editSpecialtyModalOpen}
          onOpenChange={setEditSpecialtyModalOpen}
          specialty={specialtyToEdit}
          onSave={handleSaveSpecialty}
          loading={updateSpecialtyMutation.isPending}
        />
      )}

      {/* Delete Specialty Modal */}
      {specialtyToDelete && (
        <DeleteSpecialtyModal
          open={deleteSpecialtyModalOpen}
          onOpenChange={setDeleteSpecialtyModalOpen}
          specialty={specialtyToDelete}
          onConfirm={handleConfirmDelete}
          loading={deleteSpecialtyMutation.isPending}
        />
      )}
    </div>
  );
}