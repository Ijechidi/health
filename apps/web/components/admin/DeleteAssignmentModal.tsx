"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@repo/ui/components/sheet";
import { Button } from "@repo/ui/components/button";
import { AlertTriangle, Shield, Stethoscope, Heart, Building2 } from "lucide-react";

interface Assignment {
  id: string;
  utilisateurId: string;
  hopitalId: string;
  role: 'admin' | 'medecin' | 'patient';
  dateDebut: string;
  dateFin?: string;
  utilisateur: {
    nom: string;
    prenom?: string;
    email: string;
  };
  hopital: {
    nom: string;
    adresse: string;
  };
  status: 'actif' | 'inactif';
}

interface DeleteAssignmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment: Assignment | null;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteAssignmentModal({
  open,
  onOpenChange,
  assignment,
  onConfirm,
  loading = false,
}: DeleteAssignmentModalProps) {
  if (!assignment) return null;

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />;
      case 'medecin': return <Stethoscope className="h-4 w-4" />;
      case 'patient': return <Heart className="h-4 w-4" />;
      default: return null;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Administrateur';
      case 'medecin': return 'Médecin';
      case 'patient': return 'Patient';
      default: return role;
    }
  };

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer l'assignation
          </SheetTitle>
          <SheetDescription>
            Cette action est irréversible. L'assignation sera définitivement supprimée.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {/* Informations sur l'assignation */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                {getRoleIcon(assignment.role)}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {assignment.utilisateur.prenom} {assignment.utilisateur.nom}
                </h3>
                <p className="text-sm text-gray-600">{assignment.utilisateur.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Rôle:</span>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">
                  {getRoleIcon(assignment.role)}
                  {getRoleLabel(assignment.role)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="font-medium text-gray-700">Hôpital:</span>
                <span className="text-gray-600">{assignment.hopital.nom}</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Période:</span>
                <span className="text-gray-600">
                  {assignment.dateDebut}
                  {assignment.dateFin && ` - ${assignment.dateFin}`}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Statut:</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  assignment.status === 'actif' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {assignment.status === 'actif' ? 'Actif' : 'Inactif'}
                </span>
              </div>
            </div>
          </div>

          {/* Avertissement */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Attention !</p>
                <p>
                  La suppression de cette assignation retirera immédiatement l'accès de l'utilisateur 
                  à l'hôpital selon son rôle. Cette action ne peut pas être annulée.
                </p>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Suppression..." : "Supprimer l'assignation"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
