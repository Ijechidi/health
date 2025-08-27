import HeroSection from "@/components/hero/HeroSection";
import HopitalList from "@/components/hopital/HopitalList";
import SpecialiterListe from "@/components/specialities/SpecialiterListe";
import SpecialiterSlides from "@/components/specialities/SpecialiterSlides";
import React from "react";
import NoiseOverlay from '@repo/ui/components/design/NoiseOverlay';


export default function Home() {
  return (
    <div className="flex relative flex-col gap-20  min-h-screen bg-design-bg ">
        <HeroSection/>
        <SpecialiterListe/>
        <SpecialiterSlides/>
        <HopitalList/>
        <NoiseOverlay intensity={18} blendMode="difference" />
    </div>
  );
}
