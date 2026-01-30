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

// Hardcoded data for Escrow Fractional page
const ESCROW_DATA = {
  title: "Escrow Services",
  intro: "Escrow Agent is an independent third party capable of holding assets – funds, securities, movables, etc., on behalf of two or more transacting parties. The appointment & scope of work of an Escrow Agent is broadly described in an Escrow Agreement executed by & amongst the Escrow Agent & the transacting parties. An Escrow Agent plays a crucial role in:",
  coverage: [
    "Timely Debt Servicing",
    "Business Acquisition",
    "Private Equity Transactions",
    "Retention of Securities",
    "Disputed Liabilities",
    "P2P Platforms",
    "Online Gaming & Shopping Platforms",
    "E-Commerce transactions",
    "International Trade & Export Finance",
    "Loan Against Securities"
  ],
  sections: [
    {
      id: "services",
      title: "As an Escrow Agent, Beacon Trusteeship offers the following services",
      bullets: [
        "Drafting & Vetting of Escrow Agreement",
        "Set up of Escrow Mechanism envisaging future cash flows & waterfall disbursement.",
        "Adept documentation & synergizing of Escrow Mechanism with terms of sanctioned facilities.",
        "Expeditious opening & management of:",
        "Escrow Current Account with Banks for retention of funds",
        "Escrow Demat Account with Depositories for retention of securities",
        "Ensuring smooth flow of funds to & fro Escrow Account",
        "Meticulous adherence to extant covenants, provisions & T&Cs of the Escrow Agreement",
        "Monitoring of Fund Movement",
        "Ensuring maintenance of Debt Service Reserve Amount (DSRA)",
        "Periodic/Daily valuation & monitoring of securities.",
        "Release of assets post assurance due diligence & compliance of extant terms."
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

export default function EscrowFractionalRegulatedPage() {
  const { title, intro, coverage, sections, alsoOffer, offices } = ESCROW_DATA;

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
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg"
            alt="Escrow services background"
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

              <h1 className="mt-8 font-sans text-[48px] font-black leading-[0.9] tracking-tighter uppercase md:text-[76px] lg:text-[98px]">
                Fractional
                <br />
                Shares
                <br />
                <span className="text-accent-gold">Escrow</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {intro ||
                  "Beacon Trusteeship acts as an independent escrow agent, safeguarding assets and enforcing escrow agreements for transactional confidence."}
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
                    Escrow focus
                  </p>
                  <h2 className="mt-5 text-2xl font-medium leading-tight text-white">
                    Fractional share transfers with governed release logic.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    We support issuer and investor protection by holding funds and securities until conditions are met.
                  </p>
                  <ul className="mt-8 grid grid-cols-1 gap-3 text-sm text-white/80">
                    {(coverage.length > 0 ? coverage : ["Fractional share transfers", "Marketplace settlements", "Loan against securities", "E-commerce transactions"]).map(
                      (item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 size-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
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

      <section className="bg-white py-24 lg:py-32" aria-label="Escrow services content">
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
                        href="/escrow-monitoring-agency"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Escrow & monitoring <span className="text-accent-gold">→</span>
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
                    Escrow agent
                    <br />
                    responsibilities.
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
                        Typical coverage
                      </p>
                      <ul className="mt-6 space-y-3 text-sm text-primary-navy/70">
                        {(coverage.length > 0 ? coverage.slice(0, 4) : ["Marketplace settlements", "Disputed liabilities", "Retention of securities", "Export finance"]).map(
                          (t) => (
                            <li key={t} className="flex items-start gap-3">
                              <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                              <span>{t}</span>
                            </li>
                          ),
                        )}
                      </ul>
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

                    <div className="mt-12">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {sec.bullets.map((b, idx) => (
                          <div key={`${sec.id}-${idx}`} className="border border-primary-navy/10 bg-white px-6 py-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              Item {String(idx + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-primary-navy/70">{b}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                ))}
              </div>

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

      {alsoOffer.length > 0 && (
        <section className="relative overflow-hidden bg-base-white py-24 lg:py-32" data-aos="fade-up" aria-label="Related services">
          <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
          <div className="wrapper relative px-5 lg:px-20">
            <div className="border-b border-primary-navy/10 pb-6">
              <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                Related services
              </span>
              <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                Explore nearby mandates
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Keep exploring regulated trustee services with similar oversight needs.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2" data-aos="fade-up" data-aos-delay={150}>
              {alsoOffer.slice(0, 6).map((link) => {
                const href = link.href;
                const isExternal = href.startsWith("http");

                return (
                  <a
                    key={link.href}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group border border-primary-navy/10 bg-white p-8 transition-all hover:border-accent-gold/40"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Related
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy group-hover:text-accent-gold">
                      {link.label}
                    </p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Open <span className="text-accent-gold">→</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
