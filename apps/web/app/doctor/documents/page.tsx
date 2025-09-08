"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { FileText, Plus, Download, Eye, Edit, Calendar, User, Search, Filter, X } from "lucide-react";

// Types pour les filtres
interface DocumentFilters {
  search: string;
  type: string;
  status: string;
  dateRange: string;
  patient: string;
}

interface Document {
  id: string;
  title: string;
  type: string;
  patientName: string;
  date: string;
  status: string;
  size: string;
}

// Composant de recherche
const SearchFilter = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <div className="relative min-w-32">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Rechercher des documents..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10"
      />
    </div>
  );
};

// Composant de filtre par type
const TypeFilter = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Type de document" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">types</SelectItem>
        <SelectItem value="Ordonnance">Ordonnances</SelectItem>
        <SelectItem value="Rapport">Rapports</SelectItem>
        <SelectItem value="Certificat">Certificats</SelectItem>
      </SelectContent>
    </Select>
  );
};

// Composant de filtre par statut
const StatusFilter = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Statut" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">statuts</SelectItem>
        <SelectItem value="GENEREE">Générée</SelectItem>
        <SelectItem value="BROUILLON">Brouillon</SelectItem>
        <SelectItem value="EN_ATTENTE">En attente</SelectItem>
      </SelectContent>
    </Select>
  );
};

// Composant de filtre par date
const DateRangeFilter = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Période" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">dates</SelectItem>
        <SelectItem value="today">Aujourd'hui</SelectItem>
        <SelectItem value="week">Cette semaine</SelectItem>
        <SelectItem value="month">Ce mois</SelectItem>
        <SelectItem value="quarter">Ce trimestre</SelectItem>
        <SelectItem value="year">Cette année</SelectItem>
      </SelectContent>
    </Select>
  );
};

// Composant pour les filtres actifs
const ActiveFilters = ({ 
  filters, 
  onClearFilter, 
  onClearAll 
}: { 
  filters: DocumentFilters; 
  onClearFilter: (key: keyof DocumentFilters) => void;
  onClearAll: () => void;
}) => {
  const activeFilters = [];
  
  if (filters.search) {
    activeFilters.push({ key: 'search', label: `Recherche: ${filters.search}`, value: filters.search });
  }
  if (filters.type && filters.type !== 'all') {
    activeFilters.push({ key: 'type', label: `Type: ${filters.type}`, value: filters.type });
  }
  if (filters.status && filters.status !== 'all') {
    activeFilters.push({ key: 'status', label: `Statut: ${filters.status}`, value: filters.status });
  }
  if (filters.dateRange && filters.dateRange !== 'all') {
    const dateLabels: { [key: string]: string } = {
      today: "Aujourd'hui",
      week: "Cette semaine",
      month: "Ce mois",
      quarter: "Ce trimestre",
      year: "Cette année"
    };
    activeFilters.push({ 
      key: 'dateRange', 
      label: `Période: ${dateLabels[filters.dateRange]}`, 
      value: filters.dateRange 
    });
  }

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">Filtres actifs:</span>
      {activeFilters.map((filter) => (
        <Badge key={filter.key} variant="secondary" className="flex items-center gap-1">
          {filter.label}
          <X 
            className="h-3 w-3 cursor-pointer hover:text-destructive" 
            onClick={() => onClearFilter(filter.key as keyof DocumentFilters)}
          />
        </Badge>
      ))}
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onClearAll}
        className="text-xs"
      >
        Effacer tout
      </Button>
    </div>
  );
};

// Hook personnalisé pour la logique de filtrage
const useDocumentFilters = (documents: Document[]) => {
  const [filters, setFilters] = useState<DocumentFilters>({
    search: '',
    type: 'all',
    status: 'all',
    dateRange: 'all',
    patient: ''
  });

  const updateFilter = (key: keyof DocumentFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilter = (key: keyof DocumentFilters) => {
    setFilters(prev => ({ 
      ...prev, 
      [key]: key === 'type' || key === 'status' || key === 'dateRange' ? 'all' : '' 
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      type: 'all',
      status: 'all',
      dateRange: 'all',
      patient: ''
    });
  };

  const filteredDocuments = useMemo(() => {
    return documents.filter(doc => {
      // Filtre par recherche
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const matchesSearch = 
          doc.title.toLowerCase().includes(searchTerm) ||
          doc.patientName.toLowerCase().includes(searchTerm) ||
          doc.type.toLowerCase().includes(searchTerm);
        
        if (!matchesSearch) return false;
      }

      // Filtre par type
      if (filters.type && filters.type !== 'all') {
        if (doc.type !== filters.type) return false;
      }

      // Filtre par statut
      if (filters.status && filters.status !== 'all') {
        if (doc.status !== filters.status) return false;
      }

      // Filtre par date (logique simplifiée pour l'exemple)
      if (filters.dateRange && filters.dateRange !== 'all') {
        const docDate = new Date(doc.date);
        const now = new Date();
        
        switch (filters.dateRange) {
          case 'today':
            if (docDate.toDateString() !== now.toDateString()) return false;
            break;
          case 'week':
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            if (docDate < weekAgo) return false;
            break;
          case 'month':
            if (docDate.getMonth() !== now.getMonth() || docDate.getFullYear() !== now.getFullYear()) return false;
            break;
          case 'quarter':
            const quarter = Math.floor(now.getMonth() / 3);
            const docQuarter = Math.floor(docDate.getMonth() / 3);
            if (docQuarter !== quarter || docDate.getFullYear() !== now.getFullYear()) return false;
            break;
          case 'year':
            if (docDate.getFullYear() !== now.getFullYear()) return false;
            break;
        }
      }

      return true;
    });
  }, [documents, filters]);

  return {
    filters,
    filteredDocuments,
    updateFilter,
    clearFilter,
    clearAllFilters
  };
};

// Composant principal avec filtres intégrés
export default function DoctorDocumentsPageWithFilters() {
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "GENEREE":
        return "bg-green-100 text-green-800 border-green-200";
      case "BROUILLON":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "EN_ATTENTE":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Ordonnance":
        return "💊";
      case "Rapport":
        return "📋";
      case "Certificat":
        return "🏥";
      default:
        return "📄";
    }
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Documents</h2>
        <div className="flex items-center space-x-2">
          <Button className="bg-blue-600 hover:bg-blue-700">
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

      {/* Stats mise à jour */}

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des documents</CardTitle>
          <CardDescription>
            {filteredDocuments.length === documents.length 
              ? "Gérez vos ordonnances, rapports et certificats médicaux"
              : `${filteredDocuments.length} document(s) trouvé(s) sur ${documents.length}`
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                Aucun document trouvé
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Essayez de modifier vos critères de recherche ou de filtrage
              </p>
              <Button variant="outline" onClick={clearAllFilters}>
                Effacer tous les filtres
              </Button>
            </div>
          ) : (
            <div className="divide-y">
              {filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-lg">
                      {getTypeIcon(document.type)}
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground">
                        {document.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {document.type} • {document.patientName}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{document.date}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {document.size}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(document.status)}>
                      {document.status.replace('_', ' ')}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}