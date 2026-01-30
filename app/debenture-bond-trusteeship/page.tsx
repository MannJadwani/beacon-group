import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

// Hardcoded data extracted from content/debenture-bond-trusteeship/index.md
const pageData = {
  title: "Debenture / Bond Trustee",
  intro:
    "As a Debenture Trustee, Beacon Trusteeship plays a pivotal role in protecting the interests of debenture holders/bondholders and acting as an efficacious intermediary liaison between the investors & the debenture/bond issuer. We specialize in various disciplines of debenture trustee services in India. A testimonial to this is the fact that we were ranked by Prime Database as No. 2 Debenture Trustee of our nation for the most debenture issues handled in the F.Y. 2020. Our work scope broadly encapsulates advising the issuer for modes of security creation, ensuring timely creation & perfection of charge on such security, monitoring asset coverage & ensuring compliance with applicable regulations, acts, rules, terms of issue & covenants throughout the currency of such debenture/bond issue.",
  sections: [
    {
      id: "at-beacon-trusteeship-we-strive-to-assure",
      title: "At Beacon Trusteeship, we strive to assure",
      bullets: [
        "Assistance to Issuer in Security Creation.",
        "Ensuring timely registration of charge with ROC, CERSAI & Information Utility.",
        "Verifying Title & Valuation of Security / Collateral offered.",
        "Retention of Security & continuous monitoring of asset cover.",
        "Follow up for timely interest payments & principal redemption.",
        "Meticulous compliance with Listing Agreement, SEBI Regulations, Companies Act, 2013 & applicable Rules, Notifications & Circulars as issued/amended from time to time.",
        "Prompt response to Investor Grievances.",
        "Proactive security enforcement as per terms of Trust Deed &/or instructions of debenture holders while adhering to applicable laws & regulations.",
        "Effectual communication to & fro with Stock Exchange, Depository & Credit Rating Agencies.",
      ],
    },
    {
      id: "being-a-one-stop-debenture-trustee",
      title: "Being a one-stop Debenture Trustee to our clients, we also offer",
      bullets: [
        "Advisory for structuring debt instruments.",
        "Drafting & Vetting of Transaction Documents.",
        "Assistance applying for dematerialization of securities with Depository.",
        "Assistance in acquiring listing approval from Stock Exchanges",
        "Set up of Escrow Accounts & cash flows mechanism.",
        "Safe Custody & digitisation of Documents.",
        "Automated MIS & crucial Milestone Reports as per client's needs.",
      ],
    },
    {
      id: "benefit-to-debenture-bond-issuer",
      title: "Benefit to Debenture / Bond Issuer",
      bullets: [
        "Freedom to allocate crucial resources – time, money & manpower, in core business activities.",
        "Single contact point for any communication to be made to or consent to be taken from debenture/bond holders.",
        "Structured road map to having a compliant debt issue.",
        "360-degree outlook on various applicable laws & regulations.",
      ],
    },
    {
      id: "benefit-to-debenture-bond-holders",
      title: "Benefit to Debenture / Bond Holders",
      bullets: [
        "Timely updates on Interest Payments, Principal Redemption & Asset Cover maintenance among many other crucial aspects of the debt issue.",
        "Single point of contact for communicating all Investor Grievances & Queries.",
        "Expeditious & Effective security enforcement as per terms of Trust Deed &/or instructions of debenture holders while maintaining adherence to applicable laws & regulations.",
        "Investor Education w.r.t. applicable legal & regulatory avenues.",
      ],
    },
  ],
  alsoOffer: [
    { label: "Listed Non-Convertible Debenture (NCD) / Bond / Municipal Bond Trustee", href: "/debenture-bond-trusteeship" },
    { label: "Alternative Investment Funds", href: "/alternative-investment-fund" },
    { label: "Securitization: Securitized Debt Instruments (SDIs)", href: "/securitization-trustee" },
    { label: "REIT & InvIT", href: "/reit-invit" },
    { label: "Escrow Services: Fractional Shares Escrow", href: "/escrow-fractional-regulated" },
    { label: "Escrow Services: Investor Protection Fund Escrow", href: "/escrow-ipef-regulated" },
    { label: "ESOP (For Listed Shares)", href: "/esop-regulated" },
    { label: "Share Pledge Trustee (For Listed Shares)", href: "/share-pledge-trustee-regulated" },
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
      people: [{ name: "Kamal Paul", role: "Associate Vice President", phone: "+91 7208967004" }],
    },
    {
      office: "Hyderabad Office",
      people: [{ name: "Paul Samuel", role: "Regional Head - AP & Telangana", phone: "+91 9848805576" }],
    },
    {
      office: "Bangalore Office",
      people: [{ name: "Deepak Kulkarni", role: "Senior Manager", phone: "+91 9136929255" }],
    },
    {
      office: "Chennai Office",
      people: [{ name: "Sunil Menon", role: "Senior Manager", phone: "+91 7208967017" }],
    },
  ],
};

export default function DebentureBondTrusteeshipPage() {
  const { title, intro, sections, alsoOffer, offices } = pageData;

  const nav = [
    { id: "overview", label: "Overview" },
    ...sections.map((s) => ({ id: s.id, label: s.title })),
    { id: "contacts", label: "Contacts" },
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label={title}>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
            alt="Debenture trustee background"
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
                Debenture
                <br />
                <span className="text-accent-gold">Trustee</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {intro}
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
                    Trustee mandate
                  </p>
                  <h2 className="mt-5 text-2xl font-medium leading-tight text-white">
                    Structured oversight across listed debt issuances.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    We ensure charge creation, compliance monitoring, and responsive investor
                    communication for listed debentures and bonds.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3">
                    {[
                      { label: "Ranking", value: "#2 DT (FY20)" },
                      { label: "Coverage", value: "Listed debt" },
                      { label: "Scope", value: "Security + Compliance" },
                      { label: "Mode", value: "Pan-India" },
                    ].map((stat) => (
                      <div key={stat.label} className="border border-white/10 bg-white/5 px-4 py-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                          {stat.label}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-white/80">
                          {stat.value}
                        </p>
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

      <section className="bg-white py-24 lg:py-32" aria-label="Debenture trustee content">
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
                        href="/security-trustee-services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Security trustee <span className="text-accent-gold">→</span>
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
                    Debenture trustee
                    <br />
                    responsibilities.
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed text-primary-navy/60">
                      {intro}
                    </p>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="bg-primary-navy/10 p-px">
                      <div className="bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Typical oversight
                        </p>
                        <div className="mt-6 grid grid-cols-1 gap-3">
                          {["Charge creation", "Asset cover", "Listing compliance", "Investor protection"].map((t) => (
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
                      <Link
                        key={link.href}
                        href={link.href}
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
                      </Link>
                    ))}
                  </div>
                </div>
              </section>

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
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
