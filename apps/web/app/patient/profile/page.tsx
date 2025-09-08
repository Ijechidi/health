import React from "react";
import { Card } from "@repo/ui/components/card";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";

export default function PatientProfilePage() {
  return (
    <div className="space-y-4">
      <Card className="p-4">
        <h1 className="text-xl font-semibold mb-2">Mon profil</h1>
        <p className="text-sm text-foreground/60 mb-4">Mettez à jour vos informations personnelles.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-foreground/60">Nom</label>
            <Input defaultValue="Doe" />
          </div>
          <div>
            <label className="text-xs text-foreground/60">Prénom</label>
            <Input defaultValue="Koffi" />
          </div>
          <div>
            <label className="text-xs text-foreground/60">Email</label>
            <Input defaultValue="koffi.doe@exemple.com" />
          </div>
          <div>
            <label className="text-xs text-foreground/60">Téléphone</label>
            <Input defaultValue="+228 90 00 00 00" />
          </div>
          <div>
            <label className="text-xs text-foreground/60">Date de naissance</label>
            <Input type="date" defaultValue="1995-06-15" />
          </div>
          <div>
            <label className="text-xs text-foreground/60">Sexe</label>
            <Select defaultValue="Femme">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Homme">Homme</SelectItem>
                <SelectItem value="Femme">Femme</SelectItem>
                <SelectItem value="Autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-foreground/60">Groupe sanguin</label>
            <Select defaultValue="O_POSITIF">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir" />
              </SelectTrigger>
              <SelectContent>
                {['A_POSITIF','A_NEGATIF','B_POSITIF','B_NEGATIF','AB_POSITIF','AB_NEGATIF','O_POSITIF','O_NEGATIF','INCONNU'].map(v => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-xs text-foreground/60">Poids (kg)</label>
            <Input type="number" step="0.1" defaultValue="65" />
          </div>
          <div>
            <label className="text-xs text-foreground/60">Taille (m)</label>
            <Input type="number" step="0.01" defaultValue="1.70" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-foreground/60">Adresse</label>
            <Input defaultValue="Lomé, Adidogomé" />
          </div>
        </div>
        <Button className="mt-4">Enregistrer</Button>
      </Card>

    
    </div>
  );
}


