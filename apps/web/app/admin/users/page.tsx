"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Badge } from "@repo/ui/components/badge";
import { useToast } from "@repo/ui/hooks/use-toast";
import { UserDetailsModal } from "@/components/admin/UserDetailsModal";
import { ExportModal } from "@/components/admin/ExportModal";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal,
  UserCheck,
  UserX,
  Shield,
  Stethoscope,
  Heart
} from "lucide-react";
import { useUsers, useUserStats } from "@/hooks/useAdminData";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

interface User {
  id: string;
  nom: string;
  prenom?: string | null;
  email: string;
  telephone?: string | null;
  role: 'admin' | 'medecin' | 'patient';
  status: 'actif' | 'inactif';
  dateCreation: string;
  specialite?: string;
  hopital?: string;
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);

  // Hooks pour les données
  const { data: users = [], isLoading: loadingUsers, error: usersError } = useUsers();
  const { data: userStats, isLoading: loadingStats } = useUserStats();
  const { toast } = useToast();

  // État de chargement optimisé
  const isLoading = loadingUsers || loadingStats;

  // Gestion des erreurs
  if (usersError) {
    toast.error("Erreur lors du chargement des utilisateurs");
  }

  // Fonction pour activer un utilisateur
  const handleActivateUser = async (user: User) => {
    try {
      const response = await fetch(`/api/admin/users/${user.id}/activate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Mise à jour optimiste - pas de rechargement
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error activating user:', error);
      toast.error("Erreur lors de l'activation de l'utilisateur");
    }
  };

  // Fonction pour désactiver un utilisateur
  const handleDeactivateUser = async (user: User) => {
    try {
      const response = await fetch(`/api/admin/users/${user.id}/deactivate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Mise à jour optimiste - pas de rechargement
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error deactivating user:', error);
      toast.error("Erreur lors de la désactivation de l'utilisateur");
    }
  };

  // Fonction pour synchroniser les utilisateurs
  const handleSyncUsers = async () => {
    try {
      toast.info("Synchronisation en cours...");
      
      const response = await fetch('/api/sync-users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();

      if (result.success) {
        toast.success(result.message);
        // Recharger la page pour voir les nouveaux utilisateurs
        window.location.reload();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error('Error syncing users:', error);
      toast.error("Erreur lors de la synchronisation");
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      // Pour l'instant, on considère tous les utilisateurs comme actifs
      const matchesStatus = statusFilter === 'all' || statusFilter === 'actif';
      
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, roleFilter, statusFilter]);

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'medecin': return <Stethoscope className="h-4 w-4" />;
      case 'patient': return <Heart className="h-4 w-4" />;
      default: return <Users className="h-4 w-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-gray-900 text-white border-gray-700';
      case 'medecin': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'patient': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'medecin': return 'Médecin';
      case 'patient': return 'Patient';
      default: return 'Utilisateur';
    }
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 lg:p-8 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Modérer et gérer les comptes utilisateurs</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          {isLoading && (
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              Chargement...
            </div>
          )}
          <Button 
            onClick={handleSyncUsers}
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base"
          >
            <Users className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Synchroniser</span>
            <span className="sm:hidden">Sync</span>
          </Button>
          <Button 
            variant="outline"
            onClick={() => setExportModalOpen(true)}
            className="text-sm sm:text-base"
          >
            <Users className="h-4 w-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Exporter la liste</span>
            <span className="sm:hidden">Export</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Recherche</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Nom, email..."
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
            {/* <div className="space-y-2">
              <label className="text-sm font-medium">Actions</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Réinitialiser
                </Button>
              </div>
            </div> */}
          </div>
        </CardContent>
      </Card>



      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Liste des utilisateurs ({filteredUsers.length})
          </CardTitle>
          <CardDescription>
            Modérer les comptes et gérer les statuts des utilisateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <SkeletonLoader count={3} />
          ) : (
            <div className="space-y-4">
              {filteredUsers.map((user) => (
              <div key={user.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-2">
                      <h3 className="font-medium text-gray-900 truncate">
                        {user.prenom} {user.nom}
                      </h3>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        <Badge className={`${getRoleColor(user.role)} text-xs`}>
                          {getRoleIcon(user.role)}
                          <span className="ml-1 hidden sm:inline">{getRoleText(user.role)}</span>
                          <span className="ml-1 sm:hidden">{getRoleText(user.role).charAt(0)}</span>
                        </Badge>
                        <Badge className={`${user.status === 'actif' ? 'bg-green-100 text-green-800 border-green-300' : 'bg-red-100 text-red-800 border-red-300'} text-xs`}>
                          {user.status === 'actif' ? 'Actif' : 'Inactif'}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1 space-y-1">
                      <p className="truncate">{user.email}</p>
                      {user.telephone && <p className="text-xs">Téléphone: {user.telephone}</p>}
                      {user.specialite && <p className="text-xs">Spécialité: {user.specialite.nom}</p>}
                      {user.hopital && <p className="text-xs">Hôpital: {user.hopital.nom}</p>}
                      <p className="text-xs text-gray-400">Créé le {new Date(user.dateCreation).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                    {user.status === 'actif' ? (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs sm:text-sm"
                        title="Désactiver le compte"
                        onClick={() => handleDeactivateUser(user)}
                      >
                        <UserX className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="ml-1 hidden sm:inline">Désactiver</span>
                        <span className="ml-1 sm:hidden">Désac</span>
                      </Button>
                    ) : (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 text-xs sm:text-sm"
                        title="Activer le compte"
                        onClick={() => handleActivateUser(user)}
                      >
                        <UserCheck className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="ml-1 hidden sm:inline">Activer</span>
                        <span className="ml-1 sm:hidden">Act</span>
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs sm:text-sm"
                      title="Voir les informations détaillées"
                      onClick={() => {
                        setSelectedUser(user);
                        setModalOpen(true);
                      }}
                    >
                      <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          user={selectedUser}
        />
      )}

      {/* Export Modal */}
      <ExportModal
        open={exportModalOpen}
        onOpenChange={setExportModalOpen}
        users={users}
        filteredUsers={filteredUsers}
      />
    </div>
  );
}
