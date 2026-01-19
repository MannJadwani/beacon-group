import Link from "next/link";

import { bricknetPricingPlans } from "@/lib/constants/bricknet";
import { Check, ArrowRight } from "lucide-react";

export function PricingSection() {
  return (
    <section className="bg-white py-24 lg:py-40" aria-label="Service Coverage">
      <div className="wrapper px-5 lg:px-20">
        
        {/* Header: Sharp Swiss Alignment */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:mb-32 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div data-aos="fade-right" className="space-y-6">
              <span className="inline-block border-2 border-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.4em] text-primary-navy">
                Service Coverage
              </span>
              <h2 className="font-sans text-5xl font-black leading-[0.9] tracking-tighter uppercase lg:text-8xl">
                Regulated <br />
                <span className="text-accent-gold">& specialized</span> <br />
                trustee solutions
              </h2>
            </div>
          </div>
          <div className="flex flex-col justify-end lg:col-span-5 lg:pb-4">
            <p data-aos="fade-left" className="border-l-4 border-accent-gold pl-8 text-xl font-medium leading-tight tracking-tight text-slate-600 lg:text-2xl">
              Explore core trustee mandates, regulated offerings, and specialized services tailored to complex financial structures.
            </p>
          </div>
        </div>

        {/* Grid: Sharp, Minimal, Modern */}
        <div className="grid grid-cols-1 gap-px bg-slate-200 lg:grid-cols-3">
          {bricknetPricingPlans.map((plan, idx) => (
            <article
              key={plan.name}
              className="group relative flex flex-col bg-white p-10 transition-all duration-300 hover:bg-primary-navy lg:p-14"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-12">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-accent-gold">
                  {plan.sublabel}
                </span>
                <h3 className="mt-4 font-sans text-3xl font-black leading-none tracking-tighter uppercase text-primary-navy group-hover:text-white lg:text-4xl">
                  {plan.name}
                </h3>
              </div>

              <div className="mb-16 flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-100 group-hover:bg-white/10" />
                  <span className="text-sm font-bold tracking-widest text-primary-navy/40 group-hover:text-white/40">
                    CORE
                  </span>
                </div>
                
                <ul className="flex flex-col gap-5" aria-label="Package features">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-4">
                      <Check className="mt-1 size-4 shrink-0 text-accent-gold" strokeWidth={3} />
                      <span className="text-base font-bold leading-tight tracking-tight text-slate-600 group-hover:text-white/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Link
                  href={plan.href}
                  className="inline-flex items-center gap-4 border-b-2 border-primary-navy pb-2 text-sm font-black uppercase tracking-widest text-primary-navy transition-all hover:gap-6 group-hover:border-accent-gold group-hover:text-accent-gold"
                >
                  Explore Services
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
