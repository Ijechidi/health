"use client";

import React, { useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { 
  X, 
  Building2, 
  MapPin,
  Phone,
  Save
} from "lucide-react";

interface EditHospitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hospital: {
    id: string;
    nom: string;
    adresse: string;
    description?: string;
    contact: string;
    localisation?: string;
  };
  onSave: (hospital: {
    id: string;
    nom: string;
    adresse: string;
    description?: string;
    contact: string;
    localisation?: string;
  }) => void;
  loading?: boolean;
}

export function EditHospitalModal({ open, onOpenChange, hospital, onSave, loading = false }: EditHospitalModalProps) {
  const [nom, setNom] = useState(hospital.nom);
  const [adresse, setAdresse] = useState(hospital.adresse);
  const [description, setDescription] = useState(hospital.description || "");
  const [contact, setContact] = useState(hospital.contact);
  const [localisation, setLocalisation] = useState(hospital.localisation || "");

  const canSave = nom && adresse && contact;

  const handleSave = () => {
    onSave({
      ...hospital,
      nom,
      adresse,
      description: description || undefined,
      contact,
      localisation: localisation || undefined
    });
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
                <Building2 className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Modifier l'hôpital</h2>
                <p className="text-sm text-gray-500">Éditer les informations de l'établissement</p>
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
                  <Building2 className="h-5 w-5" />
                  Informations principales
                </CardTitle>
                <CardDescription>Nom et localisation de l'hôpital</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Nom de l'hôpital *</label>
                  <Input
                    placeholder="Ex: Centre Hospitalier Universitaire de Lomé"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Adresse *</label>
                  <Input
                    placeholder="Ex: Boulevard du 13 Janvier, Lomé"
                    value={adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                    className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Localisation</label>
                  <Input
                    placeholder="Ex: Lomé, Togo"
                    value={localisation}
                    onChange={(e) => setLocalisation(e.target.value)}
                    className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Contact et description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Contact et description
                </CardTitle>
                <CardDescription>Informations de contact et description</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Contact *</label>
                  <Input
                    placeholder="Ex: +228 22 21 20 19"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    className="min-h-[100px] w-full border rounded-md p-2 border-gray-300 focus-visible:ring-gray-600 focus-visible:border-gray-600"
                    placeholder="Description de l'hôpital, spécialités, services..."
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
              onClick={handleSave}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

