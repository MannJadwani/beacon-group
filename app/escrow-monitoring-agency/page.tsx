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

type ParsedEscrow = {
  title: string;
  intro: string;
  useCases: string[];
  services: string[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
};

const escrowData: ParsedEscrow = {
  title: "Escrow Agent / Source Code Escrow / M&A / Settlement Escrow",
  intro: "Escrow Agent is an independent third party capable of holding assets – funds, securities, movables, etc., on behalf of two or more transacting parties. The appointment & scope of work of an Escrow Agent is broadly described in an Escrow Agreement executed by & amongst the Escrow Agent & the transacting parties.",
  useCases: [
    "Timely Debt Servicing",
    "Business Acquisition",
    "Private Equity Transactions",
    "Retention of Securities",
    "Disputed Liabilities",
    "P2P Platforms",
    "Online Gaming & Shopping Platforms",
    "E-Commerce transactions",
    "International Trade & Export Finance",
    "Loan Against Securities",
  ],
  services: [
    "Drafting & Vetting of Escrow Agreement",
    "Set up of Escrow Mechanism envisaging future cash flows & waterfall disbursement",
    "Adept documentation & synergizing of Escrow Mechanism with terms of sanctioned facilities",
    "Expeditious opening & management of Escrow Current Account with Banks for retention of funds",
    "Escrow Demat Account with Depositories for retention of securities",
    "Ensuring smooth flow of funds to & fro Escrow Account",
    "Meticulous adherence to extant covenants, provisions & T&Cs of the Escrow Agreement",
    "Monitoring of Fund Movement",
    "Ensuring maintenance of Debt Service Reserve Amount (DSRA)",
    "Periodic/Daily valuation & monitoring of securities",
    "Release of assets post assurance due diligence & compliance of extant terms",
  ],
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
  ],
};

export default function EscrowMonitoringAgencyPage() {
  const parsed = escrowData;

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "use-cases", label: "Use Cases" },
    { id: "services", label: "Services" },
    ...(parsed.offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy font-sans">
      <BricknetHeader variant="white" />

      {/* Hero: Stark, typographic, split layout */}
      <section className="relative pt-[120px] pb-24 lg:pt-[180px] bg-white border-b border-black/10">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-end">
            <div className="lg:col-span-8">
              <div className="flex items-center gap-4 mb-8">
                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] border border-primary-navy/20 text-primary-navy">
                  Unregulated Service
                </span>
                <span className="h-px w-12 bg-primary-navy/20"></span>
              </div>
              
              <h1 className="text-6xl lg:text-[100px] leading-[0.9] font-black uppercase tracking-tighter text-primary-navy">
                Escrow <br/>
                <span className="text-primary-navy/20">Agent.</span>
              </h1>
            </div>
            
            <div className="lg:col-span-4">
               <p className="text-lg leading-relaxed font-medium text-primary-navy/80 mb-8 border-l-2 border-accent-gold pl-6">
                 {parsed.intro || "Independent holding mechanism for funds and assets between transacting parties."}
               </p>
               <div className="flex flex-col gap-2">
                  <Link href="/contact" className="inline-flex items-center justify-between px-6 py-4 bg-primary-navy text-white hover:bg-accent-gold hover:text-primary-navy transition-colors group">
                     <span className="text-xs font-bold tracking-[0.2em] uppercase">Initiate Setup</span>
                     <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout: Sticky Index + Ledger Content */}
      <section className="relative">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 border-l border-r border-black/5 min-h-screen">
            
            {/* Sidebar: Sticky Index */}
            <aside className="hidden lg:block lg:col-span-3 border-r border-black/5">
              <div className="sticky top-32 py-12 px-8">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary-navy/40 mb-8">
                  Index
                </span>
                <nav className="flex flex-col gap-4">
                  {nav.map(item => (
                    <a 
                      key={item.id} 
                      href={`#${item.id}`}
                      className="text-sm font-semibold text-primary-navy/60 hover:text-primary-navy transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content Column */}
            <div className="lg:col-span-9">
              
              {/* Overview Section */}
              <div id="overview" className="border-b border-black/5 py-24 px-5 lg:px-16 scroll-mt-20">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold mb-6">
                  01 / Overview
                </span>
                <h2 className="text-3xl lg:text-5xl font-medium leading-tight text-primary-navy mb-12 max-w-3xl">
                  A neutral third party holding assets until conditions are met.
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/5 border border-black/5">
                   <div className="bg-white p-8">
                      <span className="block text-4xl font-black text-black/10 mb-4">01</span>
                      <h3 className="text-lg font-bold mb-2">Agreement</h3>
                      <p className="text-sm text-primary-navy/60">Defined conditions for release.</p>
                   </div>
                   <div className="bg-white p-8">
                      <span className="block text-4xl font-black text-black/10 mb-4">02</span>
                      <h3 className="text-lg font-bold mb-2">Retention</h3>
                      <p className="text-sm text-primary-navy/60">Secure holding of funds/assets.</p>
                   </div>
                   <div className="bg-white p-8">
                      <span className="block text-4xl font-black text-black/10 mb-4">03</span>
                      <h3 className="text-lg font-bold mb-2">Release</h3>
                      <p className="text-sm text-primary-navy/60">Execution upon trigger events.</p>
                   </div>
                </div>
              </div>

              {/* Use Cases: Ticker List */}
              <div id="use-cases" className="border-b border-black/5 py-24 px-5 lg:px-16 scroll-mt-20">
                <div className="flex items-baseline justify-between mb-12">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold">
                    02 / Applications
                  </span>
                  <span className="text-sm font-semibold text-primary-navy/40 tabular-nums">
                    {parsed.useCases.length} items
                  </span>
                </div>

                <div className="flex flex-wrap gap-3">
                  {parsed.useCases.map((useCase, idx) => (
                    <span 
                      key={idx} 
                      className="inline-block px-4 py-3 border border-primary-navy/10 text-sm font-medium text-primary-navy hover:bg-primary-navy hover:text-white transition-colors cursor-default"
                    >
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

              {/* Services: Ledger Rows */}
              <div id="services" className="border-b border-black/5 py-24 px-5 lg:px-16 scroll-mt-20 bg-primary-navy/5">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold mb-12">
                  03 / Scope of Work
                </span>
                
                <div className="border-t border-primary-navy/10">
                  {parsed.services.map((service, idx) => (
                    <div key={idx} className="group border-b border-primary-navy/10 py-6 flex items-start gap-6 hover:bg-white transition-colors px-4 -mx-4">
                      <span className="text-xs font-mono text-primary-navy/30 pt-1">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-lg font-medium text-primary-navy group-hover:translate-x-2 transition-transform">
                        {service}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contacts: Simple Grid */}
              {parsed.offices.length > 0 && (
                <div id="contacts" className="py-24 px-5 lg:px-16 scroll-mt-20">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-accent-gold mb-12">
                    04 / Locations
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {parsed.offices.map((office, idx) => (
                      <div key={idx}>
                        <h3 className="text-xl font-bold mb-6 border-b border-black/10 pb-4">{office.office}</h3>
                        <div className="space-y-6">
                          {office.people.map((p, pIdx) => (
                            <div key={pIdx}>
                              <p className="font-semibold text-primary-navy">{p.name}</p>
                              <p className="text-xs text-primary-navy/50 uppercase tracking-wider mb-1">{p.role}</p>
                              <a href={`tel:${p.phone.replace(/\s+/g, "")}`} className="text-sm font-mono text-primary-navy hover:text-accent-gold border-b border-transparent hover:border-accent-gold transition-colors">
                                {p.phone}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
