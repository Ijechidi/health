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
import { AlertTriangle, Building2 } from "lucide-react";

interface Hospital {
  id: string;
  nom: string;
  adresse: string;
  description?: string;
  contact: string;
  localisation?: string;
}

interface DeleteHospitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hospital: Hospital | null;
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteHospitalModal({
  open,
  onOpenChange,
  hospital,
  onConfirm,
  loading = false,
}: DeleteHospitalModalProps) {
  if (!hospital) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-[500px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Supprimer l'hôpital
          </SheetTitle>
          <SheetDescription>
            Cette action est irréversible. L'hôpital sera définitivement supprimé.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          {/* Informations sur l'hôpital */}
          <div className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">{hospital.nom}</h3>
                <p className="text-sm text-gray-600">{hospital.adresse}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700">Contact:</span>
                <span className="text-gray-600">{hospital.contact}</span>
              </div>

              {hospital.localisation && (
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-700">Localisation:</span>
                  <span className="text-gray-600">{hospital.localisation}</span>
                </div>
              )}

              {hospital.description && (
                <div className="flex items-start gap-2">
                  <span className="font-medium text-gray-700">Description:</span>
                  <span className="text-gray-600">{hospital.description}</span>
                </div>
              )}
            </div>
          </div>

          {/* Avertissement */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-red-800">
                <p className="font-medium mb-1">Attention !</p>
                <p>
                  La suppression de cet hôpital supprimera également toutes les assignations 
                  des utilisateurs à cet hôpital. Cette action ne peut pas être annulée.
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
            {loading ? "Suppression..." : "Supprimer l'hôpital"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

