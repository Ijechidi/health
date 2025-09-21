"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@repo/ui/lib/utils";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

export interface CalendarProps {
  className?: string;
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | { from: Date; to: Date };
  onSelect?: (date: Date | Date[] | undefined) => void;
  disabled?: (date: Date) => boolean;
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ className, mode = "single", selected, onSelect, disabled }, ref) => {
    return (
      <div ref={ref} className={cn("p-2 bg-background rounded-md border", className)}>
        <DayPicker
          mode={mode}
          selected={selected}
          onSelect={onSelect}
          disabled={disabled}
          showOutsideDays
          modifiersClassNames={{
            selected: "bg-primary text-primary-foreground",
            today: "border border-primary",
          }}
          components={{
            Icon: CalendarIcon,
          }}
        />
      </div>
    );
  }
);

Calendar.displayName = "Calendar";

export { Calendar };