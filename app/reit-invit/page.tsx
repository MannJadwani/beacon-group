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

type ParsedReitInvit = {
  title: string;
  intro: string;
  services: string[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
};

const parsed: ParsedReitInvit = {
  title: "REIT & InvIT",
  intro: "Real estate investment trusts (REITs) and Infrastructure investment trusts (InvITs) are the latest form of Investment Trusts under the local framework (India's very own framework for Business Trusts) that have been approved by SEBI. This offers a new asset class for investors as also a new source of financing to India's real estate and infrastructure industry.",
  services: [
    "Legal due diligence on assets and monitoring the flow of funds",
    "Convening meetings of unit holders and maintenance of records",
    "Investor relationship activity including review of unit holders complaints and their redressal",
    "Regulatory compliance and reporting",
    "Annual administration during the life of the trust",
    "Structuring from legal and taxation perspective",
    "Transfer of assets and listing assistance",
    "Setting up of operational framework and common platform for participants including sponsor(/s), investor(/s), investment manager, principal valuer, project manager and stock exchange",
    "Oversight of activities of the business trust under regulatory framework",
  ],
  alsoOffer: [
    { label: "Listed Non-Convertible Debenture (NCD) / Bond / Municipal Bond Trustee", href: "https://beacontrustee.co.in/debenture-bond-trusteeship-listed" },
    { label: "Alternative Investment Funds", href: "https://beacontrustee.co.in/alternative-investment-fund" },
    { label: "Securitization: Securitized Debt Instruments (SDIs)", href: "https://beacontrustee.co.in/securitization-trustee-regulated" },
    { label: "Escrow Services: Fractional Shares Escrow", href: "https://beacontrustee.co.in/escrow-fractional-regulated" },
    { label: "Escrow Services: Investor Protection Fund Escrow", href: "https://beacontrustee.co.in/escrow-ipef-regulated" },
    { label: "ESOP (For Listed Shares)", href: "https://beacontrustee.co.in/esop-regulated" },
    { label: "Share Pledge Trustee (For Listed Shares)", href: "https://beacontrustee.co.in/share-pledge-trustee-regulated" },
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

function mapToInternalHref(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "beacontrustee.co.in") return url;

    if (u.pathname === "/alternative-investment-fund") return "/alternative-investment-fund";
    if (u.pathname === "/deposit-trustee") return "/deposit-trustee";
    if (u.pathname === "/security-trustee-services") return "/security-trustee-services";
    if (u.pathname === "/facility-agent") return "/facility-agent";
    if (u.pathname === "/escrow-monitoring-agency") return "/escrow-monitoring-agency";
    if (u.pathname === "/safe-keeping-agent") return "/safe-keeping-agent";

    return url;
  } catch {
    return url;
  }
}

type PhaseKey = "setup" | "diligence" | "governance" | "lifecycle";

function phaseForService(item: string): PhaseKey {
  const t = item.toLowerCase();

  if (t.includes("structuring") || t.includes("operational framework") || t.includes("common platform")) {
    return "setup";
  }

  if (t.includes("due diligence") || t.includes("transfer") || t.includes("listing") || t.includes("flow of funds")) {
    return "diligence";
  }

  if (t.includes("regulatory") || t.includes("compliance") || t.includes("oversight")) {
    return "governance";
  }

  return "lifecycle";
}

export default function ReitInvitPage() {
  const phases: Array<{ key: PhaseKey; number: string; title: string; items: string[] }> = [
    {
      key: "setup",
      number: "01",
      title: "Structuring & Setup",
      items: [],
    },
    {
      key: "diligence",
      number: "02",
      title: "Diligence & Listing",
      items: [],
    },
    {
      key: "governance",
      number: "03",
      title: "Governance & Compliance",
      items: [],
    },
    {
      key: "lifecycle",
      number: "04",
      title: "Lifecycle & Investors",
      items: [],
    },
  ];

  for (const item of parsed.services) {
    const key = phaseForService(item);
    const phase = phases.find((p) => p.key === key);
    if (phase) phase.items.push(item);
  }

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Service coverage" },
    { id: "participants", label: "Participants" },
    ...(parsed.alsoOffer.length > 0 ? [{ id: "also", label: "Also offer" }] : []),
    ...(parsed.offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <section className="relative bg-base-white overflow-hidden" aria-label={parsed.title}>
        <BricknetHeader variant="white" />

        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="relative mt-[80px] px-5 pb-0 pt-20 lg:mt-[118px] lg:px-20 lg:pt-28">
          <div className="wrapper">
            <p
              data-aos="fade"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-navy/10 bg-primary-navy/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-primary-navy"
            >
              <span className="block size-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
              SEBI regulated service
            </p>

            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-20">
              <div className="lg:col-span-7" data-aos="fade-right">
                <h1 className="mb-6 text-4xl font-medium leading-[1.1] tracking-tight text-primary-navy lg:text-6xl xl:text-7xl">
                  REIT & InvIT
                  <br />
                  <span className="text-accent-gold">Trustee services</span>
                </h1>

                <p className="max-w-2xl text-lg leading-relaxed text-secondary-light-navy">
                  {parsed.intro}
                </p>

                <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                  <a
                    href="#overview"
                    className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                  >
                    Explore <span aria-hidden="true">→</span>
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    Talk to us <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
                {/* Unique visual module: twin asset classes + lifecycle */}
                <div className="bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px">
                    <div className="bg-primary-navy p-10 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                        Two asset classes
                      </p>
                      <div className="mt-8 grid grid-cols-2 gap-px bg-white/10">
                        <div className="bg-primary-navy/60 p-7">
                          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/55">
                            REIT
                          </p>
                          <p className="mt-3 text-sm font-semibold text-white/80">Real estate trust</p>
                        </div>
                        <div className="bg-primary-navy/60 p-7">
                          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/55">
                            InvIT
                          </p>
                          <p className="mt-3 text-sm font-semibold text-white/80">Infrastructure trust</p>
                        </div>
                      </div>
                      <p className="mt-6 text-sm leading-relaxed text-white/70">
                        Business trusts approved by SEBI, providing a new asset class for investors and financing route for sectors.
                      </p>
                    </div>

                    <div className="bg-white p-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Trustee coverage
                      </p>
                      <div className="mt-6 bg-primary-navy/10 p-px">
                        <div className="grid grid-cols-2 gap-px">
                          {[
                            { label: "Phases", value: String(phases.length) },
                            { label: "Services", value: String(parsed.services.length) },
                            { label: "Governance", value: "Oversight" },
                            { label: "IR", value: "Unit holders" },
                          ].map((s) => (
                            <div key={s.label} className="bg-white p-6">
                              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                                {s.label}
                              </p>
                              <p className="mt-3 text-sm font-semibold text-primary-navy">{s.value}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 border-t border-primary-navy/10 pt-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Delivery phases
                        </p>
                        <div className="mt-6 space-y-3">
                          {phases.map((p) => (
                            <div key={p.key} className="flex items-center justify-between gap-6 border border-primary-navy/10 bg-primary-navy/[0.01] px-5 py-4">
                              <span className="text-xs font-black tabular-nums text-accent-gold">{p.number}</span>
                              <span className="text-sm font-semibold text-primary-navy">{p.title}</span>
                              <span className="text-xs font-semibold tabular-nums text-primary-navy/40">
                                {p.items.length}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Quick index
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {nav.map((item) => (
                          <a
                            key={item.id}
                            href={`#${item.id}`}
                            className="rounded-sm border border-primary-navy/10 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-primary-navy/60 hover:text-accent-gold"
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
          </div>
        </div>

        {/* Twin image panel */}
        <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={200}>
          <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
            <div className="relative h-[360px] bg-primary-navy lg:col-span-6 lg:h-[460px]">
              <Image
                src="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
                alt="Real estate"
                fill
                className="object-cover opacity-90"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-8 left-6 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">REIT</p>
                <p className="mt-3 text-2xl font-medium">Real estate investment trust</p>
              </div>
            </div>

            <div className="relative h-[360px] bg-primary-navy lg:col-span-6 lg:h-[460px]">
              <Image
                src="https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg"
                alt="Infrastructure"
                fill
                className="object-cover opacity-90"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent" aria-hidden="true" />
              <div className="absolute bottom-8 left-6 text-white">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">InvIT</p>
                <p className="mt-3 text-2xl font-medium">Infrastructure investment trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-24 lg:py-32" aria-label="REIT and InvIT content">
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
                        href="/alternative-investment-fund"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Alternative investment funds <span className="text-accent-gold">→</span>
                      </Link>
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Services hub <span className="text-accent-gold">→</span>
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
                    Business trusts under SEBI
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed text-primary-navy/60">{parsed.intro}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="bg-primary-navy/10 p-px">
                      <div className="bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          What we cover
                        </p>
                        <div className="mt-6 space-y-4">
                          {[
                            "Oversight under regulatory framework",
                            "Unit holder meetings + records",
                            "Investor relationship activity",
                            "Annual administration",
                          ].map((t) => (
                            <div key={t} className="flex items-start gap-4">
                              <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                              <p className="text-sm leading-relaxed text-primary-navy/70">{t}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-8 h-px w-16 bg-accent-gold" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="services" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Service coverage">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Coverage
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    Services across the lifecycle
                  </h2>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px lg:grid-cols-2">
                    {phases.map((phase) => (
                      <div key={phase.key} className="bg-white p-10">
                        <div className="flex items-center justify-between gap-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                            Phase {phase.number}
                          </p>
                          <span className="h-px w-16 bg-accent-gold" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                          {phase.title}
                        </h3>
                        <div className="mt-8 space-y-4">
                          {phase.items.map((item) => (
                            <div key={item} className="flex items-start gap-4 border border-primary-navy/10 bg-primary-navy/[0.01] px-5 py-4">
                              <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                              <p className="text-sm leading-relaxed text-primary-navy/70">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section id="participants" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Participants">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Participants
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    A common platform
                  </h2>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
                    <div className="bg-primary-navy p-10 text-white lg:col-span-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                        Coordination
                      </p>
                      <p className="mt-6 text-2xl font-medium leading-tight">
                        One framework
                        <br />
                        for many actors.
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-white/70">
                        We help set up the operational framework and reporting cadence across all participants.
                      </p>

                      <div className="mt-10 flex flex-col gap-px bg-white/20 p-px">
                        <Link
                          href="/contact"
                          className="bg-accent-gold px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy hover:bg-white transition-all flex items-center justify-center gap-3"
                        >
                          Contact us <span aria-hidden="true">→</span>
                        </Link>
                        <Link
                          href="/investor"
                          className="bg-white/5 px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center"
                        >
                          Investor relations
                        </Link>
                      </div>
                    </div>

                    <div className="bg-white p-0 lg:col-span-7">
                      <div className="grid grid-cols-2 gap-px bg-primary-navy/10">
                        {[
                          { label: "Sponsor(s)", desc: "Trust sponsor / asset origination" },
                          { label: "Investors", desc: "Unit holders" },
                          { label: "Investment manager", desc: "Day-to-day management" },
                          { label: "Principal valuer", desc: "Valuation and reporting" },
                          { label: "Project manager", desc: "Execution / maintenance" },
                          { label: "Stock exchange", desc: "Listing + disclosures" },
                          { label: "Trustee", desc: "Beacon oversight" },
                          { label: "Common platform", desc: "Process + cadence" },
                        ].map((p) => (
                          <div key={p.label} className="bg-white p-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              Node
                            </p>
                            <p className="mt-4 text-lg font-medium leading-tight text-primary-navy">
                              {p.label}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                              {p.desc}
                            </p>
                            <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {parsed.alsoOffer.length > 0 && (
                <section id="also" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="We also offer">
                  <div className="border-b border-primary-navy/10 pb-6">
                    <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                      We also offer
                    </span>
                    <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                      Related regulated services
                    </h2>
                  </div>

                  <div className="mt-12 bg-primary-navy/10 p-px">
                    <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                      {parsed.alsoOffer.slice(0, 6).map((item) => {
                        const href = mapToInternalHref(item.href);
                        const isInternal = href.startsWith("/");

                        const card = (
                          <>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                              Explore
                            </p>
                            <p className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                              {item.label}
                            </p>
                            <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                              Open <span className="text-accent-gold">→</span>
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
                              {card}
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
                            {card}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

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
                            <h3 className="text-2xl font-medium leading-tight text-primary-navy">{o.office}</h3>
                            <span className="h-px w-16 bg-accent-gold" aria-hidden="true" />
                          </div>

                          <div className="mt-8 grid grid-cols-1 gap-px bg-primary-navy/10 sm:grid-cols-2">
                            {o.people.map((p) => (
                              <div key={`${o.office}-${p.phone}`} className="bg-white p-7">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                                  Contact
                                </p>
                                <p className="mt-3 text-lg font-semibold text-primary-navy">{p.name}</p>
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
