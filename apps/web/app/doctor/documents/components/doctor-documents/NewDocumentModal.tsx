"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Calendar as CalendarIcon, FileText, User, X } from "lucide-react";
import RichEditor from "./RichEditor";

interface NewDocumentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (payload: {
    title: string;
    type: string;
    patientName: string;
    date: string;
    status: string;
    size: string;
  }) => void | Promise<void>;
  patients: Array<{ id: string; name: string }>;
  loading?: boolean;
  initial?: Partial<{
    title: string;
    type: string;
    patientId: string;
    date: string;
    status: string;
    contentHtml: string;
  }>;
}

export function NewDocumentModal({ open, onOpenChange, onCreate, patients, loading = false, initial }: NewDocumentModalProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [type, setType] = useState(initial?.type ?? "Ordonnance");
  const [patientId, setPatientId] = useState(initial?.patientId ?? "");
  const [date, setDate] = useState<string>(initial?.date ?? new Date().toISOString().slice(0,10));
  const [status, setStatus] = useState(initial?.status ?? "BROUILLON");
  const [contentJson, setContentJson] = useState<any>(null);
  const [contentHtml, setContentHtml] = useState<string>(initial?.contentHtml ?? "");

  React.useEffect(() => {
    if (open && initial) {
      setTitle(initial.title ?? "");
      setType(initial.type ?? "Ordonnance");
      setPatientId(initial.patientId ?? "");
      setDate(initial.date ?? new Date().toISOString().slice(0,10));
      setStatus(initial.status ?? "BROUILLON");
      setContentHtml(initial.contentHtml ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const patientName = useMemo(() => patients.find(p => p.id === patientId)?.name ?? "", [patients, patientId]);
  const canCreate = title.trim() && type && patientId && date && status;

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" onClick={() => onOpenChange(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background border rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Nouveau document</h2>
                <p className="text-sm text-muted-foreground">Créer une ordonnance, un rapport ou un certificat</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Titre</label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Ordonnance - Marie Dupont"
                className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type</label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600">
                    <SelectValue placeholder="Type de document" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ordonnance">Ordonnance</SelectItem>
                    <SelectItem value="Rapport">Rapport</SelectItem>
                    <SelectItem value="Certificat">Certificat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="pt-2 border-t">
              <p className="text-sm font-medium mb-3">Patient et date</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2"><User className="h-4 w-4 text-muted-foreground" /> Patient</label>
                  <Select value={patientId} onValueChange={setPatientId}>
                    <SelectTrigger className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600">
                      <SelectValue placeholder="Sélectionner un patient" />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-muted-foreground" /> Date</label>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600"
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Statut</label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="border-blue-300 focus-visible:ring-blue-600 focus-visible:border-blue-600">
                    <SelectValue placeholder="Statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BROUILLON">Brouillon</SelectItem>
                    <SelectItem value="GENEREE">Générée</SelectItem>
                    <SelectItem value="EN_ATTENTE">En attente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Contenu</label>
              <RichEditor
                initialHtml={contentHtml || "<p></p>"}
                onChange={(json, html) => { setContentJson(json); setContentHtml(html); }}
              />
            </div>
          </div>

          <div className="p-6 border-t flex justify-end gap-2">
            <Button variant="ghost" onClick={() => onOpenChange(false)}>Annuler</Button>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!canCreate || loading}
              onClick={() => onCreate({ title, type, patientName, date, status, size: "-", contentJson, contentHtml } as any)}
            >
              {loading ? (initial ? "Mise à jour..." : "Création...") : (initial ? "Mettre à jour" : "Créer")}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}


