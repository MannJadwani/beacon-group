import Image from "next/image";
import Link from "next/link";
import { BricknetHeader } from "@/components/layout/BricknetHeader";

export function BubblyHero() {
  return (
    <section 
      className="relative min-h-screen overflow-hidden bg-white px-5 pt-32 lg:px-20 lg:pt-48" 
      aria-label="Bubbly Hero"
    >
      {/* Soft Background Orbs */}
      <div className="absolute -left-20 -top-20 h-[500px] w-[500px] rounded-full bg-[var(--color-primary-navy)]/5 blur-3xl" />
      <div className="absolute -right-20 bottom-20 h-[400px] w-[400px] rounded-full bg-[var(--color-accent-gold)]/10 blur-3xl" />

      <BricknetHeader variant="white" />

      <div className="wrapper relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Bubbly Badge */}
          <div data-aos="zoom-in" className="mb-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--color-primary-navy)]/10 px-6 py-2 text-sm font-extrabold text-[var(--color-primary-navy)]">
              ✨ India&apos;s First Listed Trustee
            </span>
          </div>

          {/* Title */}
          <h1 
            data-aos="fade-up"
            className="font-sans text-5xl font-extrabold leading-tight tracking-tight text-primary-navy lg:text-8xl"
          >
            Trust made <br />
            <span className="text-[var(--color-primary-navy)]">simple & friendly.</span>
          </h1>

          <p 
            data-aos="fade-up" 
            data-aos-delay={100}
            className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-secondary-light-navy lg:text-xl"
          >
            We handle the complex paperwork so you can focus on growth. 
            Reliable trusteeship powered by modern tech and a smile.
          </p>

          {/* Floating Bubble Buttons */}
          <div 
            data-aos="fade-up" 
            data-aos-delay={200}
            className="mt-12 flex flex-wrap justify-center gap-6"
          >
            <Link 
              href="/contact" 
              className="bubble-shadow rounded-full bg-[var(--color-primary-navy)] px-10 py-5 text-sm font-extrabold text-white transition-all hover:scale-105 hover:bg-[var(--color-primary-navy-dark)]"
            >
              Get Started Now
            </Link>
            <Link 
              href="/#services" 
              className="rounded-full border-2 border-[var(--color-primary-navy)] px-10 py-5 text-sm font-extrabold text-[var(--color-primary-navy)] transition-all hover:bg-[var(--color-primary-navy)]/5"
            >
              Explore Services
            </Link>
          </div>
        </div>

        {/* Bubbly Stats Row */}
        <div className="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: "Assets Managed", value: "₹8L CR+", color: "bg-blue-400" },
            { label: "Our Reach", value: "20+ Cities", color: "bg-yellow-400" },
            { label: "Trust Score", value: "99.9%", color: "bg-green-400" },
          ].map((stat, idx) => (
            <div 
              key={stat.label}
              data-aos="fade-up"
              data-aos-delay={300 + idx * 100}
              className="group flex flex-col items-center rounded-[40px] border-2 border-primary-navy/5 bg-white p-10 text-center transition-all hover:border-[var(--color-primary-navy)]/20 hover:shadow-xl"
            >
              <span className="mb-2 text-sm font-black uppercase tracking-widest text-secondary-light-navy/40">{stat.label}</span>
              <span className="text-4xl font-extrabold text-primary-navy lg:text-5xl">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
