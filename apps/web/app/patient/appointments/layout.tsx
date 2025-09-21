"use client";

import React from "react";

export default function AppointmentsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {children}
      </div>
    </main>
  );
}
