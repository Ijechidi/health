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
  Plus
} from "lucide-react";

interface NewHospitalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (hospital: {
    nom: string;
    adresse: string;
    description?: string;
    contact: string;
    localisation?: string;
  }) => void;
  loading?: boolean;
}

export function NewHospitalModal({ open, onOpenChange, onCreate, loading = false }: NewHospitalModalProps) {
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [localisation, setLocalisation] = useState("");

  const canCreate = nom && adresse && contact;

  const handleCreate = () => {
    onCreate({
      nom,
      adresse,
      description: description || undefined,
      contact,
      localisation: localisation || undefined
    });
    
    // Reset form
    setNom("");
    setAdresse("");
    setDescription("");
    setContact("");
    setLocalisation("");
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
                <h2 className="text-xl font-semibold text-gray-900">Nouvel hôpital</h2>
                <p className="text-sm text-gray-500">Ajouter un établissement de santé</p>
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

            {/* Aperçu */}
            <Card>
              <CardHeader>
                <CardTitle>Aperçu</CardTitle>
                <CardDescription>Vérifiez les informations avant création</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <p className="font-medium text-gray-900">{nom || "Nom de l'hôpital"}</p>
                  <p className="text-sm text-gray-600">{adresse || "Adresse"}</p>
                  {localisation && <p className="text-sm text-gray-600">{localisation}</p>}
                  <p className="text-sm text-gray-600">{contact || "Contact"}</p>
                  {description && <p className="text-sm text-gray-600">{description}</p>}
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
              disabled={!canCreate || loading}
              onClick={handleCreate}
            >
              {loading ? "Création..." : "Créer l'hôpital"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
