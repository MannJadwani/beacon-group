import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type ContactPerson = {
  name: string;
  role: string;
  phone: string;
};

type OfficeContacts = {
  office: string;
  people: ContactPerson[];
};

type FacilityAgentContent = {
  title: string;
  intro: string;
  offer: string[];
  benefits: string[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
};

const parsed: FacilityAgentContent = {
  title: "Facility Agent",
  intro: "As a Facility Agent, Beacon Trusteeship acts as a single point of contact between the Borrower & the Lender(s). As a Facility Agent, our priority is to ensure a smooth flow of funds & information between the transacting parties. Our valuable inputs & customer-centric solutions help our clients reap the optimum benefit of the financial facilities extended.",
  offer: [
    "Confirming to Pre & Post Disbursement Compliances",
    "Monitoring of covenants as per terms of sanction",
    "System generated Interest Payment & Principal Redemption Calculations",
    "Periodic reminders for timely debt servicing",
    "Fund movement monitoring",
    "Periodic reminders for timely submission of Compliance Reports",
    "360 degree outlook on operational & legal aspects of a given transaction",
    "Expeditious opening & management of Bank Accounts",
    "Transaction centric services",
  ],
  benefits: [
    "Confirmation of Pre Disbursement compliances",
    "Monitoring & dispensing information regarding Post Disbursement Compliances",
    "Single point of contact for communication",
    "Conduct meetings of the transacting parties",
    "Bi-partisan outlook on operational & legal aspects",
  ],
  alsoOffer: [
    { label: "Family Office / Family Trust", href: "https://beacontrustee.co.in/family-trust" },
    { label: "Escrow Agent /Source Code Escrow /M&A /Settlement Escrow", href: "https://beacontrustee.co.in/escrow-monitoring-agency" },
    { label: "Security Trustee", href: "https://beacontrustee.co.in/security-trustee-services" },
    { label: "ESOP / EWT / EBT (For Unlisted Shares)", href: "https://beacontrustee.co.in/esop-unregulated" },
    { label: "Safe Keeping Agent", href: "https://beacontrustee.co.in/safe-keeping-agent" },
    { label: "Share Pledge Trustee (For Unlisted Shares)", href: "https://beacontrustee.co.in/share-pledge-trustee-unregulated" },
  ],
  offices: [
    {
      office: "Mumbai Office",
      people: [
        { name: "Jaydeep Bhattacharya", role: "Executive Director", phone: "+91 9324724949" },
        { name: "Veena Nautiyal", role: "Associate Director", phone: "+91 9324724945" },
        { name: "Deepavali Vankalu", role: "Vice President", phone: "+91 9324724944" },
      ],
    },
    {
      office: "Delhi Office",
      people: [
        { name: "Kamal Paul", role: "Associate Vice President", phone: "+91 7208967004" },
      ],
    },
    {
      office: "Hyderabad Office",
      people: [
        { name: "Paul Samuel", role: "Regional Head - AP & Telangana", phone: "+91 9848805576" },
      ],
    },
    {
      office: "Bangalore Office",
      people: [
        { name: "Deepak Kulkarni", role: "Senior Manager", phone: "+91 9136929255" },
      ],
    },
    {
      office: "Chennai Office",
      people: [
        { name: "Sunil Menon", role: "Senior Manager", phone: "+91 7208967017" },
      ],
    },
  ],
};

function mapRelatedHref(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "beacontrustee.co.in") return url;

    if (u.pathname === "/escrow-monitoring-agency") return "/escrow-monitoring-agency";
    if (u.pathname === "/security-trustee-services") return "/security-trustee-services";

    return url;
  } catch {
    return url;
  }
}

function classifyOffer(item: string): "Compliance" | "Cashflow" | "Operations" {
  const t = item.toLowerCase();
  if (t.includes("compliance") || t.includes("covenant")) return "Compliance";
  if (t.includes("interest") || t.includes("principal") || t.includes("debt") || t.includes("fund")) {
    return "Cashflow";
  }
  return "Operations";
}

export default function FacilityAgentPage() {
  const compliance = parsed.offer.filter((o) => classifyOffer(o) === "Compliance");
  const cashflow = parsed.offer.filter((o) => classifyOffer(o) === "Cashflow");
  const ops = parsed.offer.filter((o) => classifyOffer(o) === "Operations");

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "scope", label: "Scope" },
    { id: "benefits", label: "Benefits" },
    ...(parsed.offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      {/* Hero - visual "flow of funds + information" */}
      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label={parsed.title}>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg"
            alt="Facility Agent background"
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/75 to-primary-navy" />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none opacity-5" aria-hidden="true">
          <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-x border-white h-full" />
            ))}
          </div>
        </div>

        <div className="wrapper relative z-10 px-5 pb-14 pt-32 lg:px-20 lg:pb-20 lg:pt-40">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  Service Detail
                </span>
              </div>

              <h1 className="mt-8 font-sans text-[52px] font-black leading-[0.86] tracking-tighter uppercase md:text-[80px] lg:text-[104px]">
                Facility
                <br />
                <span className="text-accent-gold">Agent</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {parsed.intro ||
                  "A single point of contact between the borrower and lenders, ensuring a smooth flow of funds and information."}
              </p>

              <div
                className="mt-10 flex flex-col gap-px bg-white/20 p-px sm:flex-row sm:max-w-xl"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <a
                  href="#overview"
                  className="bg-accent-gold px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                  Overview <span aria-hidden="true">→</span>
                </a>
                <Link
                  href="/contact"
                  className="bg-white/5 px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  Talk to us
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left">
              {/* Unique visual module: relay diagram */}
              <div className="bg-white/10 p-px">
                <div className="bg-primary-navy/60 p-8 lg:p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                    Relay diagram
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    A facility agent coordinates cashflows and information, reducing friction across parties.
                  </p>

                  <div className="mt-8 bg-white/10 p-px">
                    <div className="grid grid-cols-3 gap-px">
                      {[
                        { label: "Borrower", sub: "Reporting + docs" },
                        { label: "Facility agent", sub: "Single interface" },
                        { label: "Lenders", sub: "Monitoring" },
                      ].map((node) => (
                        <div key={node.label} className="bg-primary-navy/50 p-5">
                          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
                            {node.label}
                          </p>
                          <p className="mt-2 text-sm font-semibold text-white/85">
                            {node.sub}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3">
                    {[
                      {
                        label: "Funds flow",
                        value: "disbursement / servicing / monitoring",
                      },
                      {
                        label: "Information flow",
                        value: "covenants / compliance / reporting",
                      },
                    ].map((row, idx) => (
                      <div
                        key={row.label}
                        className="border border-white/10 bg-white/5 px-6 py-5"
                      >
                        <div className="flex items-center justify-between gap-6">
                          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/55">
                            {String(idx + 1).padStart(2, "0")} / {row.label}
                          </p>
                          <span className="h-px w-12 bg-white/20" aria-hidden="true" />
                        </div>
                        <p className="mt-3 text-sm font-semibold text-white/80">
                          {row.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex gap-px bg-white/20 p-px" aria-label="On page navigation">
                    {nav.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex-1 bg-white/5 px-4 py-3 text-center text-[10px] font-black uppercase tracking-[0.35em] text-white/70 hover:bg-white/10"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 border-t border-white/10 bg-primary-navy/90 backdrop-blur-xl">
          <div className="wrapper grid grid-cols-1 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              { label: "Core role", value: "Single point of contact" },
              { label: "Monitoring", value: "Covenants + reports" },
              { label: "Calculations", value: "Interest / principal" },
              { label: "Coverage", value: "Pan-India" },
            ].map((stat) => (
              <div key={stat.label} className="px-8 py-8 text-center">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/60">
                  {stat.label}
                </p>
                <p className="mt-2 text-sm font-semibold text-white/80">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-24 lg:py-32" aria-label="Facility agent content">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32">
                <div className="border border-primary-navy/10 bg-white">
                  <div className="border-b border-primary-navy/10 px-6 py-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      In This Page
                    </p>
                  </div>
                  <nav className="flex flex-col">
                    {nav.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="border-b border-primary-navy/10 px-6 py-4 text-sm font-semibold text-primary-navy/70 hover:text-accent-gold hover:bg-primary-navy/[0.02]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mt-10 bg-primary-navy/10 p-px">
                  <div className="bg-white p-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Related
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      <Link
                        href="/security-trustee-services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Security trustee <span className="text-accent-gold">→</span>
                      </Link>
                      <Link
                        href="/escrow-monitoring-agency"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Escrow services <span className="text-accent-gold">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <section id="overview" className="scroll-mt-28" data-aos="fade-up" aria-label="Overview">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Overview
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    A single coordination layer
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed text-primary-navy/60">
                      {parsed.intro}
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="bg-primary-navy/10 p-px">
                      <div className="bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Core benefit
                        </p>
                        <p className="mt-4 text-lg font-medium leading-tight text-primary-navy">
                          Reduced operational friction.
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                          One interface for notices, calculations, monitoring and stakeholder communication.
                        </p>
                        <div className="mt-6 h-px w-16 bg-accent-gold" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="scope" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Scope">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Scope
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    What Beacon does
                  </h2>
                </div>

                {/* Three-lane ops board */}
                <div className="mt-12 bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px lg:grid-cols-3">
                    {[
                      { title: "Compliance", items: compliance },
                      { title: "Cashflow", items: cashflow },
                      { title: "Operations", items: ops },
                    ].map((lane) => (
                      <div key={lane.title} className="bg-white p-8 lg:p-10">
                        <div className="flex items-center justify-between gap-8">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                            Lane
                          </p>
                          <span className="h-px w-16 bg-accent-gold" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                          {lane.title}
                        </h3>
                        <div className="mt-8 space-y-4">
                          {lane.items.map((item, idx) => (
                            <div key={`${lane.title}-${idx}`} className="flex items-start gap-4 border border-primary-navy/10 bg-primary-navy/[0.01] px-5 py-4">
                              <span className="mt-2 text-xs font-black tabular-nums text-accent-gold">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <p className="text-sm leading-relaxed text-primary-navy/70">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="benefits" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Benefits">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Benefits
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    For borrowers and lenders
                  </h2>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                    {parsed.benefits.map((b, idx) => (
                      <div key={`${b}-${idx}`} className="bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Benefit {String(idx + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-4 text-lg font-medium leading-tight text-primary-navy">
                          {b}
                        </p>
                        <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                </div>

                {parsed.alsoOffer.length > 0 && (
                  <div className="mt-12" data-aos="fade-up">
                    <div className="bg-primary-navy/10 p-px">
                      <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                        {parsed.alsoOffer.slice(0, 6).map((link) => {
                          const href = mapRelatedHref(link.href);
                          const isInternal = href.startsWith("/");

                          const Card = (
                            <>
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                                We also offer
                              </p>
                              <p className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                                {link.label}
                              </p>
                              <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                                Explore <span className="text-accent-gold">→</span>
                              </div>
                            </>
                          );

                          if (isInternal) {
                            return (
                              <Link
                                key={href}
                                href={href}
                                className="group bg-white p-8 transition-colors hover:bg-primary-navy hover:text-white"
                              >
                                {Card}
                              </Link>
                            );
                          }

                          return (
                            <a
                              key={href}
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group bg-white p-8 transition-colors hover:bg-primary-navy hover:text-white"
                            >
                              {Card}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {parsed.offices.length > 0 && (
                <section id="contacts" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Contacts">
                  <div className="border-b border-primary-navy/10 pb-6">
                    <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                      Contacts
                    </span>
                    <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                      Office contacts
                    </h2>
                  </div>

                  <div className="mt-12 space-y-10">
                    {parsed.offices.map((o) => (
                      <div key={o.office} className="bg-primary-navy/10 p-px">
                        <div className="bg-white p-8 lg:p-10">
                          <div className="flex items-center justify-between gap-10">
                            <h3 className="text-2xl font-medium leading-tight text-primary-navy">
                              {o.office}
                            </h3>
                            <span className="h-px w-16 bg-accent-gold" aria-hidden="true" />
                          </div>

                          <div className="mt-8 grid grid-cols-1 gap-px bg-primary-navy/10 sm:grid-cols-2">
                            {o.people.map((p) => (
                              <div key={`${o.office}-${p.phone}`} className="bg-white p-7">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                                  Contact
                                </p>
                                <p className="mt-3 text-lg font-semibold text-primary-navy">
                                  {p.name}
                                </p>
                                <p className="mt-2 text-sm text-primary-navy/60">{p.role}</p>
                                <a
                                  href={`tel:${p.phone.replace(/\s+/g, "")}`}
                                  className="mt-5 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                                >
                                  {p.phone} <span className="text-accent-gold">→</span>
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
