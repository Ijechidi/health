"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { FilterComponentProps } from "@/types";

export const DateRangeFilter = ({ value, onChange }: FilterComponentProps) => {
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