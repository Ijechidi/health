"use client";

import { useState, useMemo } from "react";
import { addDays, setHours, setMinutes, getDay } from "date-fns";
import { useCalendarContext } from "@/components/event-calendar/calendar-context";

import {
  EventCalendar,
  type CalendarEvent,
  type EventColor,
} from "@/components/event-calendar";

// Etiquettes data for calendar filtering
export const etiquettes = [
  {
    id: "my-events",
    name: "Mes Consultations",
    color: "emerald" as EventColor,
    isActive: true,
  },
  {
    id: "marketing-team",
    name: "Equipe Médicale",
    color: "orange" as EventColor,
    isActive: true,
  },
  {
    id: "interviews",
    name: "Rendez-vous Patients",
    color: "violet" as EventColor,
    isActive: true,
  },
  {
    id: "events-planning",
    name: "Planning Opérations",
    color: "blue" as EventColor,
    isActive: true,
  },
  {
    id: "holidays",
    name: "Congés",
    color: "rose" as EventColor,
    isActive: true,
  },
];

// Function to calculate days until next Sunday
const getDaysUntilNextSunday = (date: Date) => {
  const day = getDay(date); // 0 is Sunday, 6 is Saturday
  return day === 0 ? 0 : 7 - day; // If today is Sunday, return 0, otherwise calculate days until Sunday
};

// Store the current date to avoid repeated new Date() calls
const currentDate = new Date();

// Calculate the offset once to avoid repeated calculations
const daysUntilNextSunday = getDaysUntilNextSunday(currentDate);

// Sample events data with hardcoded times
const sampleEvents: CalendarEvent[] = [
  {
    id: "w1-0a",
    title: "Consultation Patient",
    description: "Rendez-vous général avec patient",
    start: setMinutes(
      setHours(addDays(currentDate, -13 + daysUntilNextSunday), 9),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -13 + daysUntilNextSunday), 11),
      30,
    ),
    color: "blue",
    location: "Executive Boardroom",
  },
  {
    id: "w1-0b",
    title: "Suivi Patient Cardio",
    description: "Consultation spécialisée en cardiologie",
    start: setMinutes(
      setHours(addDays(currentDate, -13 + daysUntilNextSunday), 14),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -13 + daysUntilNextSunday), 15),
      0,
    ),
    color: "violet",
    location: "Conference Room A",
  },
  {
    id: "w1-1",
    title: "Réunion Équipe Médicale",
    description: "Briefing quotidien avec l’équipe",
    start: setMinutes(
      setHours(addDays(currentDate, -12 + daysUntilNextSunday), 8),
      30,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -12 + daysUntilNextSunday), 10),
      0,
    ),
    color: "violet",
    location: "Innovation Lab",
  },
  {
    id: "w1-2",
    title: "Consultation Suivi",
    description: "Rendez-vous suivi traitement patient",
    start: setMinutes(
      setHours(addDays(currentDate, -12 + daysUntilNextSunday), 13),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -12 + daysUntilNextSunday), 14),
      30,
    ),
    color: "emerald",
    location: "Client HQ",
  },
  {
    id: "w1-3",
    title: "Consultation Spéciale",
    description: "Suivi patient spécialisé",
    start: setMinutes(
      setHours(addDays(currentDate, -11 + daysUntilNextSunday), 9),
      15,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -11 + daysUntilNextSunday), 11),
      0,
    ),
    color: "blue",
    location: "Finance Room",
  },
  {
    id: "w1-4",
    title: "Pause / Repos",
    description: "Petite pause",
    start: setMinutes(
      setHours(addDays(currentDate, -11 + daysUntilNextSunday), 12),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -11 + daysUntilNextSunday), 13),
      30,
    ),
    color: "orange",
    location: "Bistro Garden",
  },
  {
    id: "w1-5",
    title: "Consultation Patient",
    description: "Rendez-vous général",
    start: setMinutes(
      setHours(addDays(currentDate, -10 + daysUntilNextSunday), 10),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -10 + daysUntilNextSunday), 12),
      0,
    ),
    color: "orange",
    location: "Marketing Suite",
  },
  {
    id: "w1-6",
    title: "Consultation Urgente",
    description: "Prise en charge patient urgence",
    start: setMinutes(
      setHours(addDays(currentDate, -10 + daysUntilNextSunday), 14),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -10 + daysUntilNextSunday), 15),
      0,
    ),
    color: "violet",
    location: "HR Office",
  },
  {
    id: "w1-7",
    title: "Réunion Protocoles",
    description: "Mise à jour protocoles internes",
    start: setMinutes(
      setHours(addDays(currentDate, -9 + daysUntilNextSunday), 9),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -9 + daysUntilNextSunday), 10),
      30,
    ),
    color: "emerald",
    location: "Main Auditorium",
  },
  {
    id: "w1-8",
    title: "Consultation Patient",
    description: "Rendez-vous suivi",
    start: setMinutes(
      setHours(addDays(currentDate, -9 + daysUntilNextSunday), 13),
      45,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -9 + daysUntilNextSunday), 15),
      0,
    ),
    color: "blue",
    location: "Demo Room",
  },
  {
    id: "w1-9",
    title: "Pause / Repos",
    description: "Petit moment personnel",
    start: setMinutes(
      setHours(addDays(currentDate, -8 + daysUntilNextSunday), 7),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -8 + daysUntilNextSunday), 7),
      30,
    ),
    color: "rose",
  },
  {
    id: "w1-10",
    title: "Consultation Patient",
    description: "Rendez-vous général",
    start: setMinutes(
      setHours(addDays(currentDate, -8 + daysUntilNextSunday), 10),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -8 + daysUntilNextSunday), 10),
      30,
    ),
    color: "rose",
  },
  {
    id: "5e",
    title: "Consultation Suivi",
    description: "Rendez-vous suivi patient chronique",
    start: setMinutes(
      setHours(addDays(currentDate, -7 + daysUntilNextSunday), 10),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -7 + daysUntilNextSunday), 13),
      30,
    ),
    color: "rose",
  },
  {
    id: "1b",
    title: "Consultation Patient",
    description: "Rendez-vous général pour contrôle santé",
    start: setMinutes(
      setHours(addDays(currentDate, -6 + daysUntilNextSunday), 7),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -6 + daysUntilNextSunday), 8),
      0,
    ),
    color: "orange",
    location: "Main Conference Hall",
  },
  {
    id: "1c",
    title: "Réunion d'Équipe",
    description: "Briefing hebdomadaire avec le personnel médical",
    start: setMinutes(
      setHours(addDays(currentDate, -6 + daysUntilNextSunday), 8),
      15,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -6 + daysUntilNextSunday), 11),
      0,
    ),
    color: "blue",
    location: "Main Conference Hall",
  },
  {
    id: "1d",
    title: "Consultation Patient",
    description: "Rendez-vous suivi traitement patient",
    start: setMinutes(
      setHours(addDays(currentDate, -6 + daysUntilNextSunday), 15),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -6 + daysUntilNextSunday), 16),
      0,
    ),
    color: "blue",
    location: "Main Conference Hall",
  },
  {
    id: "1e",
    title: "Réunion Protocoles",
    description: "Présentation des nouvelles procédures médicales",
    start: setMinutes(
      setHours(addDays(currentDate, -5 + daysUntilNextSunday), 8),
      15,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -5 + daysUntilNextSunday), 9),
      30,
    ),
    color: "emerald",
    location: "Main Conference Hall",
  },
  {
    id: "1f",
    title: "Consultation Patient",
    description: "Rendez-vous général et suivi",
    start: setMinutes(
      setHours(addDays(currentDate, -5 + daysUntilNextSunday), 10),
      45,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -5 + daysUntilNextSunday), 13),
      30,
    ),
    color: "emerald",
    location: "Main Conference Hall",
  },
  {
    id: "5",
    title: "Consultation Spéciale",
    description: "Suivi patient avec pathologie chronique",
    start: setMinutes(
      setHours(addDays(currentDate, -4 + daysUntilNextSunday), 9),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -4 + daysUntilNextSunday), 11),
      30,
    ),
    color: "orange",
    location: "Downtown Cafe",
  },
  {
    id: "5b",
    title: "Consultation Patient",
    description: "Rendez-vous général",
    start: setMinutes(
      setHours(addDays(currentDate, -4 + daysUntilNextSunday), 13),
      30,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -4 + daysUntilNextSunday), 14),
      0,
    ),
    color: "violet",
    location: "Downtown Cafe",
  },
  {
    id: "5c",
    title: "Consultation Urgente",
    description: "Prise en charge patient urgence",
    start: setMinutes(
      setHours(addDays(currentDate, -3 + daysUntilNextSunday), 9),
      45,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -3 + daysUntilNextSunday), 10),
      45,
    ),
    color: "violet",
    location: "Abbey Road Room",
  },
  {
    id: "5d",
    title: "Téléconsultation",
    description: "Consultation à distance avec patient",
    start: setMinutes(
      setHours(addDays(currentDate, -3 + daysUntilNextSunday), 11),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -3 + daysUntilNextSunday), 11),
      30,
    ),
    color: "violet",
    location: "Abbey Road Room",
  },
  {
    id: "5ef",
    title: "Briefing Matinal",
    description: "Revue des dossiers patients du jour",
    start: setMinutes(
      setHours(addDays(currentDate, -2 + daysUntilNextSunday), 8),
      45,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -2 + daysUntilNextSunday), 9),
      45,
    ),
    color: "blue",
  },
  {
    id: "5f",
    title: "Consultation Patient",
    description: "Rendez-vous suivi traitement",
    start: setMinutes(
      setHours(addDays(currentDate, -2 + daysUntilNextSunday), 14),
      30,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -2 + daysUntilNextSunday), 15),
      30,
    ),
    color: "orange",
    location: "Main Conference Hall",
  },
  {
    id: "5g",
    title: "Pause / Repos",
    description: "Temps personnel",
    start: setMinutes(
      setHours(addDays(currentDate, -1 + daysUntilNextSunday), 7),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, -1 + daysUntilNextSunday), 7),
      30,
    ),
    color: "rose",
  },
  {
    id: "w3-1",
    title: "Consultation Patient",
    description: "Rendez-vous général et suivi",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday), 9),
      30,
    ),
    end: setMinutes(setHours(addDays(currentDate, daysUntilNextSunday), 12), 0),
    color: "blue",
    location: "Planning Room",
  },
  {
    id: "w3-2",
    title: "Consultation Patient Spéciale",
    description: "Suivi patient avec pathologie spécifique",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 1), 7),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 1), 8),
      30,
    ),
    color: "violet",
    location: "Meeting Room B",
  },
  {
    id: "w3-3",
    title: "Réunion Équipe",
    description: "Briefing hebdomadaire sur les patients",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 1), 10),
      15,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 1), 12),
      45,
    ),
    color: "emerald",
    location: "Design Studio",
  },
  {
    id: "w3-4",
    title: "Consultation Patient",
    description: "Rendez-vous général et suivi traitement",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 1), 13),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 1), 14),
      30,
    ),
    color: "orange",
    location: "Executive Dining Room",
  },
  {
    id: "w3-5",
    title: "Consultation Spéciale",
    description: "Suivi patient chronique",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 2), 11),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 2), 12),
      30,
    ),
    color: "blue",
    location: "Engineering Lab",
  },
  {
    id: "w3-6",
    title: "Téléconsultation",
    description: "Consultation à distance avec patient",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 2), 15),
      15,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 2), 16),
      0,
    ),
    color: "violet",
    location: "Call Center",
  },
  {
    id: "w3-7",
    title: "Journée Spéciale",
    description: "Activité interne ou formation",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 3), 9),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 3), 17),
      0,
    ),
    color: "emerald",
    location: "Adventure Park",
    allDay: true,
  },
  {
    id: "w3-8",
    title: "Réunion Suivi Patient",
    description: "Évaluation des dossiers patients",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 4), 8),
      45,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 4), 10),
      15,
    ),
    color: "orange",
    location: "Marketing Room",
  },
  {
    id: "w3-9",
    title: "Consultation Patient",
    description: "Rendez-vous général et suivi traitement",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 5), 14),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 5), 16),
      30,
    ),
    color: "blue",
    location: "Strategy Room",
  },
  {
    id: "w3-10",
    title: "Pause / Repos",
    description: "Marche matinale ou temps libre",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 6), 7),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 6), 7),
      30,
    ),
    color: "rose",
  },
  {
    id: "w3-11",
    title: "Consultation Patient",
    description: "Rendez-vous suivi",
    start: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 6), 10),
      0,
    ),
    end: setMinutes(
      setHours(addDays(currentDate, daysUntilNextSunday + 6), 10),
      30,
    ),
    color: "rose",
  },

];


export default function Component() {
  const [events, setEvents] = useState<CalendarEvent[]>(sampleEvents);
  const { isColorVisible } = useCalendarContext();

  // Filter events based on visible colors
  const visibleEvents = useMemo(() => {
    return events.filter((event) => isColorVisible(event.color));
  }, [events, isColorVisible]);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event,
      ),
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id !== eventId));
  };

  return (
    <EventCalendar
      events={visibleEvents}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="week"
    />
  );
}
