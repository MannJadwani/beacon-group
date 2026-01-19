import fs from "node:fs";
import path from "node:path";

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

function normalizeLabel(input: string) {
  return input
    .replaceAll("**", "")
    .replaceAll("\\_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function fileKindFromUrl(url: string) {
  const clean = url.split("?")[0].split("#")[0];
  const match = clean.match(/\.([a-z0-9]+)$/i);
  if (!match) return "LINK";
  return match[1].toUpperCase();
}

function parseDownloadPairs(markdown: string): Array<{ label: string; url: string }> {
  const lines = markdown.split(/\r?\n/);

  const start = lines.findIndex((l) => l.includes("This page is for dissemination"));
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");

  const slice = lines.slice(start >= 0 ? start : 0, end > 0 ? end : lines.length);

  const docs: Array<{ label: string; url: string }> = [];

  for (let i = 0; i < slice.length; i++) {
    const line = slice[i].trim();
    const m = line.match(/^\[Download Now\]\((https?:\/\/[^)]+)\)/i);
    if (!m) continue;

    const url = m[1];

    let j = i - 1;
    while (j >= 0 && slice[j].trim() === "") j--;
    if (j < 0) continue;

    const rawLabel = slice[j].replace(/^#+\s+/, "").trim();
    const label = normalizeLabel(rawLabel);

    if (!label) continue;
    if (label.toLowerCase() === "download now") continue;

    docs.push({ label, url });
  }

  const byUrl = new Map<string, string>();
  for (const doc of docs) {
    if (!byUrl.has(doc.url)) byUrl.set(doc.url, doc.label);
  }

  return [...byUrl.entries()].map(([url, label]) => ({ label, url }));
}

function inferCategory(doc: { label: string; url: string }): string {
  const text = `${doc.label} ${doc.url}`.toLowerCase();

  if (
    text.includes("scheme of arrangement") ||
    text.includes("amalgamation") ||
    text.includes("pre-merger") ||
    text.includes("post-merger") ||
    text.includes("valuation") ||
    text.includes("annexure") ||
    text.includes("audit committee report") ||
    text.includes("fairness") ||
    text.includes("pastdefaults") ||
    text.includes("nocfrom") ||
    text.includes("without_pan")
  ) {
    return "Scheme of Arrangement";
  }

  if (
    text.includes("intimations to stock exchanges related to material") ||
    text.includes("regn 30") ||
    text.includes("material events") ||
    text.includes("price movement") ||
    text.includes("grant_of_cor") ||
    text.includes("analyst") ||
    text.includes("sat order") ||
    text.includes("advisory") ||
    text.includes("cautionary") ||
    text.includes("licence")
  ) {
    return "Material Event Intimations";
  }

  if (
    text.includes("intimations to stock exchanges related to board meeting") ||
    text.includes("board meeting") ||
    text.includes("outcome of board meeting") ||
    text.includes("bm") ||
    text.includes("trading window")
  ) {
    return "Board Meeting Intimations";
  }

  if (
    text.includes("intimations to stock exchanges") ||
    text.includes("reg 74") ||
    text.includes("reconciliation") ||
    text.includes("sdd") ||
    text.includes("certificate") ||
    text.includes("non-applicability") ||
    text.includes("secretarial") ||
    text.includes("statement of deviation")
  ) {
    return "Stock Exchange Intimations";
  }

  if (text.includes("prospectus") || text.includes("herring")) {
    return "Offer Documents";
  }

  if (text.includes("materiality")) {
    return "Materiality Resolution";
  }

  if (text.includes("group_company_financials") || text.includes("group company financials")) {
    return "Group Company Financials";
  }

  if (text.includes("half yearly results") || text.includes("outcome_&_financials")) {
    return "Half Yearly Results";
  }

  if (text.includes("annual report") || text.match(/\bfy\s*20\d\d/i)) {
    return "Annual Reports";
  }

  if (text.includes("mgt-7") || text.includes("form_mgt_7") || text.includes("annual return")) {
    return "Annual Return";
  }

  if (text.includes("agm notice")) {
    return "AGM Notice";
  }

  if (text.includes("shp") || text.includes("share holding") || text.includes("shareholding")) {
    return "Share Holding Pattern";
  }

  if (text.includes("investor complaints") || text.includes("integrated governance") || text.includes("grievance")) {
    return "Statement & Investor Complaints";
  }

  if (text.includes("policy") || text.includes("code of") || text.includes("posh") || text.includes("csr")) {
    return "Policies";
  }

  return "Other";
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
  const investorMdPath = path.join(process.cwd(), "content", "investor", "index.md");
  const investorMd = fs.readFileSync(investorMdPath, "utf8");

  const rawDocs = parseDownloadPairs(investorMd);
  const docs: DocItem[] = rawDocs.map((d) => {
    const kind = fileKindFromUrl(d.url);
    return {
      label: d.label,
      url: d.url,
      kind,
      category: inferCategory(d),
    };
  });

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
    "Stock Exchange Intimations",
    "Material Event Intimations",
    "Board Meeting Intimations",
    "Scheme of Arrangement",
    "Other",
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
