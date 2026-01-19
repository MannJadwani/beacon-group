import Link from "next/link";

import { bricknetPricingPlans } from "@/lib/constants/bricknet";

export function VariantBluePricingSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#f8faff] py-24 lg:py-32 overflow-hidden" aria-label="Pricing">
      {/* Decorative elements */}
      <div className="absolute top-20 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#183EFA]/3 blur-3xl" />
      
      <div className="wrapper px-5 lg:px-20">
        <div className="flex flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-8 text-center">
            <span className="inline-block bg-gradient-to-r from-[#EDE44C] to-[#f5ed8a] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-[#183EFA] rounded-full shadow-lg shadow-[#EDE44C]/20">
              Service Coverage
            </span>
            <div className="flex flex-col items-center gap-4 max-w-2xl">
              <h2 data-aos="fade" className="text-center text-4xl font-semibold leading-tight text-[#183EFA] lg:text-5xl">
                Regulated and specialized trustee solutions
              </h2>
              <p className="text-center text-lg leading-relaxed text-[#183EFA]/50">
                Explore core trustee mandates, regulated offerings, and specialized services.
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3" aria-label="Pricing plans">
            {bricknetPricingPlans.map((plan, idx) => (
              <article
                key={plan.name}
                className="group flex flex-col items-center gap-8 rounded-3xl bg-white p-10 shadow-xl shadow-[#183EFA]/5 transition-all hover:shadow-2xl hover:-translate-y-2 hover:bg-[#183EFA]"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex w-full flex-col gap-4">
                  <h3 className="text-2xl font-semibold leading-tight text-[#183EFA] transition-colors group-hover:text-white">
                    {plan.name}
                  </h3>
                </div>

                <div className="w-full">
                  {plan.sublabel ? (
                    <p className="text-base leading-tight text-[#183EFA]/50 transition-colors group-hover:text-white/60">
                      {plan.sublabel}
                    </p>
                  ) : (
                    <div className="h-5" aria-hidden="true" />
                  )}
                  <div className="mt-2 text-4xl font-semibold leading-tight text-[#183EFA] transition-colors group-hover:text-white">
                    {plan.price}
                  </div>
                </div>

                <Link
                  href={plan.href}
                  className="w-full rounded-2xl bg-gradient-to-r from-[#EDE44C] to-[#f5ed8a] px-6 py-4 text-center text-base font-semibold leading-tight text-[#183EFA] transition-all shadow-lg shadow-[#EDE44C]/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  {plan.cta}
                </Link>

                <div className="flex w-full flex-col gap-4">
                  <h4 className="text-base font-semibold leading-tight text-[#183EFA]/70 transition-colors group-hover:text-white/80">
                    Features
                  </h4>
                  <ul className="flex flex-col gap-3" aria-label="Package features">
                    {plan.features.map((feature) => (
                      <li key={feature} className="inline-flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE44C]/20 text-sm text-[#183EFA] transition-colors group-hover:bg-white/20 group-hover:text-white"
                        >
                          ✓
                        </span>
                        <span className="text-base leading-tight text-[#183EFA]/60 transition-colors group-hover:text-white/70">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
