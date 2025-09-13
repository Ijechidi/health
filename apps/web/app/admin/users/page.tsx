"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Badge } from "@repo/ui/components/badge";
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

interface User {
  id: string;
  nom: string;
  prenom?: string;
  email: string;
  telephone?: string;
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

  // Mock data selon le schéma
  const users = useMemo(() => ([
    {
      id: 'u1',
      nom: 'Ndiaye',
      prenom: 'Ahmadou',
      email: 'ahmadou.ndiaye@email.com',
      telephone: '+221 77 123 45 67',
      role: 'medecin' as const,
      status: 'actif' as const,
      dateCreation: '2024-01-15',
      specialite: 'Cardiologie',
      hopital: 'Hôpital Principal'
    },
    {
      id: 'u2',
      nom: 'Diop',
      prenom: 'Fatou',
      email: 'fatou.diop@email.com',
      telephone: '+221 77 234 56 78',
      role: 'medecin' as const,
      status: 'actif' as const,
      dateCreation: '2024-01-20',
      specialite: 'Dermatologie',
      hopital: 'Hôpital Principal'
    },
    {
      id: 'u3',
      nom: 'Dupont',
      prenom: 'Marie',
      email: 'marie.dupont@email.com',
      telephone: '+221 77 345 67 89',
      role: 'patient' as const,
      status: 'actif' as const,
      dateCreation: '2024-02-01',
      specialite: undefined,
      hopital: undefined
    },
    {
      id: 'u4',
      nom: 'Admin',
      prenom: 'Super',
      email: 'admin@system.com',
      telephone: '+221 77 000 00 00',
      role: 'admin' as const,
      status: 'actif' as const,
      dateCreation: '2024-01-01',
      specialite: undefined,
      hopital: undefined
    }
  ]), []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = 
        user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.prenom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      
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
    // Thème noir & blanc: badges en nuances de gris
    return 'bg-gray-200 text-gray-800 border-gray-300';
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des utilisateurs</h1>
          <p className="text-gray-600 mt-2">Modérer et gérer les comptes utilisateurs</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={() => setExportModalOpen(true)}
          >
            <Users className="h-4 w-4 mr-2" />
            Exporter la liste
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {getRoleIcon(user.role)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">
                        {user.prenom} {user.nom}
                      </h3>
                      <Badge className={getRoleColor(user.role)}>
                        {user.role === 'admin' ? 'Admin' : 
                         user.role === 'medecin' ? 'Médecin' : 'Patient'}
                      </Badge>
                      <Badge className={`${user.status === 'actif' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'} border border-gray-300`}>
                        {user.status === 'actif' ? 'Actif' : 'Inactif'}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      <p>{user.email}</p>
                      {user.telephone && <p>{user.telephone}</p>}
                      {user.specialite && <p>Spécialité: {user.specialite}</p>}
                      {user.hopital && <p>Hôpital: {user.hopital}</p>}
                      <p className="text-xs text-gray-400">Créé le {user.dateCreation}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={user.status === 'actif' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                    title={user.status === 'actif' ? 'Désactiver le compte' : 'Activer le compte'}
                  >
                    {user.status === 'actif' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                    <span className="ml-1 text-sm">
                      {user.status === 'actif' ? 'Désactiver' : 'Activer'}
                    </span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    title="Voir les informations détaillées"
                    onClick={() => {
                      setSelectedUser(user);
                      setModalOpen(true);
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
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
