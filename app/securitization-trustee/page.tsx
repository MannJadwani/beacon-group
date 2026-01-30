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

// Hardcoded data for Securitization Trustee page
const SECURITIZATION_DATA = {
  title: "Securitization Trustee",
  intro: "Securitization is a structured mechanism utilized & envisaged by Banks, NBFCs & Financial Institutions, as a ring-fenced & bankruptcy remote sale of a financial asset or a pool of such homogenous assets (Asset Pool) in return for immediate cash payments. It is an effective method actively used by Non-Banking Finance Companies (NBFCs), Housing Finance Companies (HFCs) & Microfinance Companies (MFCs), to cash-in on illiquid assets in order to enable finance of future lending activities at an economic cost of funds. In Securitization, the underlying asset pool is transferred to a Special Purpose Vehicle (SPV) which in turn issues securities known as Pass Through Certificates (PTCs) to the Investors, mostly Banks, in exchange of incoming cash investment. While globally SPVs are set up in different forms, SPVs in India are largely set up as Trust. We act as Trustee to the said SPV. We act as a Securitization Trustee for transactions involving.",
  coverage: ["Asset Backed Securitization (ABS)", "Mortgage Backed Securitization (MBS)", "Micro Credit Backed Securitization"],
  sections: [
    {
      id: "as-a-securitization-trustee",
      title: "As a Securitization Trustee, we assist you in",
      bullets: [
        "Drafting & Vetting of Legal Documents.",
        "Compliance with RBI Guidelines and SEBI Guidelines.",
        "Regular analysis of Servicer reports.",
        "Ensuring timely and accurate payouts.",
        "Co-ordination amongst Originators, Arrangers, Legal Counsels, Investors, Servicers, Bankers & Rating Agencies among others.",
        "Credit enhancement/liquidity facility invocation (in case of shortfall) as per RBI Guidelines.",
        "Enabling smooth flow of proceeds from Investors to the Originator.",
        "Quarterly Audit for various trusts along with issuance of TDS certificates to the beneficiaries wherever TDS implications are involved.",
        "Monitoring the credit enhancement as stipulated by the rating agency.",
        "Periodic (monthly / quarterly reports) along with future cash flows factoring prepayments to the investor, originator & rating agency.",
        "Prompt response to Investor queries & clarifications sought.",
        "Redemption of the PTCs on completion of the payouts"
      ]
    },
    {
      id: "benefits",
      title: "Benefits to Originators & Investors",
      bullets: [
        "Our inputs on transaction structure/ Information Memorandum along with detailed financial modelling. Expeditious work flow to achieve time efficient:",
        "Execution of legal documents",
        "Trust set-up & due diligence",
        "Issuance of PTCs in physical & dematerialized",
        "Opening & management of Collection & Payout Account",
        "In-house system generated reports for:",
        "Servicer",
        "Originator",
        "Credit Enhancement",
        "Collections & Payout Account",
        "TDS Compliance & Certificates",
        "Timely reminders to ensure compliance with periodic reports to be submitted."
      ]
    }
  ] as SplitBullets[],
  alsoOffer: [
    { label: "Listed Non-Convertible Debenture (NCD) / Bond / Municipal Bond Trustee", href: "/debenture-bond-trusteeship" },
    { label: "Alternative Investment Funds", href: "/alternative-investment-fund" },
    { label: "Securitization: Securitized Debt Instruments (SDIs)", href: "/securitization-trustee" },
    { label: "REIT & InvIT", href: "/reit-invit" },
    { label: "Escrow Services: Fractional Shares Escrow", href: "/escrow-fractional-regulated" },
    { label: "Escrow Services: Investor Protection Fund Escrow", href: "/escrow-ipef-regulated" },
    { label: "ESOP (For Listed Shares)", href: "/esop-regulated" },
    { label: "Share Pledge Trustee (For Listed Shares)", href: "/share-pledge-trustee-regulated" }
  ],
  offices: [
    {
      office: "Mumbai Office",
      people: [
        { name: "Jaydeep Bhattacharya", role: "Executive Director", phone: "+91 9324724949" },
        { name: "Veena Nautiyal", role: "Associate Director", phone: "+91 9324724945" },
        { name: "Deepavali Vankalu", role: "Vice President", phone: "+91 9324724944" }
      ]
    },
    {
      office: "Delhi Office",
      people: [{ name: "Kamal Paul", role: "Associate Vice President", phone: "+91 7208967004" }]
    },
    {
      office: "Hyderabad Office",
      people: [{ name: "Paul Samuel", role: "Regional Head - AP & Telangana", phone: "+91 9848805576" }]
    },
    {
      office: "Bangalore Office",
      people: [{ name: "Deepak Kulkarni", role: "Senior Manager", phone: "+91 9136929255" }]
    },
    {
      office: "Chennai Office",
      people: [{ name: "Sunil Menon", role: "Senior Manager", phone: "+91 7208967017" }]
    }
  ] as OfficeContacts[]
};

export default function SecuritizationTrusteePage() {
  const { title, intro, coverage, sections, alsoOffer, offices } = SECURITIZATION_DATA;

  const nav = [
    { id: "overview", label: "Overview" },
    ...sections.map((s) => ({ id: s.id, label: s.title })),
    ...(offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label={title}>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg"
            alt="Securitization trustee background"
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
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(214,178,110,0.55) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />

        <div className="wrapper relative z-10 px-5 pb-10 pt-32 lg:px-20 lg:pb-16 lg:pt-40">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  SEBI regulated service
                </span>
              </div>

              <h1 className="mt-8 font-sans text-[52px] font-black leading-[0.86] tracking-tighter uppercase md:text-[80px] lg:text-[104px]">
                Securitization
                <br />
                <span className="text-accent-gold">Trustee</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {intro ||
                  "Beacon Trusteeship structures and administers securitization SPVs, enabling compliant transfers and transparent reporting across originators and investors."}
              </p>

              <div className="mt-10 flex flex-col gap-px bg-white/20 p-px sm:flex-row sm:max-w-xl" data-aos="fade-up" data-aos-delay={300}>
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
              <div className="bg-white/10 p-px">
                <div className="bg-primary-navy/70 p-8 lg:p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                    Coverage
                  </p>
                  <h2 className="mt-5 text-2xl font-medium leading-tight text-white">
                    SPV trustee oversight for securitized debt.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    We support ABS, MBS, and micro-credit securitization workflows with compliance and payout governance.
                  </p>
                  <div className="mt-8 grid grid-cols-1 gap-3">
                    {(coverage.length > 0
                      ? coverage
                      : ["Asset Backed Securitization (ABS)", "Mortgage Backed Securitization (MBS)", "Micro Credit Backed Securitization"]
                    ).map((item) => (
                      <div key={item} className="border border-white/10 bg-white/5 px-4 py-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Asset pool</p>
                        <p className="mt-2 text-sm font-semibold text-white/80">{item}</p>
                      </div>
                    ))}
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
      </section>

      <section className="bg-white py-24 lg:py-32" aria-label="Securitization trustee content">
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
                        href="/debenture-bond-trusteeship"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Debenture trustee <span className="text-accent-gold">→</span>
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
                    How securitization
                    <br />
                    trusteeship works.
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed text-primary-navy/60">{intro}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="bg-primary-navy/10 p-px">
                      <div className="bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Trustee focus
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-3">
                          {["PTC issuance", "Payout monitoring", "Servicer reports", "Credit enhancement"].map((t) => (
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
                          <div key={`${sec.id}-${idx}`} className="bg-white p-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              Item {String(idx + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-primary-navy/70">{b}</p>
                            <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

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
                      {alsoOffer.slice(0, 6).map((link) => {
                        const href = link.href;
                        const isExternal = href.startsWith("http");

                        return (
                          <a
                            key={link.href}
                            href={href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noopener noreferrer" : undefined}
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
                        );
                      })}
                    </div>
                  </div>
                </section>
              )}

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
