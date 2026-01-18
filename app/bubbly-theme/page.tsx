import { BubblyHero } from "@/components/sections/BubblyHero";
import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { PartnersSection } from "@/components/sections/PartnersSection";

export default function BubblyThemePage() {
  return (
    <main className="theme-bubbly overflow-hidden">
      <BubblyHero />
      <PartnersSection />
      
      {/* Soft Content Section */}
      <section className="bg-[var(--color-primary-navy)] py-24 lg:py-40">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-square w-full rounded-[60px] bg-white/10 flex items-center justify-center border-4 border-dashed border-white/20">
                <p className="text-white/40 font-black text-2xl uppercase tracking-widest">Team Image Placeholder</p>
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-[var(--color-accent-gold)] flex items-center justify-center shadow-2xl animate-bounce">
                <span className="text-4xl">👋</span>
              </div>
            </div>
            <div className="order-1 lg:order-2 text-white">
              <h2 className="text-5xl lg:text-7xl font-extrabold leading-[0.9] tracking-tight mb-8">
                Friendly <br /> Experts.
              </h2>
              <p className="text-xl font-medium text-white/80 mb-10">
                We believe financial services shouldn&apos;t be scary or boring. 
                Our team is here to help you navigate the complex world of 
                trusteeship with clarity and ease.
              </p>
              <ul className="space-y-6">
                {["Human-first support", "Modern tech stack", "Zero jargon"].map((item) => (
                  <li key={item} className="flex items-center gap-4 text-lg font-bold">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent-gold)] text-primary-navy text-sm">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <BricknetFooter />
    </main>
  );
}
