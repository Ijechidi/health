"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@repo/ui/lib/utils";
import { Badge } from "@repo/ui/components/badge";
import { CalendarDays, FileText, LayoutDashboard, LogOut, Bell, User } from "lucide-react";

const items = [
  { href: "/patient/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/patient/appointments", label: "Rendez-vous", icon: CalendarDays },
  { href: "/patient/documents", label: "Documents", icon: FileText },
  { href: "/patient/profile", label: "Profil", icon: User },
  { href: "/patient/notification", label: "Notifications", icon: Bell },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <nav className="bg-background border rounded-md p-3">
      <div className="px-2 py-3 border-b mb-2">
        <p className="text-lg font-semibold text-foreground">Espace patient</p>
        <p className="text-xs text-foreground/60">Gérez votre santé</p>
      </div>
      <ul className="space-y-1">
        {items.map((it) => {
          const active = pathname?.startsWith(it.href);
          return (
            <li key={it.href}>
              <Link
                href={it.href}
                className={cn(
                  "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition",
                  active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                )}
              >
                <it.icon className="h-4 w-4" />
                <span>{it.label}</span>
                {it.href === "/patient/notification" && (
                  <Badge className="ml-auto" variant="secondary">3</Badge>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="pt-3 mt-3 border-t">
        <button className="w-full flex items-center gap-2 text-left text-sm text-red-500 hover:underline">
          <LogOut className="h-4 w-4" /> Se déconnecter
        </button>
      </div>
    </nav>
  );
}


