import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type SplitBullets = {
  id: string;
  title: string;
  bullets: string[];
};

type ContactPerson = {
  name: string;
  role: string;
  phone: string;
};

type OfficeContacts = {
  office: string;
  people: ContactPerson[];
};

const securityTrusteeData = {
  title: "Security Trustee",
  introBlocks: [
    "As a Security Trustee, Beacon Trusteeship acts as a non-partisan fiduciary person, holding in good faith & trust, a security for the benefit of Banks, NBFCs, Financial Institutions & other types of Lenders. A Security Trustee in India acts as a Trustee to a Trust set up through a legally valid, binding & enforceable Security Trustee Agreement (STA) executed between the Security Trustee, Borrower(s) & Lender(s).",
    "Beacon Trusteeship specializes in providing feasible & meaningful customer-centric solutions to its clients, the Borrowers & Lenders. The domain of these solutions broadly envisages advising Borrower & any Third Party security providers on charge creation, monitoring various intricate terms of facilities extended by the Lender & hosting a hassle-free loan sell-down, assignment of facilities, refinance, top-up etc.",
    "Borrowers intending to raise funds for Capex Finance, Working Capital, Real Estate Projects, Infrastructure Projects belonging to crucial sectors like Power, Roads, Railways, Airports, Ports, Telecom, Pharmaceuticals, Steel Works etc. tend to raise such funds through a consortium of Lenders, the likes of which are Banks, NBFCs & Financial Institutions.",
    "Lenders, providing a cluster of facilities covering Term Loan, Working Capital, Cash Credit, Project Finance, Commercial Vehicle Finance, Equipment Finance, Loan against Securities etc. are most often secured by a charge on immovable &/or movable properties of the Borrower or any other Third Party.",
  ],
  sections: [
    {
      id: "benefits-to-lenders",
      title: "Benefits to the Lenders",
      bullets: [
        "Easy expedition of loan sell-down or divestment to incumbent incoming Lenders with minimal documentation",
        "Enabling Banks to benefit from Pledge of Shares in Borrower Company & correspondingly comply with restrictions as imposed by The Banking Regulation Act, 1949",
        "Ensuring compliance with disclosure requirements as under SEBI (Substantial Acquisition of Shares and Takeovers) Regulations, 2011",
        "Timely updates on Interest Payments, Principal Redemption & Asset Cover maintenance alongside many other crucial terms of the facilities sanctioned",
        "360 degree outlook on applicable laws & regulations to render a fruitful direction",
      ],
    },
    {
      id: "benefits-to-borrowers",
      title: "Benefits to the Borrowers",
      bullets: [
        "Single point of contact for communication to & fro with multiple or consortium of Lenders",
        "Savings on Stamp Duty which would have been incurred for the execution of documents with multiple Lenders in absence of Security Trustee",
        "Enabling allocation of crucial resources – time, money & manpower, for core business activities",
        "Start-to-end Assistance in charge registration with ROC, CERSAI & other Information Utilities",
        "Assistance in complying with terms as set by Lenders for facilities sanctioned",
      ],
    },
    {
      id: "services-offered",
      title: "Services Offered",
      bullets: [
        "Assistance to Borrower in Security Creation",
        "Ensuring timely registration of charge with ROC, CERSAI & Information Utility",
        "Verifying Title & Valuation of Security / Collateral offered",
        "Retention of Security & continuous monitoring of asset cover",
        "Follow up for timely interest payments & principal redemption",
        "Meticulous compliance with terms of sanction & agreements executed",
        "Prompt response to Lender Grievances",
        "Proactive security enforcement as per terms of agreement &/or instructions of Lenders while maintaining adherence to applicable laws & regulations",
        "Effectual communication to & fro with all stakeholders involved",
      ],
    },
    {
      id: "one-stop-trustee",
      title: "Being a one-stop Security Trustee to our clients, we also offer",
      bullets: [
        "Drafting & Vetting of Transaction Documents",
        "Set up of Escrow Accounts & cash flows mechanism",
        "Safe Custody & digitisation of valuable documents, Title Deeds, etc.",
        "Automated MIS & crucial Milestone Reports as per client's needs",
        "Enabling Pledge Physical & Demat mode alongside disclosures as per SEBI SAST Regulations",
        "Periodic monitoring of Cash Flows from Real Estate Projects",
        "Comfort to execute documents on a pan India basis",
      ],
    },
  ] as SplitBullets[],
  alsoOffer: [
    { label: "Family Office / Family Trust", href: "https://beacontrustee.co.in/family-trust" },
    { label: "Escrow Agent /Source Code Escrow /M&A /Settlement Escrow", href: "https://beacontrustee.co.in/escrow-monitoring-agency" },
    { label: "Security Trustee", href: "https://beacontrustee.co.in/security-trustee-services" },
    { label: "Facility Agent", href: "https://beacontrustee.co.in/facility-agent" },
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
  ] as OfficeContacts[],
};

export default function SecurityTrusteeServicesPage() {
  const { title, introBlocks, sections, alsoOffer, offices } = securityTrusteeData;

  const nav = [
    { id: "overview", label: "Overview" },
    ...sections.map((s) => ({ id: s.id, label: s.title })),
    ...(offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  // Visual matrix: build a list of "use cases" from intro blocks (fallback) and section headings.
  const useCases = [
    "Consortium lending",
    "Project finance",
    "Loan sell-down",
    "Refinance / top-up",
    "Charge registration",
    "Asset cover monitoring",
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      {/* Hero - "Collateral map" (more visual) */}
      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label={title}>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
            alt="Security Trustee background"
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/70 to-primary-navy" />
        </div>

        {/* Vertical grid lines */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-5" aria-hidden="true">
          <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-x border-white h-full" />
            ))}
          </div>
        </div>

        {/* Topographic dots */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(214,178,110,0.55) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />

        <div className="wrapper relative z-10 px-5 pb-10 pt-32 lg:px-20 lg:pb-16 lg:pt-40">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  Service Detail
                </span>
              </div>

              <h1 className="mt-8 font-sans text-[52px] font-black leading-[0.86] tracking-tighter uppercase md:text-[80px] lg:text-[104px]">
                Security
                <br />
                <span className="text-accent-gold">Trustee</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                Beacon Trusteeship acts as a non-partisan fiduciary holding security for the benefit of lenders, across structured and consortium facilities.
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
              {/* Unique visual component: collateral network */}
              <div className="bg-white/10 p-px">
                <div className="bg-primary-navy/60 p-8 lg:p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                    Collateral map
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: "Borrower", tone: "bg-white/10" },
                        { label: "Lenders", tone: "bg-white/10" },
                        { label: "Security", tone: "bg-white/10" },
                      ].map((node) => (
                        <div
                          key={node.label}
                          className={`relative overflow-hidden border border-white/10 ${node.tone} px-4 py-4`}
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                            {node.label}
                          </p>
                          <div className="mt-4 h-px w-full bg-white/10" />
                          <div className="mt-3 flex items-center justify-between">
                            <span className="size-2 bg-accent-gold" aria-hidden="true" />
                            <span className="size-2 bg-white/30" aria-hidden="true" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {useCases.map((c) => (
                        <div key={c} className="border border-white/10 bg-white/5 px-4 py-4">
                          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/65">
                            {c}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="border border-white/10 bg-white/5 px-6 py-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
                        Output
                      </p>
                      <p className="mt-3 text-lg font-medium leading-tight text-white">
                        Single point of contact + simplified documentation
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-white/70">
                        Supporting charge creation, monitoring, reporting, and smooth changes in lender composition.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-px bg-white/20 p-px" aria-label="On page navigation">
                {nav.slice(0, 3).map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex-1 bg-white/5 px-6 py-4 text-center text-[10px] font-black uppercase tracking-[0.35em] text-white/70 hover:bg-white/10"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 border-t border-white/10 bg-primary-navy/90 backdrop-blur-xl">
          <div className="wrapper grid grid-cols-1 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
            {[
              { label: "Stakeholders", value: "Borrower / Lenders" },
              { label: "Security", value: "Movable + immovable" },
              { label: "Registers", value: "ROC / CERSAI" },
              { label: "Mode", value: "Pan-India" },
            ].map((stat) => (
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

      {/* Content */}
      <section className="bg-white py-24 lg:py-32" aria-label="Security trustee services content">
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
                        href="/services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        SEBI regulated services <span className="text-accent-gold">→</span>
                      </Link>
                      <Link
                        href="/unregulated-services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Unregulated services <span className="text-accent-gold">→</span>
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
                    What a security trustee does
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <div className="space-y-6">
                      {introBlocks.slice(0, 3).map((p) => (
                        <p key={p} className="text-lg leading-relaxed text-primary-navy/60">
                          {p}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="bg-primary-navy/10 p-px">
                      <div className="bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Typical coverage
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-3">
                          {[
                            "Term loan / working capital",
                            "Project finance",
                            "Loan against securities",
                            "Capex facilities",
                          ].map((t) => (
                            <div key={t} className="flex items-start gap-4 border border-primary-navy/10 bg-primary-navy/[0.01] px-5 py-4">
                              <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                              <p className="text-sm leading-relaxed text-primary-navy/70">{t}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Sections */}
              <div className="mt-24 space-y-24" aria-label="Sections">
                {sections.map((sec) => (
                  <section
                    key={sec.id}
                    id={sec.id}
                    className="scroll-mt-28"
                    data-aos="fade-up"
                    aria-label={sec.title}
                  >
                    <div className="border-b border-primary-navy/10 pb-6">
                      <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                        <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                        Section
                      </span>
                      <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                        {sec.title}
                      </h2>
                    </div>

                    <div className="mt-12 bg-primary-navy/10 p-px">
                      <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                        {sec.bullets.map((b, idx) => (
                          <div key={`${b}-${idx}`} className="bg-white p-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              Item {String(idx + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-primary-navy/70">
                              {b}
                            </p>
                            <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

              {/* Also offer */}
              {alsoOffer.length > 0 && (
                <section className="mt-24" data-aos="fade-up" aria-label="We also offer">
                  <div className="border-b border-primary-navy/10 pb-6">
                    <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                      We also offer
                    </span>
                    <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                      Related services
                    </h2>
                  </div>

                  <div className="mt-12 bg-primary-navy/10 p-px">
                    <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                      {alsoOffer.slice(0, 6).map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group bg-white p-8 transition-colors hover:bg-primary-navy hover:text-white"
                        >
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                            Explore
                          </p>
                          <p className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                            {link.label}
                          </p>
                          <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                            Open <span className="text-accent-gold">→</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Contacts */}
              {offices.length > 0 && (
                <section id="contacts" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Contacts">
                  <div className="border-b border-primary-navy/10 pb-6">
                    <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                      Contacts
                    </span>
                    <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                      Office contacts
                    </h2>
                  </div>

                  <div className="mt-12 space-y-10">
                    {offices.map((o) => (
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
                                <p className="mt-2 text-sm text-primary-navy/60">
                                  {p.role}
                                </p>
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
