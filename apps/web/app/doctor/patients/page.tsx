"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Users, Search, Eye, Phone, Mail, Calendar, Building2 } from "lucide-react";
import { PatientDetailsModal } from "@/components/doctor/PatientDetailsModal";
import { useSelectedHospital } from "@/hooks/useSelectedHospital";

export default function DoctorPatientsPage() {
  const { selectedHospitalId, selectedHospital } = useSelectedHospital();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  const patients = [
    {
      id: "1",
      name: "Marie Dupont",
      age: 45,
      email: "marie.dupont@email.com",
      phone: "06 12 34 56 78",
      lastVisit: "2024-01-10",
      status: "ACTIF",
      specialty: "Cardiologie"
    },
    {
      id: "2",
      name: "Jean Martin",
      age: 62,
      email: "jean.martin@email.com",
      phone: "06 98 76 54 32",
      lastVisit: "2024-01-08",
      status: "ACTIF",
      specialty: "Cardiologie"
    },
    {
      id: "3",
      name: "Sophie Bernard",
      age: 38,
      email: "sophie.bernard@email.com",
      phone: "06 11 22 33 44",
      lastVisit: "2024-01-05",
      status: "ACTIF",
      specialty: "Cardiologie"
    },
    {
      id: "4",
      name: "Pierre Dubois",
      age: 55,
      email: "pierre.dubois@email.com",
      phone: "06 55 66 77 88",
      lastVisit: "2023-12-20",
      status: "INACTIF",
      specialty: "Cardiologie"
    }
  ];

  // Statut non utilisé dans le rendu; on ne colore plus par statut

  const filteredPatients = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patients.filter((p) => {
      const matchesQuery = !q ||
        p.name.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q);
      return matchesQuery;
    });
  }, [patients, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const pagedPatients = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredPatients.slice(start, start + pageSize);
  }, [filteredPatients, currentPage, pageSize]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Patients</h2>
          {selectedHospital && (
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
              <Building2 className="h-4 w-4" />
              <span>Hôpital: {selectedHospital.nom}</span>
            </div>
          )}
        </div>
      </div>

      {/* Les filtres sont déplacés dans la carte de la liste */}

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
           
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Patients Actifs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux ce mois</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            
          </CardContent>
        </Card>
        
      </div>

      {/* Patients List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des patients</CardTitle>
          <CardDescription>
            Vos patients avec leurs informations de contact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  className="pl-8"
                  value={query}
                  onChange={(e) => { setQuery(e.target.value); setPage(1); }}
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground block mb-1">Par page</label>
              <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Par page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            {pagedPatients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {patient.age} ans • {patient.specialty}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Mail className="h-3 w-3" />
                        <span>{patient.email}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{patient.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      Dernière visite
                    </div>
                    <div className="text-sm font-medium">
                      {patient.lastVisit}
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => { setSelectedPatient(patient); setDetailsOpen(true); }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredPatients.length === 0 && (
              <p className="text-sm text-muted-foreground">Aucun patient ne correspond aux filtres.</p>
            )}
            <div className="flex items-center justify-between pt-2">
              <p className="text-xs text-muted-foreground">Page {currentPage} / {totalPages} • {filteredPatients.length} résultats</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={goPrev} disabled={currentPage === 1}>Précédent</Button>
                <Button variant="outline" size="sm" onClick={goNext} disabled={currentPage === totalPages}>Suivant</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <PatientDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} patient={selectedPatient} />
    </div>
  );
}
