import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { AboutSection } from "@/components/sections/AboutSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { DenseSwissHero } from "@/components/sections/DenseSwissHero";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { WorkProcessSection } from "@/components/sections/WorkProcessSection";

export default function Home() {
  return (
    <main id="main-content">
      <DenseSwissHero />
      <PartnersSection />
      <AboutSection />
      <ServicesSection />
      <ValuesSection />
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
