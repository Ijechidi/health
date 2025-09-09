"use client";

import { Input } from "@repo/ui/components/input";
import { Search } from "lucide-react";
import { FilterComponentProps } from "@/types";

export const SearchFilter = ({ value, onChange }: FilterComponentProps) => {
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