"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { FilterComponentProps } from "@/types";

export const TypeFilter = ({ value, onChange }: FilterComponentProps) => {
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