"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Plus, Filter } from "lucide-react";
import { Document } from "@/types";
import { useDocumentFilters } from "@/hooks/useDocumentFilters";
import { SearchFilter } from "./SearchFilter";
import { TypeFilter } from "./TypeFilter";
import { StatusFilter } from "./StatusFilter";
import { DateRangeFilter } from "./DateRangeFilter";
import { ActiveFilters } from "./ActiveFilters";
import { DocumentList } from "./DocumentList";
import { NewDocumentModal } from "./NewDocumentModal";

export const DoctorDocumentsPage = () => {
  const documents: Document[] = [
    {
      id: "1",
      title: "Ordonnance - Marie Dupont",
      type: "Ordonnance",
      patientName: "Marie Dupont",
      date: "2024-01-15",
      status: "GENEREE",
      size: "2.3 MB"
    },
    {
      id: "2",
      title: "Rapport de consultation - Jean Martin",
      type: "Rapport",
      patientName: "Jean Martin",
      date: "2024-01-14",
      status: "BROUILLON",
      size: "1.8 MB"
    },
    {
      id: "3",
      title: "Certificat médical - Sophie Bernard",
      type: "Certificat",
      patientName: "Sophie Bernard",
      date: "2024-01-13",
      status: "GENEREE",
      size: "1.2 MB"
    },
    {
      id: "4",
      title: "Ordonnance - Paul Durand",
      type: "Ordonnance",
      patientName: "Paul Durand",
      date: "2024-01-12",
      status: "EN_ATTENTE",
      size: "1.9 MB"
    },
    {
      id: "5",
      title: "Rapport de consultation - Anna Moreau",
      type: "Rapport",
      patientName: "Anna Moreau",
      date: "2024-01-11",
      status: "GENEREE",
      size: "3.1 MB"
    }
  ];

  const {
    filters,
    filteredDocuments,
    updateFilter,
    clearFilter,
    clearAllFilters
  } = useDocumentFilters(documents);

  const [open, setOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<any | null>(null);

  const patients = [
    { id: "p1", name: "Marie Dupont" },
    { id: "p2", name: "Jean Martin" },
    { id: "p3", name: "Sophie Bernard" },
  ];

  const handleCreate = async (payload: any) => {
    try {
      setCreating(true);
      // Appel API export PDF (stub)
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:3000'}/documents/export-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: payload.title, contentHtml: payload.contentHtml, patientName: payload.patientName })
      });
      const data = await res.json();
      console.log("PDF URL:", data.url);
      setOpen(false);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => setOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nouveau Document
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtres
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <SearchFilter 
              value={filters.search} 
              onChange={(value) => updateFilter('search', value)} 
            />
            <TypeFilter 
              value={filters.type} 
              onChange={(value) => updateFilter('type', value)} 
            />
            <StatusFilter 
              value={filters.status} 
              onChange={(value) => updateFilter('status', value)} 
            />
            <DateRangeFilter 
              value={filters.dateRange} 
              onChange={(value) => updateFilter('dateRange', value)} 
            />
          </div>
          <ActiveFilters 
            filters={filters}
            onClearFilter={clearFilter}
            onClearAll={clearAllFilters}
          />
        </CardContent>
      </Card>

      {/* Documents List */}
      <DocumentList 
        documents={documents}
        filteredDocuments={filteredDocuments}
        onClearAllFilters={clearAllFilters}
        onEdit={(doc) => {
          setEditingDoc(doc);
          setEditOpen(true);
        }}
      />
      <NewDocumentModal
        open={open}
        onOpenChange={setOpen}
        onCreate={(p) => handleCreate({ ...p, id: Math.random().toString(36).slice(2) })}
        patients={patients}
        loading={creating}
      />
      <NewDocumentModal
        open={editOpen}
        onOpenChange={setEditOpen}
        onCreate={(p) => { console.log('update doc', editingDoc?.id, p); setEditOpen(false); }}
        patients={patients}
        loading={false}
        initial={editingDoc ? {
          title: editingDoc.title,
          type: editingDoc.type,
          patientId: patients.find(x => x.name === editingDoc.patientName)?.id,
          date: editingDoc.date,
          status: editingDoc.status,
          contentHtml: (editingDoc as any).contentHtml ?? ''
        } : undefined}
      />
    </div>
  );
};