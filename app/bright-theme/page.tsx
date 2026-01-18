import { CleanHero } from "@/components/sections/CleanHero";
import { CleanServices } from "@/components/sections/CleanServices";
import { CleanValues } from "@/components/sections/CleanValues";
import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { PartnersSection } from "@/components/sections/PartnersSection";

export default function CleanThemePage() {
  return (
    <main className="theme-clean bg-[#F6F9FC]">
      <CleanHero />
      <PartnersSection />
      <CleanServices />
      <CleanValues />
      <BricknetFooter />
    </main>
  );
}
