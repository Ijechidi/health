import React from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

export default function PatientDocumentsPage() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Mes documents</h1>
        <Button variant="outline">Importer</Button>
      </div>
      <p className="text-sm text-foreground/60 mb-4">Vos documents médicaux (ordonnances, analyses, imageries).</p>
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


