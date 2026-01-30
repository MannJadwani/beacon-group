import Image from "next/image";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type DocItem = {
  label: string;
  url: string;
  kind: string;
  category: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const docs: DocItem[] = [
  { label: "Group Company Financials", url: "https://beacontrustee.co.in/wp-content/uploads/investor/8066_20241127155349_group_company_financials.pdf", kind: "PDF", category: "Group Company Financials" },
  { label: "Draft Red Herring Prospectus", url: "https://beacontrustee.co.in/wp-content/uploads/investor/3187_20241127171041_draft_red_herring_prospectus_beacon_(1).pdf", kind: "PDF", category: "Offer Documents" },
  { label: "Red Herring Prospectus", url: "https://beacontrustee.co.in/wp-content/uploads/investor/1921_20241127171147_red_herring_prospectus_(1).pdf", kind: "PDF", category: "Offer Documents" },
  { label: "Abridged Prospectus", url: "https://beacontrustee.co.in/wp-content/uploads/investor/1827_20241127171235_abridged_prospectus.pdf", kind: "PDF", category: "Offer Documents" },
  { label: "Prospectus", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4448_20241127171321_prospectus_beacon.pdf", kind: "PDF", category: "Offer Documents" },
  { label: "Materiality Resolution Litigation", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4411_20241127171401_board_resolution_materiality_litigation.pdf", kind: "PDF", category: "Materiality Resolution" },
  { label: "Materiality Resolution Group Companies", url: "https://beacontrustee.co.in/wp-content/uploads/investor/3936_20241127171527_board_resolution_materiality_resolution_group_companies_07_02_2024.pdf", kind: "PDF", category: "Materiality Resolution" },
  { label: "Materiality Resolution Lenders", url: "https://beacontrustee.co.in/wp-content/uploads/investor/3155_20241127171603_board_resolution_materiality_resolution_lenders_07_02_2024.pdf", kind: "PDF", category: "Materiality Resolution" },
  { label: "FY 2024-25", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4389_20250805105023_btl_annual_report_2024-25_compressed.pdf", kind: "PDF", category: "Annual Reports" },
  { label: "FY 2023-24", url: "https://beacontrustee.co.in/wp-content/uploads/investor/1460_20241127171844_financials_2023_24.pdf", kind: "PDF", category: "Annual Reports" },
  { label: "FY 2022-23", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4450_20241127171936_financials_2022_23.pdf", kind: "PDF", category: "Annual Reports" },
  { label: "FY 2021-22", url: "https://beacontrustee.co.in/wp-content/uploads/investor/8201_20241127172030_financials_2021_22.pdf", kind: "PDF", category: "Annual Reports" },
  { label: "FY 2020-21", url: "https://beacontrustee.co.in/wp-content/uploads/investor/7336_20241127172115_financials_2020_21.pdf", kind: "PDF", category: "Annual Reports" },
  { label: "Half Yearly Results 30th September, 2025", url: "https://beacontrustee.co.in/wp-content/uploads/investor/8134_20251113181859_beacon_outcome_of_board_meeting_13112025.pdf", kind: "PDF", category: "Half Yearly Results" },
  { label: "Half Yearly Results 31st March, 2025.", url: "https://beacontrustee.co.in/wp-content/uploads/investor/6738_20251111152554_beacon_24052025145320_btl_outcome_may_25.pdf", kind: "PDF", category: "Half Yearly Results" },
  { label: "Half Yearly Results 30th September, 2024.", url: "https://beacontrustee.co.in/wp-content/uploads/investor/9261_20251111153905_btl_outcome_&_financials_sep_24_signed.pdf", kind: "PDF", category: "Half Yearly Results" },
  { label: "Beacon Annual Return 2024-25 Form_MGT_7", url: "https://beacontrustee.co.in/wp-content/uploads/investor/6895_20260116150750_mgt-7.pdf", kind: "PDF", category: "Annual Return" },
  { label: "Beacon Annual Return 2023-24 Form_MGT_7", url: "https://beacontrustee.co.in/wp-content/uploads/investor/7413_20250625175332_beacon_annual_return_2023-24_form_mgt_7.pdf", kind: "PDF", category: "Annual Return" },
  { label: "AGM Notice 2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/2382_20241127172428_agm_notice_2024.pdf", kind: "PDF", category: "AGM Notice" },
  { label: "As on 30.Sep.2025", url: "https://beacontrustee.co.in/wp-content/uploads/investor/3720_20251020162949_shp_300925_report.html", kind: "HTML", category: "Share Holding Pattern" },
  { label: "As on 31.Mar.2025", url: "https://beacontrustee.co.in/wp-content/uploads/investor/6605_20250421182202_beacon_shp_report_31.03.25.html", kind: "HTML", category: "Share Holding Pattern" },
  { label: "As on 30.Sep.2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/1250_20250205144131_beacon_revised_shp.html", kind: "HTML", category: "Share Holding Pattern" },
  { label: "As on 03.Jun.2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/7675_20241127175336_17072024182032_ixbrl.html", kind: "HTML", category: "Share Holding Pattern" },
  { label: "As on 12.Feb.2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/5553_20241127175425_list_of_shareholders_12_02_24.pdf", kind: "PDF", category: "Share Holding Pattern" },
  { label: "Beacon_Integrated Governance Report_30.06.2025", url: "https://beacontrustee.co.in/wp-content/uploads/investor/6057_20250909130607_beacon_integrated_governance_report_30.06.2025.html", kind: "HTML", category: "Statement & Investor Complaints" },
  { label: "Beacon_Integrated Governance Report_31032025", url: "https://beacontrustee.co.in/wp-content/uploads/investor/8365_20250909130511_beacon_integrated_governance_report_31032025.html", kind: "HTML", category: "Statement & Investor Complaints" },
  { label: "Investor Complaints 31.12.2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/5025_20250122110619_beacon_investor_grievance_xbrl.html", kind: "HTML", category: "Statement & Investor Complaints" },
  { label: "Investor Complaints 30.09.2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/3161_20241127175521_investor_complaints_30.09.2024.html", kind: "HTML", category: "Statement & Investor Complaints" },
  { label: "Investor Complaints 30.06.2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4545_20241127175559_investor_complaints_30.6.2024.html", kind: "HTML", category: "Statement & Investor Complaints" },
  { label: "AGM Notice intimation 2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4888_20241127175813_agm_notice___intimation_to_stock_exchange_signed.pdf", kind: "PDF", category: "Notices Intimation" },
  { label: "Annual Report intimation 2024", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4326_20241127175914_annual_report___intimation_to_stock_exchange_signed.pdf", kind: "PDF", category: "Notices Intimation" },
  { label: "RPT Policy_V2", url: "https://beacontrustee.co.in/wp-content/uploads/investor/9234_20251016171823_rpt_policy_v2.pdf", kind: "PDF", category: "Policies" },
  { label: "Archival Policy_V2", url: "https://beacontrustee.co.in/wp-content/uploads/investor/6319_20251016171850_archival_policy_v2.pdf", kind: "PDF", category: "Policies" },
  { label: "Insider Trading Policy_V2", url: "https://beacontrustee.co.in/wp-content/uploads/investor/4235_20251016171735_insider_trading_policy_v2.pdf", kind: "PDF", category: "Policies" },
  { label: "Code of fair practises upsi policy", url: "https://beacontrustee.co.in/wp-content/uploads/investor/1112_20250610181138_code_of_fair_practises_-_upsi_policy.pdf", kind: "PDF", category: "Policies" },
  { label: "Material Subsidiary", url: "https://beacontrustee.co.in/wp-content/uploads/investor/3185_20251010143422_policy_on_material_subsidiary_29.09.2025.pdf", kind: "PDF", category: "Policies" },
  { label: "Whistle Blower or Vigil Mechanism Policy", url: "https://beacontrustee.co.in/wp-content/uploads/investor/8799_20251010144842_whistle_blower_or_vigil_mechanism_policy_v1.pdf", kind: "PDF", category: "Policies" },
  { label: "Policy on Materility of Events", url: "https://beacontrustee.co.in/wp-content/uploads/investor/9842_20251010144556_policy_on_materility_of_events_v1.pdf", kind: "PDF", category: "Policies" },
  { label: "POSH policy", url: "https://beacontrustee.co.in/wp-content/uploads/investor/6195_20241127180032_posh_policy.pdf", kind: "PDF", category: "Policies" },
  { label: "CSR policy", url: "https://beacontrustee.co.in/wp-content/uploads/investor/3291_20241127180102_csr_policy_beacon.pdf", kind: "PDF", category: "Policies" },
  { label: "Nomination and Remuneration policy", url: "https://beacontrustee.co.in/wp-content/uploads/investor/5992_20241127180137_nomination_and_remuneration_policy.pdf", kind: "PDF", category: "Policies" },
  { label: "Archival policy", url: "https://beacontrustee.co.in/wp-content/uploads/investor/8129_20241127180203_archival_policy.pdf", kind: "PDF", category: "Policies" },
];

function groupDocs(docs: DocItem[]) {
  const map = new Map<string, DocItem[]>();
  for (const doc of docs) {
    const current = map.get(doc.category) ?? [];
    current.push(doc);
    map.set(doc.category, current);
  }
  return map;
}

function DocRow({ index, doc }: { index: number; doc: DocItem }) {
  const padded = String(index + 1).padStart(2, "0");
  const action = doc.kind === "PDF" ? "DOWNLOAD" : "OPEN";

  return (
    <a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start justify-between gap-6 bg-white px-6 py-5 transition-colors hover:bg-primary-navy/[0.02]"
    >
      <div className="flex min-w-0 items-start gap-4">
        <span className="mt-0.5 w-10 shrink-0 text-xs font-semibold tabular-nums text-primary-navy/35">
          {padded}
        </span>
        <span className="min-w-0 text-sm font-semibold leading-relaxed text-primary-navy">
          {doc.label}
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-4 pt-0.5">
        <span className="hidden rounded-sm border border-primary-navy/10 bg-white px-2 py-1 text-[10px] font-black tracking-widest text-primary-navy/50 md:inline-block">
          {doc.kind}
        </span>
        <span className="text-[10px] font-black tracking-[0.2em] text-primary-navy/40 group-hover:text-accent-gold uppercase">
          {action}
        </span>
        <span className="text-accent-gold transition-transform group-hover:translate-x-0.5">→</span>
      </div>
    </a>
  );
}

export default function InvestorPage() {
  const grouped = groupDocs(docs);

  const orderedCategories = [
    "Offer Documents",
    "Group Company Financials",
    "Materiality Resolution",
    "Annual Reports",
    "Half Yearly Results",
    "Annual Return",
    "AGM Notice",
    "Share Holding Pattern",
    "Statement & Investor Complaints",
    "Policies",
    "Notices Intimation",
  ].filter((c) => (grouped.get(c)?.length ?? 0) > 0);

  const nav = [
    { id: "documents", label: "Document Index" },
    ...orderedCategories.map((c) => ({ id: slugify(c), label: c })),
    { id: "board", label: "Board" },
    { id: "contact", label: "Contacts" },
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      <section className="relative overflow-hidden bg-base-white" aria-label="Investor Relations">
        <div className="relative overflow-hidden">
          <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

          <div
            className="relative mt-[80px] flex flex-col items-center gap-10 overflow-hidden px-5 pb-20 pt-20 lg:mt-[118px] lg:px-20"
            aria-labelledby="hero-title"
          >
            <div className="wrapper flex flex-col items-center gap-8 text-center">
              <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-primary-navy px-4 py-1.5 text-sm font-medium text-primary-navy">
                <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
                  <span
                    className="size-[7px] rounded-full border border-base-white bg-accent-gold"
                    aria-hidden="true"
                  />
                </span>
                Investor
              </p>

              <div className="flex w-full flex-col items-center gap-6">
                <h1
                  id="hero-title"
                  data-aos="fade"
                  className="max-w-7xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]"
                >
                  Investor Relations
                  <br />
                  <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                    Disclosures Library
                  </span>
                </h1>

                <p
                  data-aos="fade"
                  data-aos-delay={200}
                  className="max-w-[900px] text-lg leading-relaxed text-primary-navy/60"
                >
                  This page is for dissemination of information to equity shareholders of Beacon Trusteeship Limited,
                  other stakeholders and regulatory body.
                </p>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay={300}
                className="flex w-full max-w-xl flex-col gap-px bg-primary-navy/10 p-px sm:flex-row"
              >
                <a
                  href="#documents"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Browse Documents
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  Compliance Contacts
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="relative h-[560px] w-full -mt-8 overflow-hidden lg:-mt-6">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg"
            alt="Beacon Trusteeship institutional background"
            fill
            priority
            className="object-cover object-[50%_70%]"
            sizes="100vw"
          />

          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" aria-hidden="true" />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-navy/15 to-primary-navy/80"
            aria-hidden="true"
          />

          <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
            <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-x border-white h-full" />
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/10 bg-primary-navy/90 backdrop-blur-xl">
            <div className="wrapper grid grid-cols-1 divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">
              <div className="flex flex-col items-center px-8 py-8 text-center lg:px-12 lg:py-12">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/60">
                  Documents
                </p>
                <p className="text-2xl font-black tracking-tighter uppercase tabular-nums lg:text-3xl">
                  {docs.length}
                </p>
              </div>
              <div className="flex flex-col items-center px-8 py-8 text-center lg:px-12 lg:py-12">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/60">
                  Sections
                </p>
                <p className="text-2xl font-black tracking-tighter uppercase tabular-nums lg:text-3xl">
                  {orderedCategories.length}
                </p>
              </div>
              <div className="flex flex-col items-center px-8 py-8 text-center lg:px-12 lg:py-12">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/60">
                  Support
                </p>
                <p className="text-2xl font-black tracking-tighter uppercase lg:text-3xl">+91 9555449955</p>
              </div>
              <div className="flex flex-col items-center px-8 py-8 text-center lg:px-12 lg:py-12">
                <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/60">
                  Public Status
                </p>
                <p className="text-2xl font-black tracking-tighter uppercase lg:text-3xl">NSE: BEACON</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32">
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
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="lg:hidden">
                <div className="sticky top-[76px] z-10 -mx-5 border-y border-primary-navy/10 bg-white/80 px-5 py-3 backdrop-blur">
                  <div className="flex gap-2 overflow-x-auto">
                    {nav.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="shrink-0 rounded-sm border border-primary-navy/10 bg-white px-3 py-2 text-[10px] font-black tracking-widest uppercase text-primary-navy/60"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Document index */}
              <section id="documents" className="scroll-mt-28" aria-label="Document index">
                <div className="flex items-end justify-between gap-8 border-b border-primary-navy/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                      Document Library
                    </span>
                    <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                      Document Index
                    </h2>
                  </div>

                  <div className="hidden text-right sm:block">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Total
                    </p>
                    <p className="mt-2 text-sm font-semibold tabular-nums text-primary-navy/70">
                      {docs.length} items
                    </p>
                  </div>
                </div>

                <div className="mt-16 space-y-20">
                  {orderedCategories.map((category) => {
                    const list = grouped.get(category) ?? [];
                    const id = slugify(category);

                    return (
                      <section
                        key={category}
                        id={id}
                        className="scroll-mt-28"
                        data-aos="fade-up"
                        aria-label={category}
                      >
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
                          <div className="lg:col-span-4">
                            <div className="flex items-center gap-4">
                              <span className="h-px w-14 bg-primary-navy/15" />
                              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                                Category
                              </span>
                            </div>
                            <h3 className="mt-5 text-2xl font-medium leading-tight text-primary-navy lg:text-3xl">
                              {category}
                            </h3>
                            <p className="mt-4 text-sm font-semibold text-primary-navy/55 tabular-nums">
                              {list.length} items
                            </p>
                          </div>

                          <div className="lg:col-span-8">
                            <div className="bg-primary-navy/10 p-px">
                              <div className="flex flex-col gap-px">
                                {list.map((doc, idx) => (
                                  <DocRow key={doc.url} index={idx} doc={doc} />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    );
                  })}
                </div>
              </section>

              {/* Board */}
              <section id="board" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Board of Directors">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Governance
                  </span>
                  <h2 className="mt-6 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">
                    Board of Directors
                  </h2>
                </div>

                <div className="mt-10 overflow-x-auto border border-primary-navy/10 bg-white">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-primary-navy/10">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.22em] text-primary-navy/45">
                          Name
                        </th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.22em] text-primary-navy/45">
                          Designation
                        </th>
                        <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-[0.22em] text-primary-navy/45">
                          DIN
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          name: "Pratapsingh Nathani",
                          designation: "Chairman and Managing Director",
                          din: "07224752",
                        },
                        {
                          name: "Jaydeep Bhattacharya",
                          designation: "Director",
                          din: "10623645",
                        },
                        {
                          name: "Sanjay Sinha",
                          designation: "Independent Director",
                          din: "08253225",
                        },
                        {
                          name: "Sanjay Bhasin",
                          designation: "Non-Executive Director",
                          din: "08484318",
                        },
                        {
                          name: "Vasan Paulraj",
                          designation: "Independent Director",
                          din: "08394150",
                        },
                        {
                          name: "Bhoomika Gupta",
                          designation: "Independent Director",
                          din: "02630074",
                        },
                        {
                          name: "Mahesh Ghadi",
                          designation: "Additional Director",
                          din: "07137477",
                        },
                      ].map((member) => (
                        <tr
                          key={member.din}
                          className="border-b border-primary-navy/10 hover:bg-primary-navy/[0.02]"
                        >
                          <td className="px-6 py-4 text-sm font-semibold">{member.name}</td>
                          <td className="px-6 py-4 text-sm text-primary-navy/60">{member.designation}</td>
                          <td className="px-6 py-4 text-right text-sm text-primary-navy/60 tabular-nums">
                            {member.din}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Contacts */}
              <section id="contact" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Compliance contacts">
                <div className="border border-primary-navy/10 bg-primary-navy text-white">
                  <div className="border-b border-white/10 px-8 py-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">
                      Support
                    </p>
                    <h2 className="mt-4 text-3xl font-medium leading-tight">Compliance & Registrar</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-10 px-8 py-8 md:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">
                        Company Secretary and Compliance Officer
                      </p>
                      <p className="mt-4 text-lg font-medium">Ms. Pratibha Tripathi</p>

                      <div className="mt-6 space-y-3 text-sm text-white/75">
                        <div className="flex items-center justify-between gap-6">
                          <span className="text-white/55">Email</span>
                          <a
                            className="font-semibold text-accent-gold underline decoration-white/20 underline-offset-4"
                            href="mailto:contact@beacontrustee.co.in"
                          >
                            contact@beacontrustee.co.in
                          </a>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                          <span className="text-white/55">Phone</span>
                          <a
                            className="font-semibold text-accent-gold underline decoration-white/20 underline-offset-4"
                            href="tel:+919555449955"
                          >
                            +91 9555449955
                          </a>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                          <span className="text-white/55">Investor grievances</span>
                          <a
                            className="font-semibold text-accent-gold underline decoration-white/20 underline-offset-4"
                            href="mailto:investorgrievances@beacontrustee.co.in"
                          >
                            investorgrievances@beacontrustee.co.in
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="md:border-l md:border-white/10 md:pl-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/60">
                        Registrar and Transfer Agent
                      </p>
                      <p className="mt-4 text-lg font-medium">KFin Technologies Limited</p>
                      <p className="mt-2 text-sm text-white/70">SEBI Registration Number: INR000000221</p>

                      <p className="mt-6 text-sm leading-relaxed text-white/65">
                        Selenium Tower B, Plot No. 31 and 32, Financial District,
                        Nanakramguda, Serilingampally Hyderabad-500 032, Telangana, India.
                      </p>

                      <div className="mt-6 text-sm text-white/75">
                        <a
                          className="font-semibold text-accent-gold underline decoration-white/20 underline-offset-4"
                          href="https://www.kfintech.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          www.kfintech.com
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-white/10 px-8 py-6">
                    <a
                      href="#top"
                      className="text-[11px] font-black tracking-[0.22em] uppercase text-white/60 hover:text-accent-gold"
                    >
                      Back to top
                    </a>
                  </div>
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
