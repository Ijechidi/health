"use client";

import React, { useRef, useState } from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";

export default function PatientDocumentsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [titre, setTitre] = useState("");
  const [hopital, setHopital] = useState("");
  const [dateDoc, setDateDoc] = useState<string>(new Date().toISOString().slice(0,10));

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    if (!selected) return;
    if (selected.type !== "application/pdf" && !selected.name.toLowerCase().endsWith(".pdf")) {
      alert("Veuillez sélectionner un fichier PDF.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }
    setFile(selected);
    if (!titre) {
      const base = selected.name.replace(/\.[^.]+$/, "");
      setTitre(base);
    }
  };

  const handleConfirmUpload = async () => {
    if (!file) {
      alert("Aucun fichier sélectionné.");
      return;
    }
    if (!titre.trim()) {
      alert("Veuillez renseigner le nom du document.");
      return;
    }
    try {
      setUploading(true);
      // TODO: appeler l'API d'upload réelle ici
      // const formData = new FormData();
      // formData.append("document", file);
      // formData.append("titre", titre);
      // formData.append("hopital", hopital);
      // formData.append("date", dateDoc);
      // await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000"}/documents/upload`, { method: "POST", body: formData });
      console.log("Upload document (simulation)", {
        name: file.name,
        size: file.size,
        type: file.type,
        meta: { titre, hopital, date: dateDoc },
      });
      setFile(null);
      setTitre("");
      setHopital("");
      setDateDoc(new Date().toISOString().slice(0,10));
      if (fileInputRef.current) fileInputRef.current.value = "";
      alert("Document importé (simulation). Intégrer l'API pour finaliser.");
    } catch (err) {
      console.error(err);
      alert("Échec de l'import du document.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Mes documents</h1>
        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            aria-label="Importer un document médical"
            title="Importer un document médical"
            onChange={handleFileChange}
          />
          <Button variant="outline" onClick={handleImportClick} disabled={uploading}>
            {uploading ? "Import..." : "Importer"}
          </Button>
        </div>
      </div>
      <p className="text-sm text-foreground/60 mb-4">Vos documents médicaux (ordonnances, analyses, imageries).</p>
      {file && (
        <div className="mb-4 p-3 border rounded-md space-y-3">
          <p className="text-sm text-foreground/70">Fichier sélectionné: <span className="font-medium">{file.name}</span></p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-foreground/60 block mb-1">Nom du document</label>
              <Input value={titre} onChange={(e) => setTitre(e.target.value)} placeholder="Ex: Analyse sanguine" />
            </div>
            <div>
              <label className="text-xs text-foreground/60 block mb-1">Hôpital (optionnel)</label>
              <Input value={hopital} onChange={(e) => setHopital(e.target.value)} placeholder="Ex: CHU Sylvanus Olympio" />
            </div>
            <div>
              <label className="text-xs text-foreground/60 block mb-1">Date</label>
              <Input type="date" value={dateDoc} onChange={(e) => setDateDoc(e.target.value)} />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleConfirmUpload} disabled={uploading}>
              {uploading ? "Envoi..." : "Confirmer l'import"}
            </Button>
            <Button variant="ghost" onClick={() => { setFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }} disabled={uploading}>
              Annuler
            </Button>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[{
          titre: 'Analyse sanguine', hopital: 'CHU Sylvanus Olympio, Lomé', date: '2025-08-10'
        },{
          titre: 'Ordonnance dermatologie', hopital: 'CHU Kara', date: '2025-07-22'
        }].map((d, idx) => (
          <div key={idx} className="border rounded-md p-3">
            <p className="font-medium">{d.titre}</p>
            <p className="text-sm text-foreground/60">{d.hopital}</p>
            <p className="text-xs text-foreground/50">{d.date}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}


