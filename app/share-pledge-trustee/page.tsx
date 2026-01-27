import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

const highlights = [
  { label: "Mandate", value: "Share pledge trustee" },
  { label: "Stakeholders", value: "Lender / Borrower" },
  { label: "Coverage", value: "Listed / unlisted shares" },
  { label: "Mode", value: "Pan-India" },
];

const deliverables = [
  "Pledge creation, invocation, and release coordination",
  "Account and depository operations with controlled workflows",
  "Reporting and covenant tracking across stakeholders",
  "Event-driven monitoring and communication support",
];

const safeguards = [
  "Independent trustee oversight during pledge lifecycle",
  "Defined documentation and release conditions",
  "Standardized reporting cadence for lenders",
  "Escalation routing through Beacon support",
];

const flowSteps = [
  {
    number: "01",
    title: "Mandate onboarding",
    description: "Align on facility terms, pledge terms, and stakeholder roles.",
  },
  {
    number: "02",
    title: "Pledge execution",
    description: "Coordinate documentation, depository instructions, and approvals.",
  },
  {
    number: "03",
    title: "Ongoing monitoring",
    description: "Track covenants, maintain reporting, and manage releases.",
  },
];

export default function SharePledgeTrusteePage() {
  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label="Share pledge trustee">
        <div className="absolute inset-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg"
            alt="Share pledge trustee"
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/70 to-primary-navy" />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
          <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-x border-white h-full" />
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(214,178,110,0.55) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
          aria-hidden="true"
        />

        <div className="wrapper relative z-10 px-5 pb-10 pt-32 lg:px-20 lg:pb-16 lg:pt-40">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  Unregulated service
                </span>
              </div>

              <h1 className="mt-8 font-sans text-[52px] font-black leading-[0.86] tracking-tighter uppercase md:text-[80px] lg:text-[104px]">
                Share
                <br />
                <span className="text-accent-gold">Pledge Trustee</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Beacon acts as an independent trustee for share pledges, ensuring
                documentation discipline, controlled releases, and clear reporting
                for lenders and issuers.
              </p>

              <div className="mt-10 flex flex-col gap-px bg-white/20 p-px sm:flex-row sm:max-w-xl" data-aos="fade-up" data-aos-delay={300}>
                <a
                  href="#overview"
                  className="flex items-center justify-center gap-3 bg-accent-gold px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-white"
                >
                  Overview <span aria-hidden="true">→</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 bg-white/5 px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
                >
                  Talk to us
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="bg-white/10 p-px">
                <div className="grid grid-cols-1 gap-px">
                  <div className="bg-primary-navy/70 px-8 py-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                      Mandate summary
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight text-white">
                      Trustee oversight for pledged shares and lender protections.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      We coordinate pledge creation, releases, and reporting with
                      defined documentation standards and escalation pathways.
                    </p>
                  </div>

                  <Link
                    href="/unregulated-services"
                    className="group bg-white px-8 py-7 transition-colors hover:bg-primary-navy hover:text-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Category
                    </p>
                    <p className="mt-3 text-lg font-semibold text-primary-navy group-hover:text-white">
                      Unregulated services
                    </p>
                    <p className="mt-2 text-sm text-primary-navy/60 group-hover:text-white/70">
                      View other specialist mandates.
                    </p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Explore <span className="text-accent-gold">→</span>
                    </div>
                  </Link>

                  <Link
                    href="/investor_grievance"
                    className="group bg-white px-8 py-7 transition-colors hover:bg-primary-navy hover:text-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Support
                    </p>
                    <p className="mt-3 text-lg font-semibold text-primary-navy group-hover:text-white">
                      Lodge a complaint
                    </p>
                    <p className="mt-2 text-sm text-primary-navy/60 group-hover:text-white/70">
                      Generate an email draft for escalations.
                    </p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Go <span className="text-accent-gold">→</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 border-t border-white/10 bg-primary-navy/90 backdrop-blur-xl">
          <div className="wrapper grid grid-cols-1 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            {highlights.map((stat) => (
              <div key={stat.label} className="px-8 py-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/60">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white/80">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="overview" className="bg-white py-24 lg:py-32" aria-label="Share pledge trustee overview">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Overview
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              How we support share pledge mandates
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="space-y-6 text-lg leading-relaxed text-primary-navy/60">
                <p>
                  Share pledge transactions require precise coordination across lenders,
                  issuers, and depositories. Beacon provides a trustee framework that
                  safeguards stakeholders through documented processes and controlled
                  releases.
                </p>
                <p>
                  We focus on discipline: maintaining pledge records, monitoring events,
                  and ensuring approvals are routed through the right parties before
                  any movement of pledged shares.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Deliverables
                  </p>
                  <div className="mt-6 grid grid-cols-1 gap-4">
                    {deliverables.map((item, idx) => (
                      <div key={item} className="flex items-start gap-4 border border-primary-navy/10 bg-primary-navy/[0.01] px-5 py-4">
                        <span className="mt-2 text-xs font-black text-accent-gold">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <p className="text-sm leading-relaxed text-primary-navy/70">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-base-white py-24 lg:py-32" aria-label="Process flow">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
        <div className="wrapper relative px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Engagement flow
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Structured trustee workflow
            </h2>
          </div>

          <div className="mt-12 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px lg:grid-cols-3">
              {flowSteps.map((step) => (
                <div key={step.number} className="bg-white p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Step {step.number}
                  </p>
                  <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">{step.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">{step.description}</p>
                  <div className="mt-6 h-px w-16 bg-accent-gold" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32" aria-label="Safeguards">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Safeguards
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Controls that keep pledges aligned
            </h2>
          </div>

          <div className="mt-12 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
              {safeguards.map((item, idx) => (
                <div key={item} className="bg-white p-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Guardrail {String(idx + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-primary-navy/70">{item}</p>
                  <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 border border-primary-navy/10 bg-white px-8 py-7" data-aos="fade-up" data-aos-delay={200}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
              Related
            </p>
            <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
              Explore regulated trustee services if your instrument is listed or
              requires SEBI protection mechanisms.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-3 bg-primary-navy px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
              >
                SEBI regulated <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-primary-navy/10 bg-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:bg-primary-navy/[0.02]"
              >
                Contact us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
