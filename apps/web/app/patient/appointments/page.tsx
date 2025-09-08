"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { AppointmentModal } from "@/components/appointment/AppointmentModal";

export default function PatientAppointmentsPage() {
  const [newRdvOpen, setNewRdvOpen] = useState(false);
  const [selectedMedecin, setSelectedMedecin] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [motif, setMotif] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedDateObj, setSelectedDateObj] = useState<Date | undefined>(undefined);

  const appointments = useMemo(() => [
    {
      date: '2025-09-15', heure: '09:00', hopital: 'CHU Sylvanus Olympio, Lomé', service: 'Cardiologie', statut: 'CONFIRME'
    },
    {
      date: '2025-09-20', heure: '14:30', hopital: 'CHU Kara', service: 'Dermatologie', statut: 'EN_ATTENTE'
    }
  ], []);

  // Données fictives pour le modal (à remplacer par l'API)
  const medecins = useMemo(() => ([
    { id: "m1", titre: "Dr. Ndiaye (Cardiologie)" },
    { id: "m2", titre: "Dr. Diop (Dermatologie)" },
  ]), []);

  const disponibilites = useMemo(() => ([
    { id: "s1", medecinId: "m1", date: new Date().toISOString().slice(0,10), heure: "09:00" },
    { id: "s2", medecinId: "m1", date: new Date().toISOString().slice(0,10), heure: "10:30" },
    { id: "s3", medecinId: "m2", date: new Date(Date.now()+86400000).toISOString().slice(0,10), heure: "14:00" },
    { id: "s4", medecinId: "m2", date: new Date(Date.now()+86400000).toISOString().slice(0,10), heure: "15:30" },
  ]), []);

  const handleConfirmRdv = async () => {
    // Intégrer l'appel API ici
    console.log("Confirmer RDV", { selectedMedecin, selectedDate, selectedSlotId, motif });
    setNewRdvOpen(false);
    setMotif("");
    setSelectedSlotId("");
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Mes rendez-vous</h1>
        <Button variant="default" onClick={() => setNewRdvOpen(true)}>Nouveau rendez-vous</Button>
      </div>
      <p className="text-sm text-foreground/60 mb-4">Gestion de vos rendez-vous médicaux.</p>

      <div className="space-y-2">
        {appointments.map((r, idx) => (
          <div key={idx} className="border rounded-md p-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{r.service} • {r.hopital}</p>
              <p className="text-sm text-foreground/60">{r.date} • {r.heure}</p>
            </div>
            <span className="text-xs px-2 py-1 rounded bg-muted">{r.statut}</span>
          </div>
        ))}
      </div>
      <AppointmentModal
        open={newRdvOpen}
        onOpenChange={setNewRdvOpen}
        medecins={medecins}
        disponibilites={disponibilites}
        selectedMedecin={selectedMedecin}
        onMedecinChange={setSelectedMedecin}
        selectedDate={selectedDate}
        selectedDateObj={selectedDateObj}
        onDateSelect={(date) => {
          setSelectedDateObj(date);
          setSelectedDate(date ? date.toISOString().slice(0,10) : "");
          setSelectedSlotId("");
        }}
        selectedSlotId={selectedSlotId}
        onSlotSelect={setSelectedSlotId}
        motif={motif}
        onMotifChange={setMotif}
        onConfirm={handleConfirmRdv}
      />
    </Card>
  );
}


