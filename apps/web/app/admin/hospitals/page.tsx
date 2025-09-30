"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Badge } from "@repo/ui/components/badge";
import { useToast } from "@repo/ui/hooks/use-toast";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { 
  Building2, 
  Search, 
  Filter, 
  Plus,
  MapPin,
  Phone,
  Users,
  Stethoscope,
  UserCheck,
  Shield,
  Edit,
  Trash2
} from "lucide-react";
import { useHospitals, useHospitalStats, useCreateHospital, useDeleteHospital, useUpdateHospital } from "@/hooks/useHospitalData";
import { NewHospitalModal } from "@/components/admin/NewHospitalModal";
import { EditHospitalModal } from "@/components/admin/EditHospitalModal";
import { DeleteHospitalModal } from "@/components/admin/DeleteHospitalModal";

interface Hospital {
  id: string;
  nom: string;
  slug: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
  stats: {
    totalUsers: number;
    totalMedecins: number;
    totalPatients: number;
    totalAdmins: number;
  };
}

export default function AdminHospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  const [newHospitalModalOpen, setNewHospitalModalOpen] = useState(false);
  const [editHospitalModalOpen, setEditHospitalModalOpen] = useState(false);
  const [hospitalToEdit, setHospitalToEdit] = useState<Hospital | null>(null);
  const [deleteHospitalModalOpen, setDeleteHospitalModalOpen] = useState(false);
  const [hospitalToDelete, setHospitalToDelete] = useState<Hospital | null>(null);

  // Hooks pour les données
  const { data: hospitals = [], isLoading: loadingHospitals, error: hospitalsError } = useHospitals();
  const { data: hospitalStats, isLoading: loadingStats } = useHospitalStats();
  const { toast } = useToast();

  // Mutations
  const createHospitalMutation = useCreateHospital();
  const updateHospitalMutation = useUpdateHospital();
  const deleteHospitalMutation = useDeleteHospital();

  // État de chargement optimisé
  const isLoading = loadingHospitals || loadingStats;

  // Gestion des erreurs
  if (hospitalsError) {
    toast.error("Erreur lors du chargement des hôpitaux");
  }

  // Filtrage des hôpitaux
  const filteredHospitals = useMemo(() => {
    if (!hospitals) return [];
    
    return hospitals.filter((hospital: Hospital) => {
      const matchesSearch = searchTerm === '' || 
        hospital.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.adresse.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.contact.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesSearch;
    });
  }, [hospitals, searchTerm]);

  // Fonction pour créer un hôpital
  const handleCreateHospital = async (hospitalData: {
    nom: string;
    adresse: string;
    description?: string;
    contact: string;
    localisation?: string;
  }) => {
    try {
      await createHospitalMutation.mutateAsync({
        ...hospitalData,
        slug: hospitalData.nom.toLowerCase().replace(/\s+/g, '-'),
      });
      toast.success("Hôpital créé avec succès");
      setNewHospitalModalOpen(false);
    } catch (error) {
      toast.error("Erreur lors de la création de l'hôpital");
    }
  };

  // Fonction pour ouvrir le modal de suppression
  const handleDeleteHospital = (hospital: Hospital) => {
    setHospitalToDelete(hospital);
    setDeleteHospitalModalOpen(true);
  };

  // Fonction pour confirmer la suppression
  const handleConfirmDelete = async () => {
    if (!hospitalToDelete) return;

    try {
      await deleteHospitalMutation.mutateAsync(hospitalToDelete.id);
      toast.success("Hôpital supprimé avec succès");
      setDeleteHospitalModalOpen(false);
      setHospitalToDelete(null);
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'hôpital");
    }
  };

  // Fonction pour éditer un hôpital
  const handleEditHospital = (hospital: Hospital) => {
    setHospitalToEdit(hospital);
    setEditHospitalModalOpen(true);
  };

  // Fonction pour sauvegarder les modifications
  const handleSaveHospital = async (hospitalData: Hospital) => {
    try {
      await updateHospitalMutation.mutateAsync({
        id: hospitalData.id,
        data: {
          nom: hospitalData.nom,
          adresse: hospitalData.adresse,
          description: hospitalData.description,
          contact: hospitalData.contact,
          localisation: hospitalData.localisation
        }
      });
      toast.success("Hôpital modifié avec succès");
      setEditHospitalModalOpen(false);
      setHospitalToEdit(null);
    } catch (error) {
      toast.error("Erreur lors de la modification de l'hôpital");
    }
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des hôpitaux</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Gérer les établissements de santé</p>
        </div>
        <div className="flex items-center gap-3">
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              Chargement...
            </div>
          )}
        <Button 
          onClick={() => setNewHospitalModalOpen(true)}
            className="bg-black hover:bg-neutral-800 text-white text-sm sm:text-base"
        >
          <Plus className="h-4 w-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Nouvel hôpital</span>
          <span className="sm:hidden">Nouveau</span>
        </Button>
      </div>
      </div>


      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
          <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Rechercher un hôpital..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
            />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hospitals List */}
      <Card>
            <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Liste des hôpitaux ({filteredHospitals.length})
          </CardTitle>
          <CardDescription>
            Gérer les établissements de santé et leurs utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonLoader count={3} />
          ) : (
            <div className="space-y-4">
        {filteredHospitals.map((hospital: Hospital) => (
                <div key={hospital.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                        <h3 className="font-medium text-gray-900 truncate">{hospital.nom}</h3>
                        <Badge variant="outline" className="text-xs w-fit">
                          {hospital.slug}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{hospital.adresse}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{hospital.contact}</span>
                        </div>
                        {hospital.localisation && (
                          <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 flex-shrink-0" />
                            <span className="truncate">{hospital.localisation}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span className="hidden sm:inline">{hospital.stats.totalUsers} utilisateurs</span>
                          <span className="sm:hidden">{hospital.stats.totalUsers} users</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Stethoscope className="h-3 w-3" />
                          <span className="hidden sm:inline">{hospital.stats.totalMedecins} médecins</span>
                          <span className="sm:hidden">{hospital.stats.totalMedecins} méd</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          <span className="hidden sm:inline">{hospital.stats.totalPatients} patients</span>
                          <span className="sm:hidden">{hospital.stats.totalPatients} pat</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <Button 
                      variant="outline" 
                    size="sm"
                    onClick={() => handleEditHospital(hospital)}
                    className="text-xs sm:text-sm"
                  >
                      <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      <span className="hidden sm:inline">Modifier</span>
                      <span className="sm:hidden">Mod</span>
                  </Button>
                  <Button 
                      variant="outline" 
                    size="sm" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                      title="Supprimer l'hôpital"
                    onClick={() => handleDeleteHospital(hospital)}
                  >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Supprimer
                  </Button>
                  </div>
                </div>
              ))}
              </div>
          )}
            </CardContent>
          </Card>

      {/* New Hospital Modal */}
      <NewHospitalModal
        open={newHospitalModalOpen}
        onOpenChange={setNewHospitalModalOpen}
        onCreate={handleCreateHospital}
        loading={createHospitalMutation.isPending}
      />

      {/* Edit Hospital Modal */}
      {hospitalToEdit && (
        <EditHospitalModal
          open={editHospitalModalOpen}
          onOpenChange={setEditHospitalModalOpen}
          hospital={hospitalToEdit}
          onSave={handleSaveHospital}
          loading={updateHospitalMutation.isPending}
        />
      )}

      {/* Delete Hospital Modal */}
      {hospitalToDelete && (
        <DeleteHospitalModal
          open={deleteHospitalModalOpen}
          onOpenChange={setDeleteHospitalModalOpen}
          hospital={hospitalToDelete}
          onConfirm={handleConfirmDelete}
          loading={deleteHospitalMutation.isPending}
        />
      )}
    </div>
  );
}