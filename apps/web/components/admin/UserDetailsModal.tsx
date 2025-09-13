"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Stethoscope, 
  Building2,
  Shield,
  Heart,
  Activity,
  Clock
} from "lucide-react";

interface UserDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: {
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
    dateNaissance?: string;
    adresse?: string;
    groupeSanguin?: string;
    poids?: number;
    taille?: number;
    sexe?: string;
  };
}

export function UserDetailsModal({ open, onOpenChange, user }: UserDetailsModalProps) {
  if (!open) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-5 w-5" />;
      case 'medecin': return <Stethoscope className="h-5 w-5" />;
      case 'patient': return <Heart className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-gray-200 text-gray-800 border-gray-300';
      case 'medecin': return 'bg-gray-200 text-gray-800 border-gray-300';
      case 'patient': return 'bg-gray-200 text-gray-800 border-gray-300';
      default: return 'bg-gray-200 text-gray-800 border-gray-300';
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                {getRoleIcon(user.role)}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {user.prenom} {user.nom}
                </h2>
                <p className="text-sm text-gray-500">Informations détaillées</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Status and Role */}
            <div className="flex items-center gap-4">
              <Badge className={getRoleColor(user.role)}>
                {user.role === 'admin' ? 'Administrateur' : 
                 user.role === 'medecin' ? 'Médecin' : 'Patient'}
              </Badge>
              <Badge className={user.status === 'actif' ? 'bg-gray-900 text-white' : 'bg-gray-300 text-gray-800'}>
                {user.status === 'actif' ? 'Actif' : 'Inactif'}
              </Badge>
            </div>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Informations personnelles
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Email</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    {user.telephone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Téléphone</p>
                          <p className="text-sm text-gray-600">{user.telephone}</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Date de création</p>
                        <p className="text-sm text-gray-600">{user.dateCreation}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {user.dateNaissance && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Date de naissance</p>
                          <p className="text-sm text-gray-600">{user.dateNaissance}</p>
                        </div>
                      </div>
                    )}
                    {user.sexe && (
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Sexe</p>
                          <p className="text-sm text-gray-600">{user.sexe}</p>
                        </div>
                      </div>
                    )}
                    {user.adresse && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <div>
                          <p className="text-sm font-medium">Adresse</p>
                          <p className="text-sm text-gray-600">{user.adresse}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Information (for patients) */}
            {user.role === 'patient' && (user.groupeSanguin || user.poids || user.taille) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Informations médicales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {user.groupeSanguin && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Groupe sanguin</p>
                        <p className="text-lg font-bold text-gray-900">{user.groupeSanguin}</p>
                      </div>
                    )}
                    {user.poids && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Poids</p>
                        <p className="text-lg font-bold text-gray-900">{user.poids} kg</p>
                      </div>
                    )}
                    {user.taille && (
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm font-medium text-gray-600">Taille</p>
                        <p className="text-lg font-bold text-gray-900">{user.taille} cm</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Professional Information (for doctors) */}
            {user.role === 'medecin' && (user.specialite || user.hopital) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Stethoscope className="h-5 w-5" />
                    Informations professionnelles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user.specialite && (
                    <div className="flex items-center gap-2">
                      <Stethoscope className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Spécialité</p>
                        <p className="text-sm text-gray-600">{user.specialite}</p>
                      </div>
                    </div>
                  )}
                  {user.hopital && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium">Hôpital principal</p>
                        <p className="text-sm text-gray-600">{user.hopital}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Activity Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Résumé d'activité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {/* <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Dernière connexion</p>
                    <p className="text-sm font-bold text-gray-900">Il y a 2h</p>
                  </div> */}
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Rendez-vous</p>
                    <p className="text-sm font-bold text-gray-900">12</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Documents</p>
                    <p className="text-sm font-bold text-gray-900">8</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-600">Assignations</p>
                    <p className="text-sm font-bold text-gray-900">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Fermer
            </Button>
           
          </div>
        </div>
      </div>
    </>
  );
}
