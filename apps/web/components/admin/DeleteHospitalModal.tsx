"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { 
  X, 
  Building2, 
  AlertTriangle,
  Users,
  MapPin,
  Phone
} from "lucide-react";

interface DeleteHospitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hospital: {
    id: string;
    nom: string;
    adresse: string;
    localisation?: string;
  };
  assignedUsers: number;
  onConfirm: () => void;
}

export function DeleteHospitalModal({ open, onOpenChange, hospital, assignedUsers, onConfirm }: DeleteHospitalModalProps) {
  if (!open) return null;

  const canDelete = assignedUsers === 0;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${canDelete ? 'bg-red-100' : 'bg-orange-100'}`}>
                {canDelete ? (
                  <Building2 className="h-6 w-6 text-red-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {canDelete ? 'Supprimer l\'hôpital' : 'Suppression impossible'}
                </h2>
                <p className="text-sm text-gray-500">{hospital.nom}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {canDelete ? (
              <div className="space-y-3">
                <p className="text-gray-700">
                  Êtes-vous sûr de vouloir supprimer cet hôpital ?
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{hospital.nom}</p>
                  <p className="text-sm text-gray-600">{hospital.adresse}</p>
                  {hospital.localisation && (
                    <p className="text-sm text-gray-600">{hospital.localisation}</p>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Cette action est irréversible.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-orange-600">
                  <AlertTriangle className="h-5 w-5" />
                  <p className="font-medium">Suppression bloquée</p>
                </div>
                <p className="text-gray-700">
                  Cet hôpital ne peut pas être supprimé car <strong>{assignedUsers} utilisateur(s)</strong> y sont assignés.
                </p>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">{hospital.nom}</p>
                  <p className="text-sm text-orange-700">{hospital.adresse}</p>
                  {hospital.localisation && (
                    <p className="text-sm text-orange-700">{hospital.localisation}</p>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Pour supprimer cet hôpital, vous devez d'abord réassigner ou désactiver tous les utilisateurs qui y sont liés.
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            {canDelete && (
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
              >
                Supprimer
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
