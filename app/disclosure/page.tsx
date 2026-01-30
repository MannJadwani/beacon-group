import Image from "next/image";
import Link from "next/link";

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

const heroDescription = "This page is for dissemination of information to investors of securities and other products - wherein Beacon Trusteeship Limited, is appointed as the Trustee or in any other fiduciary capacity, alongside other external stakeholders and regulatory body.";

const docs: DocItem[] = [
  { label: "Investor Charter", url: "https://beacontrustee.co.in/wp-content/uploads/2024/07/InvestorCharter_20240527.pdf", kind: "PDF", category: "Investor Charter" },
  { label: "December FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2026/01/9040_20260106163919_investor_grievance_report_december_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "November FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/12/7904_20251204170321_investor_grievance_report_november_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "October FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/11/8416_20251106190102_investor_grievance_report_october_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "September FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/10/1127_20251003180342_investor_grievance_report_september_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "August FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/09/5758_20250904162632_investor_grievance_report_august_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "July FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/08/9008_20250805164747_investor_grievance_report_july_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "June FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/07/5973_20250703171557_investor_grievance_report_june_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "May FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/5408_20250606152740_investor_grievance_report_may_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "April FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/05/7756_20250506173815_investor_grievance_report_april_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "March FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/04/4566_20250404152110_investor_grievance_report_march_2025.pdf", kind: "PDF", category: "Complaint Data" },
  { label: "FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2026/01/3859_20260116173537_table_01_20260116_01.pdf", kind: "PDF", category: "Revision in Credit ratings" },
  { label: "FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/04/3739_20250404153015_table_01_20250331_94.pdf", kind: "PDF", category: "Revision in Credit ratings" },
  { label: "FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2026/01/7030_20260116182032_tab02_fy2026_20260116_01.pdf", kind: "PDF", category: "Status of payment of interest/principal by the listed entity" },
  { label: "FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/9529_20250605183047_tab02_fy2025_20250605_01.pdf", kind: "PDF", category: "Status of payment of interest/principal by the listed entity" },
  { label: "Q2 FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/12/5302_20251214220338_tab03_202509_a.pdf", kind: "PDF", category: "Monitoring of Utilization Certificate, Asset cover certificate and Quarterly compliance report of the listed entity" },
  { label: "Q1 FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/09/3684_20250913234602_tab03_20250913_a.pdf", kind: "PDF", category: "Monitoring of Utilization Certificate, Asset cover certificate and Quarterly compliance report of the listed entity" },
  { label: "Q4 FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/4229_20250630181837_tab03_d.pdf", kind: "PDF", category: "Monitoring of Utilization Certificate, Asset cover certificate and Quarterly compliance report of the listed entity" },
  { label: "H1 FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/12/7261_20251214222618_tab04_202509_a.pdf", kind: "PDF", category: "Details of Debenture issues handled by debenture trustee and their status" },
  { label: "H2 FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/7814_20250620180108_tab04_a.pdf", kind: "PDF", category: "Details of Debenture issues handled by debenture trustee and their status" },
  { label: "Q2 FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/12/2021_20251214220437_tab05_202509_a.pdf", kind: "PDF", category: "Status of information regarding breach of covenants/terms of the issue, if any action taken by debenture trustee" },
  { label: "Q1 FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/09/2248_20250913234650_tab05_20250913_a.pdf", kind: "PDF", category: "Status of information regarding breach of covenants/terms of the issue, if any action taken by debenture trustee" },
  { label: "Q4 FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/5095_20250620174011_tab05_a.pdf", kind: "PDF", category: "Status of information regarding breach of covenants/terms of the issue, if any action taken by debenture trustee" },
  { label: "H1 FY 2025 - 2026", url: "https://beacontrustee.co.in/wp-content/uploads/2025/12/7220_20251214222805_tab06_202509_a.pdf", kind: "PDF", category: "Complaints received by debenture trustee(s) including default cases" },
  { label: "H2 FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/4560_20250616131539_tab06_a.pdf", kind: "PDF", category: "Complaints received by debenture trustee(s) including default cases" },
  { label: "FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/5452_20250630165949_tab07a_b.pdf", kind: "PDF", category: "Debenture Redemption Reserve/Debenture Redemption/ maintenance of funds as per Companies (Share Capital and Debentures) Rules, 2014" },
  { label: "FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/6216_20250616114841_tab07b_a.pdf", kind: "PDF", category: "Recovery expense fund" },
  { label: "FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/6336_20251027173805_tab07c_b.pdf", kind: "PDF", category: "Accounts/ funds to be maintained in case of Municipal Debt Securities" },
  { label: "FY 2024 - 2025", url: "https://beacontrustee.co.in/wp-content/uploads/2025/06/2238_20250616121830_tab08_a.pdf", kind: "PDF", category: "Status of information regarding any default by listed entity and action taken by debenture trustee" },
  { label: "Data for failed Listed Debenture Payments", url: "https://beacontrustee.co.in/failed_debenture", kind: "LINK", category: "Press Release" },
];

function groupByCategory(docs: DocItem[]) {
  const map = new Map<string, DocItem[]>();
  for (const doc of docs) {
    const list = map.get(doc.category) ?? [];
    list.push(doc);
    map.set(doc.category, list);
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

export default function DisclosurePage() {
  const grouped = groupByCategory(docs);
  const categories = Array.from(grouped.keys());

  const nav = [
    { id: "index", label: "Quick Index" },
    { id: "documents", label: "All Disclosures" },
    ...categories.map((c) => ({ id: slugify(c), label: c })),
  ];

  const tiles = categories.slice(0, 6).map((category, idx) => ({
    category,
    id: slugify(category),
    count: grouped.get(category)?.length ?? 0,
    number: String(idx + 1).padStart(2, "0"),
  }));

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Disclosures">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="relative mt-[80px] px-5 pb-16 pt-16 lg:mt-[118px] lg:px-20 lg:pb-24">
          <div className="wrapper grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-primary-navy px-4 py-1.5 text-sm font-medium text-primary-navy">
                <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
                  <span
                    className="size-[7px] rounded-full border border-base-white bg-accent-gold"
                    aria-hidden="true"
                  />
                </span>
                Disclosures
              </p>

              <h1
                data-aos="fade"
                className="mt-8 max-w-5xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]"
              >
                Regulatory disclosures,
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                  clearly indexed.
                </span>
              </h1>

              <p
                data-aos="fade"
                data-aos-delay={200}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60"
              >
                {heroDescription}
              </p>

              <div
                id="index"
                className="mt-12 scroll-mt-28 bg-primary-navy/10 p-px"
                data-aos="fade-up"
                data-aos-delay={300}
              >
                <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                  {tiles.map((tile) => (
                    <a
                      key={tile.id}
                      href={`#${tile.id}`}
                      className="group bg-white p-7 transition-colors hover:bg-primary-navy hover:text-white"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                          Section {tile.number}
                        </span>
                        <span className="text-sm font-black tabular-nums text-primary-navy group-hover:text-white">
                          {tile.count}
                        </span>
                      </div>
                      <div className="mt-4 text-lg font-medium leading-tight text-primary-navy group-hover:text-white">
                        {tile.category}
                      </div>
                      <div className="mt-6 inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/45 group-hover:text-accent-gold">
                        Jump to section
                        <span className="text-accent-gold transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div
                data-aos="fade-up"
                data-aos-delay={400}
                className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row"
              >
                <a
                  href="#documents"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Browse All
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="https://beacontrustee.co.in/assets/certificate/iso.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  ISO Certificate
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative overflow-hidden border border-primary-navy/10 bg-primary-navy/5" data-aos="fade-left">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
                    alt="Disclosures background"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    priority
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-primary-navy/80"
                    aria-hidden="true"
                  />
                </div>

                <div className="absolute left-6 top-6 right-6 bg-white/90 backdrop-blur-sm border border-primary-navy/10 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/50">
                    At a glance
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Documents
                      </p>
                      <p className="mt-2 text-3xl font-medium tracking-tight tabular-nums text-primary-navy">
                        {docs.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Sections
                      </p>
                      <p className="mt-2 text-3xl font-medium tracking-tight tabular-nums text-primary-navy">
                        {categories.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-primary-navy/90 backdrop-blur-xl">
                  <div className="grid grid-cols-2 gap-px bg-white/10">
                    <div className="px-6 py-6 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                        Support
                      </p>
                      <p className="mt-2 text-sm font-semibold">+91 9555449955</p>
                    </div>
                    <div className="px-6 py-6 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                        Email
                      </p>
                      <p className="mt-2 truncate text-sm font-semibold">contact@beacontrustee.co.in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
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

              <section id="documents" className="scroll-mt-28" aria-label="All disclosures">
                <div className="flex items-end justify-between gap-8 border-b border-primary-navy/10 pb-6">
                  <div>
                    <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                      Disclosure Library
                    </span>
                    <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                      All Disclosures
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
                  {categories.map((category) => {
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

              <section className="mt-24" aria-label="Related links" data-aos="fade-up">
                <div className="bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
                    <div className="bg-primary-navy p-10 text-white lg:col-span-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
                        Need help?
                      </p>
                      <h2 className="mt-6 text-3xl font-medium leading-tight text-white">
                        Related resources
                      </h2>
                      <p className="mt-4 text-lg leading-relaxed text-white/60">
                        Access investor relations documents or lodge a grievance.
                      </p>
                    </div>

                    <Link
                      href="/investor"
                      className="group bg-white p-10 transition-colors hover:bg-primary-navy hover:text-white lg:col-span-7"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                        Investor Relations
                      </p>
                      <div className="mt-6 flex items-end justify-between gap-10">
                        <p className="text-2xl font-medium leading-tight text-primary-navy group-hover:text-white">
                          Visit Investor page
                        </p>
                        <span className="text-accent-gold transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </Link>

                    <Link
                      href="/investor_grievance"
                      className="group bg-white p-10 transition-colors hover:bg-primary-navy hover:text-white lg:col-span-7 lg:col-start-6"
                    >
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                        Lodge Complaint
                      </p>
                      <div className="mt-6 flex items-end justify-between gap-10">
                        <p className="text-2xl font-medium leading-tight text-primary-navy group-hover:text-white">
                          Go to Investor Grievance
                        </p>
                        <span className="text-accent-gold transition-transform group-hover:translate-x-1">→</span>
                      </div>
                    </Link>
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
