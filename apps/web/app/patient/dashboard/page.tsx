"use client";

import React, { useEffect, useMemo, useState } from "react";
import { 
  AppointmentModal,
  DashboardHeader,
  StatsSection,
  PatientProfileCard,
  AppointmentsList,
  DocumentsList
} from "../../../components/dashboard";

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
  const [selectedDateObj, setSelectedDateObj] = useState<Date | undefined>(undefined);

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
        <DashboardHeader 
          onNewAppointment={() => setNewRdvOpen(true)}
          patientName={profile?.utilisateur.prenom ? `${profile.utilisateur.prenom} ${profile.utilisateur.nom}` : profile?.utilisateur.nom}
        />

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

        <StatsSection 
          appointments={appointments}
          documents={documents}
          doctorsCount={2}
        />

        {loading && <p className="text-foreground/70">Chargement...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && profile && (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <div className="md:col-span-1">
              <PatientProfileCard profile={profile} />
                </div> */}
            <div className="md:col-span-4">
              <AppointmentsList 
                appointments={appointments}
                onFilterChange={(period) => console.log('Filter changed:', period)}
                currentFilter="7 jours"
              />
              </div>
          </section>
        )}

        {!loading && (
          <section>
            <DocumentsList documents={documents} />
          </section>
        )}
      </div>
    </main>
  );
}


