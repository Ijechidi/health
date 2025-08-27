"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { CalendarDays, FileText, Activity, Users } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Input } from "@repo/ui/components/input";

type PatientProfile = {
  utilisateur: {
    id: string;
    nom: string;
    prenom?: string | null;
    email: string;
    telephone?: string | null;
    dateCreation: string;
  };
  patient: {
    id: string;
    dateNaissance: string;
    adresse?: string | null;
    groupeSanguin: string;
    poids?: number | null;
    taille?: number | null;
    sexe: string;
  };
};

type Appointment = {
  id: string;
  date: string;
  heure: string;
  statut: string;
  medecin: { id: string; titre: string };
};

type DocumentItem = {
  id: string;
  titre: string;
  description?: string | null;
  dateCreation: string;
  url: string;
};

export default function PatientDashboardPage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newRdvOpen, setNewRdvOpen] = useState(false);
  const [selectedMedecin, setSelectedMedecin] = useState<string>("");
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [motif, setMotif] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>("");

  // Disponibilités (exemple) — à remplacer par l'API médecin
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

  const filteredSlots = useMemo(() => disponibilites
    .filter(d => !selectedMedecin || d.medecinId === selectedMedecin)
    .filter(d => !selectedDate || d.date === selectedDate)
  , [disponibilites, selectedMedecin, selectedDate]);

  const nextDays = useMemo(() => {
    const days: { key: string; label: string }[] = [];
    const now = new Date();
    for (let i = 0; i < 21; i++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + i);
      const key = d.toISOString().slice(0,10);
      const label = d.toLocaleDateString(undefined, { weekday: 'short', day: '2-digit', month: 'short' });
      days.push({ key, label });
    }
    return days;
  }, []);

  const handleConfirmRdv = async () => {
    const slot = disponibilites.find(s => s.id === selectedSlotId);
    if (!slot || !selectedMedecin) return;

    // Suivre le schéma: RendezVous { date, heure, statut, utilisateurId, medecinId, patientId }
    // Ici, on simule l'ajout côté client. À connecter à l'API ensuite (POST /rendezvous)
    const newItem: Appointment = {
      id: `tmp-${Date.now()}`,
      date: slot.date,
      heure: slot.heure,
      statut: "EN_ATTENTE",
      medecin: { id: selectedMedecin, titre: medecins.find(m => m.id === selectedMedecin)?.titre || "Médecin" },
    };
    setAppointments(prev => [newItem, ...prev]);
    setNewRdvOpen(false);
    setSelectedMedecin("");
    setSelectedSlotId("");
    setMotif("");
  };

  const apiBase = useMemo(() => process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001", []);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError("");
      try {
        // Remplacer l'ID par l'ID du patient connecté une fois l'auth prête
        const patientId = "me";

        // Ces endpoints sont à implémenter côté API; ici on tolère l'échec et on met des données d'exemple
        const [pRes, aRes, dRes] = await Promise.allSettled([
          fetch(`${apiBase}/patients/${patientId}`),
          fetch(`${apiBase}/patients/${patientId}/appointments?limit=5`),
          fetch(`${apiBase}/patients/${patientId}/documents?limit=5`),
        ]);

        let nextProfile: PatientProfile | null = null;
        let nextAppointments: Appointment[] = [];
        let nextDocuments: DocumentItem[] = [];

        if (pRes.status === "fulfilled" && pRes.value.ok) {
          nextProfile = await pRes.value.json();
        }
        if (aRes.status === "fulfilled" && aRes.value.ok) {
          nextAppointments = await aRes.value.json();
        }
        if (dRes.status === "fulfilled" && dRes.value.ok) {
          nextDocuments = await dRes.value.json();
        }

        // Fallback de démonstration si l'API n'est pas prête
        if (!nextProfile) {
          nextProfile = {
            utilisateur: {
              id: "demo-user",
              nom: "Doe",
              prenom: "Jane",
              email: "jane.doe@example.com",
              telephone: "+2210000000",
              dateCreation: new Date().toISOString(),
            },
            patient: {
              id: "demo-patient",
              dateNaissance: "1995-06-15",
              adresse: "Lomé, Togo",
              groupeSanguin: "O_POSITIF",
              poids: 65,
              taille: 1.70,
              sexe: "Femme",
            },
          };
        }
        if (!nextAppointments.length) {
          nextAppointments = [
            { id: "r1", date: new Date().toISOString().slice(0, 10), heure: "09:30", statut: "EN_ATTENTE", medecin: { id: "m1", titre: "Dr. Ndiaye (Cardiologie)" } },
            { id: "r2", date: new Date(Date.now() + 86400000).toISOString().slice(0, 10), heure: "14:00", statut: "CONFIRME", medecin: { id: "m2", titre: "Dr. Diop (Dermatologie)" } },
          ];
        }
        if (!nextDocuments.length) {
          nextDocuments = [
            { id: "d1", titre: "Analyse sanguine", description: "Résultats 2025", dateCreation: new Date().toISOString(), url: "#" },
            { id: "d2", titre: "Ordonnance", description: "Traitement allergie", dateCreation: new Date().toISOString(), url: "#" },
          ];
        }

        if (mounted) {
          setProfile(nextProfile);
          setAppointments(nextAppointments);
          setDocuments(nextDocuments);
        }
      } catch (e) {
        if (mounted) setError("Impossible de charger le tableau de bord");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, [apiBase]);

  return (
    <main className="min-h-screen bg-design-bg px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord patient</h1>
            <p className="text-foreground/60">Vue d'ensemble de votre profil, rendez-vous et documents</p>
          </div>
          <div className="flex gap-2">
            <Button variant="default" onClick={() => setNewRdvOpen(true)}>Prendre un rendez-vous</Button>
            {newRdvOpen && (
              <>
                <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setNewRdvOpen(false)} />
                <div className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background border rounded-md p-4 w-full max-w-lg shadow-lg">
                  <h2 className="text-lg font-semibold">Nouveau rendez-vous</h2>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm mb-1 text-foreground">Médecin</label>
                      <Select value={selectedMedecin} onValueChange={setSelectedMedecin}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Choisir un médecin" />
                        </SelectTrigger>
                        <SelectContent>
                          {medecins.map(m => (
                            <SelectItem key={m.id} value={m.id}>{m.titre}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-foreground">Date</label>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {nextDays.map(d => (
                          <button
                            key={d.key}
                            onClick={() => { setSelectedDate(d.key); setSelectedSlotId(""); }}
                            className={`border rounded-md px-2 py-2 text-sm hover:bg-muted ${selectedDate===d.key ? 'bg-primary text-primary-foreground' : ''}`}
                          >
                            {d.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-foreground">Disponibilités</label>
                      <div className="grid grid-cols-2 gap-2">
                        {filteredSlots.map(s => (
                          <button
                            key={s.id}
                            onClick={() => setSelectedSlotId(s.id)}
                            className={`border rounded-md px-3 py-2 text-sm text-left hover:bg-muted ${selectedSlotId===s.id ? 'bg-primary text-primary-foreground' : ''}`}
                          >
                            <div className="font-medium">{s.date}</div>
                            <div className="text-foreground/70">{s.heure}</div>
                          </button>
                        ))}
                        {!filteredSlots.length && <p className="col-span-2 text-sm text-foreground/60">Aucune disponibilité</p>}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-1 text-foreground">Motif</label>
                      <Input placeholder="Ex: Consultation de suivi" value={motif} onChange={(e)=>setMotif(e.target.value)} />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={()=>setNewRdvOpen(false)}>Annuler</Button>
                      <Button onClick={handleConfirmRdv} disabled={!selectedMedecin || !selectedDate || !selectedSlotId}>Confirmer</Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Cartes de statistiques (style shadcn) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60">Rendez-vous (total)</p>
              <CalendarDays className="h-4 w-4 text-foreground/60" />
            </div>
            <p className="text-2xl font-semibold mt-1">{appointments.length}</p>
            <p className="text-xs text-foreground/60 mt-1">Période récente</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60">Prochains confirmés</p>
              <Activity className="h-4 w-4 text-foreground/60" />
            </div>
            <p className="text-2xl font-semibold mt-1">{appointments.filter(a => a.statut === "CONFIRME").length}</p>
            <p className="text-xs text-foreground/60 mt-1">Cette semaine</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60">Documents</p>
              <FileText className="h-4 w-4 text-foreground/60" />
            </div>
            <p className="text-2xl font-semibold mt-1">{documents.length}</p>
            <p className="text-xs text-foreground/60 mt-1">Récemment ajoutés</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-foreground/60">Équipe soignante</p>
              <Users className="h-4 w-4 text-foreground/60" />
            </div>
            <p className="text-2xl font-semibold mt-1">2</p>
            <p className="text-xs text-foreground/60 mt-1">Médecins suivis</p>
          </Card>
        </section>

        {loading && <p className="text-foreground/70">Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && profile && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 md:col-span-1">
              <h2 className="text-lg font-semibold mb-3">Profil</h2>
              <div className="space-y-1 text-sm">
                <p><span className="text-foreground/60">Nom:</span> {profile.utilisateur.prenom ? `${profile.utilisateur.prenom} ${profile.utilisateur.nom}` : profile.utilisateur.nom}</p>
                <p><span className="text-foreground/60">Email:</span> {profile.utilisateur.email}</p>
                {profile.utilisateur.telephone && <p><span className="text-foreground/60">Téléphone:</span> {profile.utilisateur.telephone}</p>}
                <p><span className="text-foreground/60">Sexe:</span> {profile.patient.sexe}</p>
                <p><span className="text-foreground/60">Date de naissance:</span> {profile.patient.dateNaissance}</p>
                {profile.patient.adresse && <p><span className="text-foreground/60">Adresse:</span> {profile.patient.adresse}</p>}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">Groupe: {profile.patient.groupeSanguin}</Badge>
                  {profile.patient.poids != null && <Badge variant="outline">Poids: {profile.patient.poids} kg</Badge>}
                  {profile.patient.taille != null && <Badge variant="outline">Taille: {profile.patient.taille} m</Badge>}
                </div>
              </div>
            </Card>

            <Card className="p-4 md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Prochains rendez-vous</h2>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">7 jours</Button>
                  <Button variant="outline" size="sm">30 jours</Button>
                </div>
              </div>
              <div className="space-y-2">
                {appointments.map((rdv) => (
                  <div key={rdv.id} className="flex items-center justify-between border rounded-md p-3">
                    <div>
                      <p className="font-medium">{rdv.medecin.titre}</p>
                      <p className="text-sm text-foreground/60">{rdv.date} • {rdv.heure}</p>
                    </div>
                    <Badge variant={rdv.statut === "CONFIRME" ? "default" : rdv.statut === "ANNULE" ? "destructive" : "secondary"}>{rdv.statut}</Badge>
                  </div>
                ))}
                {!appointments.length && <p className="text-foreground/60">Aucun rendez-vous à venir</p>}
              </div>
            </Card>
          </section>
        )}

        {!loading && (
          <section>
            <Card className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold">Documents récents</h2>
                <Button variant="outline">Voir tous</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {documents.map((doc) => (
                  <a key={doc.id} href={doc.url} className="border rounded-md p-3 hover:bg-muted/30 transition">
                    <p className="font-medium">{doc.titre}</p>
                    {doc.description && <p className="text-sm text-foreground/60">{doc.description}</p>}
                    <p className="text-xs text-foreground/50 mt-1">{new Date(doc.dateCreation).toLocaleString()}</p>
                  </a>
                ))}
                {!documents.length && <p className="text-foreground/60">Aucun document</p>}
              </div>
            </Card>
          </section>
        )}
      </div>
    </main>
  );
}


