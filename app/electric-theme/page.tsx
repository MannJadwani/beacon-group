import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { ElectricHeader } from "@/components/layout/ElectricHeader";
import { AboutSection } from "@/components/sections/AboutSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { ElectricHero } from "@/components/sections/electric/ElectricHero";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ElectricServices } from "@/components/sections/electric/ElectricServices";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ElectricValues } from "@/components/sections/electric/ElectricValues";
import { WorkProcessSection } from "@/components/sections/WorkProcessSection";

export default function ElectricThemePage() {
  return (
    <main id="main-content" className="theme-electric bg-white">
      <ElectricHeader />
      <ElectricHero />
      <PartnersSection />
      <AboutSection />
      <ElectricServices />
      <ElectricValues />
      <TestimonialsSection />
      <FeaturedProjectsSection />
      <WorkProcessSection />
      <BlogSection />
      <PricingSection />
      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
