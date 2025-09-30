"use client";

import React from "react";
import { Button } from "@repo/ui/components/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { 
  X, 
  Building2, 
  AlertTriangle,
  Trash2
} from "lucide-react";

interface DeleteHospitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hospital: {
    id: string;
    nom: string;
    adresse: string;
    stats: {
      totalUsers: number;
      totalMedecins: number;
      totalPatients: number;
      totalAdmins: number;
    };
  };
  onConfirm: () => void;
  loading?: boolean;
}

export function DeleteHospitalModal({ 
  open, 
  onOpenChange, 
  hospital, 
  onConfirm, 
  loading = false 
}: DeleteHospitalModalProps) {
  const hasUsers = hospital.stats.totalUsers > 0;

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
                <h2 className="text-xl font-semibold text-gray-900">Supprimer l'hôpital</h2>
                <p className="text-sm text-gray-500">Cette action est irréversible</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6">
            {hasUsers ? (
              // Si des utilisateurs sont liés
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-800">Impossible de supprimer</p>
                    <p className="text-sm text-red-600">
                      Cet hôpital a {hospital.stats.totalUsers} utilisateur(s) actif(s)
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Utilisateurs liés :</strong>
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{hospital.stats.totalUsers} utilisateurs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{hospital.stats.totalMedecins} médecins</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{hospital.stats.totalPatients} patients</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span>{hospital.stats.totalAdmins} admins</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600">
                  Vous devez d'abord réassigner ou supprimer tous les utilisateurs liés à cet hôpital.
                </p>
              </div>
            ) : (
              // Si aucun utilisateur n'est lié
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-yellow-800">Confirmer la suppression</p>
                    <p className="text-sm text-yellow-600">
                      Cette action supprimera définitivement l'hôpital
                    </p>
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Building2 className="h-4 w-4" />
                      {hospital.nom}
                    </CardTitle>
                    <CardDescription>{hospital.adresse}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Aucun utilisateur n'est lié à cet hôpital. La suppression est autorisée.
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
            {!hasUsers && (
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