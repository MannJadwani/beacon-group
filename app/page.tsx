import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { AboutSection } from "@/components/sections/AboutSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProjectsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ValuesSection } from "@/components/sections/ValuesSection";
import { WorkProcessSection } from "@/components/sections/WorkProcessSection";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <PartnersSection />
      <AboutSection />
      <ServicesSection />
      <ValuesSection />
      <FeaturedProjectsSection />
      <WorkProcessSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection />
      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
