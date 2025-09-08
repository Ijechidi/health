"use client";

import React, { useMemo, useState } from "react";
import { Card } from "@repo/ui/components/card";
import { Button } from "@repo/ui/components/button";
import { Badge } from "@repo/ui/components/badge";

type NotificationItem = {
  id: string;
  type: "RENDEZ_VOUS" | "DOCUMENT" | "RECOMMANDATION";
  title: string;
  message: string;
  date: string; // ISO
  read: boolean;
};

export default function PatientNotificationPage() {
  const [items, setItems] = useState<NotificationItem[]>(() => [
    {
      id: "n1",
      type: "RENDEZ_VOUS",
      title: "Rendez-vous confirmé",
      message: " Dr. Ndiaye du 2025-09-20 à 14:00...",
      date: new Date().toISOString(),
      read: false,
    },
    {
      id: "n2",
      type: "DOCUMENT",
      title: "Nouveau document ajouté",
      message: "Ordonnance dermatologie disponible dans vos documents.",
      date: new Date(Date.now() - 3600_000).toISOString(),
      read: false,
    },
    {
      id: "n3",
      type: "RECOMMANDATION",
      title: "Recommandation du médecin",
      message: "Dr. Diop a ajouté une recommandation à votre dossier.",
      date: new Date(Date.now() - 86400_000).toISOString(),
      read: true,
    },
  ]);

  const unreadCount = useMemo(() => items.filter(i => !i.read).length, [items]);

  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })));
  const toggleRead = (id: string) => setItems(prev => prev.map(i => i.id === id ? { ...i, read: !i.read } : i));

  const typeBadge = (t: NotificationItem["type"]) => {
    if (t === "RENDEZ_VOUS") return <Badge>Rendez-vous</Badge>;
    if (t === "DOCUMENT") return <Badge variant="secondary">Document</Badge>;
    return <Badge variant="outline">Recommandation</Badge>;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Notifications</h1>
        <div className="flex items-center gap-2">
          <Badge variant={unreadCount ? "default" : "secondary"}>{unreadCount} non lues</Badge>
          <Button variant="outline" size="sm" onClick={markAllRead}>Tout marquer lu</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <ul className="divide-y">
          {items.map((n) => (
            <li key={n.id} className={`p-3 border-2 flex items-start gap-3 ${n.read ? 'bg-transparent' : 'bg-muted/30'}`}>
              <div className="mt-0.5">{typeBadge(n.type)}</div>
              <div className="flex-1">
                <p className="font-bold">{n.title}</p>
                <p className="text-sm text-foreground/70">{n.message}</p>
                <p className="text-xs text-foreground/50 mt-1">{new Date(n.date).toLocaleString()}</p>
              </div>
              <div className="ml-2">
                <Button variant="ghost" size="sm" onClick={() => toggleRead(n.id)}>
                  {n.read ? 'Marquer non lu' : 'Marquer lu'}
                </Button>
              </div>
            </li>
          ))}
          {!items.length && (
            <li className="p-4 text-sm text-foreground/60">Aucune notification</li>
          )}
        </ul>
      </Card>
    </div>
  );
}


