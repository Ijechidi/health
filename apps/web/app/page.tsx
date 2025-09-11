import HeroSection from "@/components/hero/HeroSection";
import HopitalList from "@/components/hopital/HopitalList";
import SpecialiterListe from "@/components/specialities/SpecialiterListe";
import SpecialiterSlides from "@/components/specialities/SpecialiterSlides";
import React from "react";
import NoiseOverlay from '@repo/ui/components/design/NoiseOverlay';
import SearchDoctor from "@/components/SearchDoctor";


export default function Home() {
  return (
    <div className="flex relative flex-col gap-20 min-h-screen bg-design-bg ">
        <div className="flex flex-col gap-2">
          <HeroSection/>
          <span className="max-w-[600px]"><SearchDoctor   /></span>
        </div>
        <SpecialiterListe/>
        <SpecialiterSlides/>
        <HopitalList/>
        <NoiseOverlay intensity={18} blendMode="difference" />
    </div>
  );
}
