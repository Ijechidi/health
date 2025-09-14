"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { 
  X, 
  Stethoscope, 
  AlertTriangle,
  Users
} from "lucide-react";

interface DeleteSpecialtyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specialty: {
    id: string;
    nom: string;
    description?: string;
  };
  assignedUsers: number;
  onConfirm: () => void;
}

export function DeleteSpecialtyModal({ open, onOpenChange, specialty, assignedUsers, onConfirm }: DeleteSpecialtyModalProps) {
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
                  <Stethoscope className="h-6 w-6 text-red-600" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                )}
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {canDelete ? 'Supprimer la spécialité' : 'Suppression impossible'}
                </h2>
                <p className="text-sm text-gray-500">{specialty.nom}</p>
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
                  Êtes-vous sûr de vouloir supprimer cette spécialité ?
                </p>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-gray-900">{specialty.nom}</p>
                  {specialty.description && (
                    <p className="text-sm text-gray-600">{specialty.description}</p>
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
                  Cette spécialité ne peut pas être supprimée car <strong>{assignedUsers} médecin(s)</strong> l'utilisent.
                </p>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-orange-900">{specialty.nom}</p>
                  {specialty.description && (
                    <p className="text-sm text-orange-700">{specialty.description}</p>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Pour supprimer cette spécialité, vous devez d'abord réassigner ou désactiver tous les médecins qui l'utilisent.
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


