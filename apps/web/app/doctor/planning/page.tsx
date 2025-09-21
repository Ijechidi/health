import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "visit planning ",
};


import { SidebarInset, SidebarProvider } from "@repo/ui/components/sidebar";

import { AppSidebar } from "@/components/calendar/app-sidebar";
import BigCalendar from "@/components/calendar/big-calendar";
import { CalendarProvider } from "@/components/event-calendar/calendar-context";
export default function Page() {
  return (
    <CalendarProvider>
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-2 pt-0">
          <BigCalendar />
        </div>
      </SidebarInset>
    </SidebarProvider>
    </CalendarProvider>
  );
}
