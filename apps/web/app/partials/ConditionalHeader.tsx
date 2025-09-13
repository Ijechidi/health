"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "@/components/header/Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  const hide = pathname?.startsWith("/register") 
    || pathname?.startsWith("/login") 
    || pathname?.startsWith("/patient")
    || pathname?.startsWith("/doctor")
    || pathname?.startsWith("/admin");
  if (hide) return null;
  return <Header/>;
}


