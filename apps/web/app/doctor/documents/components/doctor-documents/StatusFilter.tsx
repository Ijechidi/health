"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { FilterComponentProps } from "@/types";

export const StatusFilter = ({ value, onChange }: FilterComponentProps) => {
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