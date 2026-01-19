import { VariantBlueFooter } from "@/components/sections/VariantBlueFooter";
import { VariantBlueAboutSection } from "@/components/sections/VariantBlueAboutSection";
import { VariantBlueBlogSection } from "@/components/sections/VariantBlueBlogSection";
import { VariantBlueCtaSection } from "@/components/sections/VariantBlueCtaSection";
import { VariantBlueFeaturedProjectsSection } from "@/components/sections/VariantBlueFeaturedProjectsSection";
import { VariantBlueHeroSection } from "@/components/sections/VariantBlueHeroSection";
import { VariantBluePartnersSection } from "@/components/sections/VariantBluePartnersSection";
import { VariantBluePricingSection } from "@/components/sections/VariantBluePricingSection";
import { VariantBlueServicesSection } from "@/components/sections/VariantBlueServicesSection";
import { VariantBlueTestimonialsSection } from "@/components/sections/VariantBlueTestimonialsSection";
import { VariantBlueValuesSection } from "@/components/sections/VariantBlueValuesSection";
import { VariantBlueWorkProcessSection } from "@/components/sections/VariantBlueWorkProcessSection";

export default function VariantBluePage() {
  return (
    <main id="main-content">
      <VariantBlueHeroSection />
      <VariantBluePartnersSection />
      <VariantBlueAboutSection />
      <VariantBlueServicesSection />
      <VariantBlueValuesSection />
      <VariantBlueTestimonialsSection />
      <VariantBlueFeaturedProjectsSection />
      <VariantBlueWorkProcessSection />
      <VariantBlueBlogSection />
      <VariantBluePricingSection />
      <VariantBlueCtaSection />
      <VariantBlueFooter />
    </main>
  );
}
