import React from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";

export default function PatientAppointmentsPage() {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Mes rendez-vous</h1>
        <Button variant="default">Nouveau rendez-vous</Button>
      </div>
      <p className="text-sm text-foreground/60 mb-4">Gestion de vos rendez-vous médicaux.</p>

      <div className="space-y-2">
        {[{
          date: '2025-09-15', heure: '09:00', hopital: 'CHU Sylvanus Olympio, Lomé', service: 'Cardiologie', statut: 'CONFIRME'
        },{
          date: '2025-09-20', heure: '14:30', hopital: 'CHU Kara', service: 'Dermatologie', statut: 'EN_ATTENTE'
        }].map((r, idx) => (
          <div key={idx} className="border rounded-md p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{r.service} • {r.hopital}</p>
              <p className="text-sm text-foreground/60">{r.date} • {r.heure}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-muted">{r.statut}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}


