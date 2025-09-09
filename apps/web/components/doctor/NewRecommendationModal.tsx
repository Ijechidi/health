"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Calendar as CalendarIcon, Users, Stethoscope, X } from "lucide-react";

interface PatientOption { id: string; name: string }
interface DoctorOption { id: string; name: string; specialty?: string }

interface NewRecommendationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patients: PatientOption[];
  doctors: DoctorOption[];
  defaultPatientId?: string;
  onCreate: (payload: { patientId: string; targetDoctorId: string; date: string; note?: string }) => void | Promise<void>;
  loading?: boolean;
}

export function NewRecommendationModal({ open, onOpenChange, patients, doctors, defaultPatientId, onCreate, loading = false }: NewRecommendationModalProps) {
  const [patientId, setPatientId] = useState<string>(defaultPatientId ?? "");
  const [targetDoctorId, setTargetDoctorId] = useState<string>("");
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0,10));
  const [note, setNote] = useState<string>("");

  const canCreate = patientId && targetDoctorId && date;
  const patientName = useMemo(() => patients.find(p => p.id === patientId)?.name ?? "", [patients, patientId]);
  const targetDoctorName = useMemo(() => doctors.find(d => d.id === targetDoctorId)?.name ?? "", [doctors, targetDoctorId]);

  useEffect(() => {
    if (open && defaultPatientId) setPatientId(defaultPatientId);
  }, [open, defaultPatientId]);

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Recommander un patient</h2>
                <p className="text-sm text-muted-foreground">{patientName ? `Patient: ${patientName}` : "Sélectionnez un patient"}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Patient</label>
                <Select value={patientId} onValueChange={setPatientId}>
                  <SelectTrigger className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600">
                    <SelectValue placeholder="Sélectionner un patient" />
                  </SelectTrigger>
                  <SelectContent>
                    {patients.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><Stethoscope className="h-4 w-4 text-muted-foreground" /> Médecin recommandé</label>
                <Select value={targetDoctorId} onValueChange={setTargetDoctorId}>
                  <SelectTrigger className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600">
                    <SelectValue placeholder="Sélectionner un médecin" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map(d => (
                      <SelectItem key={d.id} value={d.id}>{d.name}{d.specialty ? ` • ${d.specialty}` : ''}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-muted-foreground" /> Date</label>
                <Input type="date" value={date} min={new Date().toISOString().slice(0,10)} onChange={(e) => setDate(e.target.value)} className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Motif / Note (optionnel)</label>
              <textarea
                className="min-h-[140px] w-full border rounded-md p-2 border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                placeholder="Précisions pour le médecin destinataire..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button className="bg-blue-600 hover:bg-blue-700" disabled={!canCreate || loading} onClick={() => onCreate({ patientId, targetDoctorId, date, note })}>
              {loading ? "Création..." : "Créer"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

 