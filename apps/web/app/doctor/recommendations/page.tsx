"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Calendar, Plus, User } from "lucide-react";
import { NewRecommendationModal } from "@/components/doctor/NewRecommendationModal";

export default function DoctorRecommendationsPage() {
  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const recommendations = [
    { id: 'r1', patientName: 'Marie Dupont', targetDoctorName: 'Dr. Ndiaye', targetSpecialty: 'Cardiologie', date: '2024-01-15', note: 'Suspicion angor stable', urgency: 'standard' },
    { id: 'r2', patientName: 'Jean Martin', targetDoctorName: 'Dr. Diop', targetSpecialty: 'Dermatologie', date: '2024-01-12', note: 'Lésion cutanée chronique', urgency: 'élevée' },
  ];

  const patients = useMemo(() => ([
    { id: 'p1', name: 'Marie Dupont' },
    { id: 'p2', name: 'Jean Martin' },
    { id: 'p3', name: 'Sophie Bernard' },
  ]), []);
  const doctors = useMemo(() => ([
    { id: 'd1', name: 'Dr. Ndiaye', specialty: 'Cardiologie' },
    { id: 'd2', name: 'Dr. Diop', specialty: 'Dermatologie' },
  ]), []);

  const handleCreate = async (payload: { patientId: string; targetDoctorId: string; date: string; note?: string }) => {
    try {
      setCreating(true);
      console.log('create recommendation', payload);
      setOpen(false);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Recommandations</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouvelle recommandation
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommandations à effectuer</CardTitle>
          <CardDescription>Référer vos patients vers des confrères</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {recommendations.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-700" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{r.patientName}</div>
                    <div className="text-sm text-muted-foreground">Vers {r.targetDoctorName} • {r.targetSpecialty}</div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {r.date}</span>
                      {r.note && <span className="truncate max-w-[280px]">Motif: {r.note}</span>}
                    </div>
                  </div>
                </div>
                <Badge className={r.urgency === 'élevée' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-blue-100 text-blue-800 border-blue-200'}>
                  {r.urgency === 'élevée' ? 'Urgent' : 'Standard'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <NewRecommendationModal
        open={open}
        onOpenChange={setOpen}
        patients={patients}
        doctors={doctors}
        onCreate={handleCreate}
        loading={creating}
      />
    </div>
  );
}


