"use client";

import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { X } from "lucide-react";
import { DocumentFilters } from "@/types";

interface ActiveFiltersProps {
  filters: DocumentFilters;
  onClearFilter: (key: keyof DocumentFilters) => void;
  onClearAll: () => void;
}

export const ActiveFilters = ({ filters, onClearFilter, onClearAll }: ActiveFiltersProps) => {
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