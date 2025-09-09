import { useState, useMemo } from "react";
import { Document, DocumentFilters } from "@/types";

export const useDocumentFilters = (documents: Document[]) => {
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

