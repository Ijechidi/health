"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import {
  X,
  Stethoscope,
  Save
} from "lucide-react";

interface NewSpecialtyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: { nom: string; description?: string }) => void;
  loading?: boolean;
}

export function NewSpecialtyModal({ open, onOpenChange, onCreate, loading = false }: NewSpecialtyModalProps) {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");

  const canSave = nom.trim() !== "";

  const handleCreate = () => {
    onCreate({
      nom: nom.trim(),
      description: description.trim() || undefined
    });
    // Reset form
    setNom("");
    setDescription("");
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Stethoscope className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Nouvelle spécialité</h2>
                <p className="text-sm text-gray-500">Ajouter une nouvelle spécialité médicale</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Informations principales */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  Informations de la spécialité
                </CardTitle>
                <CardDescription>Nom et description de la spécialité médicale</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nom de la spécialité *</label>
                  <Input
                    placeholder="Ex: Cardiologie, Pédiatrie, Gynécologie..."
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="min-h-[100px] w-full border rounded-md p-2 border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                    placeholder="Description de la spécialité, domaines d'expertise..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer */}
          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button 
              className="bg-black hover:bg-neutral-800"
              disabled={!canSave || loading}
              onClick={handleCreate}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Création..." : "Créer la spécialité"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}