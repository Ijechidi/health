"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { 
  X, 
  Stethoscope, 
  AlertTriangle,
  Trash2,
  Users
} from "lucide-react";

interface DeleteSpecialtyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  specialty: {
    id: string;
    nom: string;
    description?: string;
    stats: {
      totalMedecins: number;
    };
  };
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteSpecialtyModal({ 
  open, 
  onOpenChange, 
  specialty, 
  onConfirm, 
  loading = false 
}: DeleteSpecialtyModalProps) {
  const hasMedecins = specialty.stats.totalMedecins > 0;

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-md">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Supprimer la spécialité</h2>
                <p className="text-sm text-gray-500">Cette action est irréversible</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {hasMedecins ? (
              // Si des médecins sont liés
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800">Impossible de supprimer</p>
                    <p className="text-sm text-red-600">
                      Cette spécialité a {specialty.stats.totalMedecins} médecin(s) associé(s)
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Médecins associés :</strong>
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      <span>{specialty.stats.totalMedecins} médecin(s) dans cette spécialité</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Vous devez d'abord réassigner ou supprimer tous les médecins de cette spécialité.
                </p>
              </div>
            ) : (
              // Si aucun médecin n'est lié
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-800">Confirmer la suppression</p>
                    <p className="text-sm text-yellow-600">
                      Cette action supprimera définitivement la spécialité
                    </p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Stethoscope className="h-4 w-4" />
                      {specialty.nom}
                    </CardTitle>
                    {specialty.description && (
                      <CardDescription>{specialty.description}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Aucun médecin n'est associé à cette spécialité. La suppression est autorisée.
                    </p>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            {!hasMedecins && (
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white"
                disabled={loading}
                onClick={onConfirm}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {loading ? "Suppression..." : "Supprimer définitivement"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}