import fs from "node:fs";
import path from "node:path";

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

type AifServices = {
  documents: string[];
  accounts: string[];
  other: string[];
};

type TrustPrimer = {
  definition: string[];
  classifications: string[];
  benefits: string[];
  responsibilities: string[];
  corporateRole: string[];
  imageSrc: string;
};

type ParsedAif = {
  title: string;
  introBlocks: string[];
  services: AifServices;
  managerBenefits: string[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
  trustPrimer?: TrustPrimer;
  highlightValue?: string;
};

function normalizeText(input: string) {
  return input
    .replaceAll("**", "")
    .replaceAll("\\_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractAfterSubmit(lines: string[]) {
  const submitIndex = lines.findIndex((l) => l.trim() === "Submit");
  return submitIndex >= 0 ? lines.slice(submitIndex + 1) : lines;
}

function parseOfficeContacts(lines: string[]): OfficeContacts[] {
  const offices: OfficeContacts[] = [];

  const officeIndices: Array<{ office: string; index: number }> = [];
  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].trim().match(/^###\s+(.+Office)$/i);
    if (m) officeIndices.push({ office: normalizeText(m[1]), index: i });
  }

  for (let i = 0; i < officeIndices.length; i++) {
    const o = officeIndices[i];
    const next = officeIndices[i + 1];
    const slice = lines.slice(o.index + 1, next ? next.index : lines.length);

    const people: ContactPerson[] = [];

    for (let j = 0; j < slice.length; j++) {
      const line = slice[j].trim();
      if (
        !line ||
        line.startsWith("![") ||
        line.startsWith("##") ||
        line.startsWith("###") ||
        line.startsWith("*")
      ) {
        continue;
      }

      const name = normalizeText(line);
      const roleLine = slice[j + 1]?.trim() ?? "";
      const phoneLine = slice[j + 2]?.trim() ?? "";

      const role = normalizeText(roleLine.replaceAll("*", ""));
      const phoneTextMatch = phoneLine.match(/\*\*\[(\+?\d[^\]]+)\]\(/i);

      if (!role || !phoneTextMatch) continue;

      people.push({
        name,
        role,
        phone: phoneTextMatch[1].replace(/\s+/g, " ").trim(),
      });

      j += 2;
    }

    if (people.length > 0) {
      offices.push({ office: o.office, people });
    }
  }

  return offices;
}

function parseTrustPrimer(lines: string[]): TrustPrimer | undefined {
  const start = lines.findIndex((l) => l.trim() === "## What is a Trust?");
  if (start < 0) return undefined;

  const trustSlice = lines.slice(start + 1);

  const definition: string[] = [];
  const classifications: string[] = [];
  const benefits: string[] = [];
  const responsibilities: string[] = [];
  const corporateRole: string[] = [];
  let imageSrc = "";

  const privateTrustHeading = trustSlice.findIndex((l) => l.trim().startsWith("### Private trusts can be classified"));
  const benefitsHeading = trustSlice.findIndex((l) => l.trim().startsWith("### Benefits"));
  const responsibilitiesHeading = trustSlice.findIndex((l) => l.trim().startsWith("### The key responsibilities"));
  const corporateRoleHeading = trustSlice.findIndex((l) => l.trim().startsWith("### Role of Corporate Trustee"));

  // Definition: from beginning to first heading.
  const firstHeadingIndex = [
    privateTrustHeading,
    benefitsHeading,
    responsibilitiesHeading,
    corporateRoleHeading,
  ]
    .filter((x) => x >= 0)
    .sort((a, b) => a - b)[0];

  const definitionSlice = trustSlice.slice(0, firstHeadingIndex ?? trustSlice.length);
  for (const raw of definitionSlice) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("![")) continue;
    if (line.startsWith("##") || line.startsWith("###")) break;
    definition.push(normalizeText(line));
  }

  // Classifications
  if (privateTrustHeading >= 0) {
    const endAt = [benefitsHeading, responsibilitiesHeading, corporateRoleHeading]
      .filter((x) => x > privateTrustHeading)
      .sort((a, b) => a - b)[0];
    const slice = trustSlice.slice(privateTrustHeading + 1, endAt ?? trustSlice.length);
    for (const raw of slice) {
      const line = raw.trim();
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) classifications.push(normalizeText(bm[1]));
    }
  }

  // Benefits
  if (benefitsHeading >= 0) {
    const endAt = [responsibilitiesHeading, corporateRoleHeading]
      .filter((x) => x > benefitsHeading)
      .sort((a, b) => a - b)[0];
    const slice = trustSlice.slice(benefitsHeading + 1, endAt ?? trustSlice.length);
    for (const raw of slice) {
      const line = raw.trim();
      const img = line.match(/^!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
      if (img) imageSrc = img[1];
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) benefits.push(normalizeText(bm[1]));
    }
  }

  // Responsibilities
  if (responsibilitiesHeading >= 0) {
    const endAt = [corporateRoleHeading]
      .filter((x) => x > responsibilitiesHeading)
      .sort((a, b) => a - b)[0];
    const slice = trustSlice.slice(responsibilitiesHeading + 1, endAt ?? trustSlice.length);
    for (const raw of slice) {
      const line = raw.trim();
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) responsibilities.push(normalizeText(bm[1]));
      const img = line.match(/^!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
      if (img) imageSrc = img[1];
    }
  }

  // Corporate role
  if (corporateRoleHeading >= 0) {
    const slice = trustSlice.slice(corporateRoleHeading + 1);
    for (const raw of slice) {
      const line = raw.trim();
      if (line.startsWith("## ")) break;
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) corporateRole.push(normalizeText(bm[1]));
      const img = line.match(/^!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
      if (img) imageSrc = img[1];
    }
  }

  // Fallback image
  if (!imageSrc) {
    for (const raw of trustSlice) {
      const img = raw.trim().match(/^!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
      if (img) {
        imageSrc = img[1];
        break;
      }
    }
  }

  return {
    definition,
    classifications,
    benefits,
    responsibilities,
    corporateRole,
    imageSrc,
  };
}

function parseAif(markdown: string): ParsedAif {
  const lines = markdown.split(/\r?\n/);

  const titleLine = lines.find((l) => l.trim().startsWith("# ")) ?? "# Alternative Investment Funds";
  const title = normalizeText(titleLine.replace(/^#\s+/, ""));

  const start = lines.findIndex((l) => l.trim() === titleLine.trim());
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");

  const raw = lines.slice(start >= 0 ? start + 1 : 0, end > 0 ? end : lines.length);
  const content = extractAfterSubmit(raw);

  const trustPrimer = parseTrustPrimer(content);
  const trustStart = content.findIndex((l) => l.trim() === "## What is a Trust?");
  const main = trustStart >= 0 ? content.slice(0, trustStart) : content;

  const servicesHeading = main.findIndex((l) => l.trim().startsWith("### As a Trustee to an AIF Trust"));
  const benefitHeading = main.findIndex((l) => l.trim() === "### Benefit to Investment Manager");
  const alsoHeading = main.findIndex((l) => l.trim() === "### We Also Offer :");

  // Intro blocks: up until servicesHeading.
  const introBlocks: string[] = [];
  if (servicesHeading >= 0) {
    const introSlice = main.slice(0, servicesHeading);
    for (const rawLine of introSlice) {
      const line = rawLine.trim();
      if (!line) continue;
      if (line.startsWith("##") || line.startsWith("###")) continue;
      introBlocks.push(normalizeText(line));
    }
  }

  // Pull highlight value from intro (INR ... Crores)
  const highlightMatch = introBlocks
    .join(" ")
    .match(/INR\s+[0-9,]+\.?[0-9]*\s+Crores/i);
  const highlightValue = highlightMatch?.[0]?.replace(/\s+/g, " ").trim();

  // Services
  const services: AifServices = { documents: [], accounts: [], other: [] };

  if (servicesHeading >= 0) {
    const endIndex = benefitHeading >= 0 ? benefitHeading : alsoHeading >= 0 ? alsoHeading : main.length;
    const slice = main.slice(servicesHeading + 1, endIndex);

    let mode: "documents" | "accounts" | "other" = "other";

    for (const rawLine of slice) {
      const line = rawLine.trim();
      if (!line) continue;

      const top = line.match(/^\*\s+(.+)/);
      const sub = line.match(/^\+\s+(.+)/);

      if (top) {
        const text = normalizeText(top[1]);

        if (text.toLowerCase().startsWith("drafting") && text.toLowerCase().includes("investment documents")) {
          mode = "documents";
          continue;
        }

        if (text.toLowerCase().startsWith("opening") && text.toLowerCase().includes("managing")) {
          mode = "accounts";
          continue;
        }

        mode = "other";
        services.other.push(text);
        continue;
      }

      if (sub) {
        const text = normalizeText(sub[1]);
        if (mode === "documents") services.documents.push(text);
        if (mode === "accounts") services.accounts.push(text);
      }
    }
  }

  // Manager benefits
  const managerBenefits: string[] = [];
  if (benefitHeading >= 0) {
    const endIndex = alsoHeading >= 0 ? alsoHeading : main.length;
    const slice = main.slice(benefitHeading + 1, endIndex);
    for (const rawLine of slice) {
      const line = rawLine.trim();
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) managerBenefits.push(normalizeText(bm[1]));
    }
  }

  // Also offer links
  const alsoOffer: Array<{ label: string; href: string }> = [];
  if (alsoHeading >= 0) {
    const officeStart = main.findIndex((l) => l.trim().match(/^###\s+.+Office$/i));
    const slice = main.slice(alsoHeading + 1, officeStart > 0 ? officeStart : main.length);
    for (const rawLine of slice) {
      const line = rawLine.trim();
      const m = line.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
      if (!m) continue;
      if (m[2].includes("/alternative-investment-fund")) continue;
      alsoOffer.push({ label: normalizeText(m[1]), href: m[2] });
    }
  }

  const offices = parseOfficeContacts(main);

  return {
    title,
    introBlocks,
    services,
    managerBenefits,
    alsoOffer,
    offices,
    trustPrimer,
    highlightValue,
  };
}

function mapToInternalHref(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "beacontrustee.co.in") return url;

    // Only map to routes we actually have.
    if (u.pathname === "/security-trustee-services") return "/security-trustee-services";
    if (u.pathname === "/escrow-monitoring-agency") return "/escrow-monitoring-agency";
    if (u.pathname === "/facility-agent") return "/facility-agent";
    if (u.pathname === "/safe-keeping-agent") return "/safe-keeping-agent";
    if (u.pathname === "/deposit-trustee") return "/deposit-trustee";

    return url;
  } catch {
    return url;
  }
}

export default function AlternativeInvestmentFundPage() {
  const mdPath = path.join(process.cwd(), "content", "alternative-investment-fund", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const parsed = parseAif(md);

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "deliverables", label: "Deliverables" },
    { id: "benefits", label: "Benefits" },
    ...(parsed.trustPrimer ? [{ id: "trust", label: "Trust primer" }] : []),
    ...(parsed.alsoOffer.length > 0 ? [{ id: "also", label: "Also offer" }] : []),
    ...(parsed.offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  const documentCount = parsed.services.documents.length;
  const accountsCount = parsed.services.accounts.length;

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
              <div className="lg:col-span-7">
                <h1
                  data-aos="fade-up"
                  className="mb-6 text-4xl font-medium leading-[1.1] tracking-tight text-primary-navy lg:text-6xl xl:text-7xl"
                >
                  Alternative Investment
                  <br />
                  <span className="text-accent-gold">Funds</span>
                </h1>

                <div className="space-y-6">
                  {parsed.introBlocks.slice(0, 2).map((p) => (
                    <p
                      key={p}
                      data-aos="fade-up"
                      className="max-w-2xl text-lg leading-relaxed text-secondary-light-navy"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <div
                  data-aos="fade-up"
                  data-aos-delay={150}
                  className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl"
                >
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

              <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={200}>
                {/* Unique visual module: Fund blueprint */}
                <div className="bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px">
                    <div className="bg-primary-navy p-10 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                        Fund blueprint
                      </p>
                      <p className="mt-6 text-2xl font-medium leading-tight">
                        Trustee governance
                        <br />
                        for AIF trusts.
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-white/70">
                        Documentation, registration support, account operations and ongoing compliance reporting.
                      </p>
                    </div>

                    <div className="bg-white p-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Structure
                      </p>

                      <div className="mt-6 bg-primary-navy/10 p-px">
                        <div className="grid grid-cols-1 gap-px">
                          <div className="bg-white px-6 py-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/45">
                              Investors
                            </p>
                          </div>
                          <div className="bg-white px-6 py-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/45">
                              AIF Trust
                            </p>
                            <p className="mt-2 text-sm font-semibold text-primary-navy">
                              Trustee: Beacon
                            </p>
                          </div>
                          <div className="bg-white px-6 py-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/45">
                              Investment Manager
                            </p>
                          </div>
                          <div className="bg-white px-6 py-5">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/45">
                              Portfolio / Investments
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8 grid grid-cols-2 gap-px bg-primary-navy/10">
                        <div className="bg-white p-6">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                            Documents
                          </p>
                          <p className="mt-3 text-2xl font-medium tabular-nums text-primary-navy">
                            {documentCount}
                          </p>
                        </div>
                        <div className="bg-white p-6">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                            Accounts
                          </p>
                          <p className="mt-3 text-2xl font-medium tabular-nums text-primary-navy">
                            {accountsCount}
                          </p>
                        </div>
                      </div>

                      {parsed.highlightValue && (
                        <div className="mt-8 border-t border-primary-navy/10 pt-8">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                            Market signal
                          </p>
                          <p className="mt-3 text-lg font-medium text-primary-navy">
                            {parsed.highlightValue}
                          </p>
                          <p className="mt-2 text-sm text-primary-navy/60">
                            Net cumulative AIF raise reported (till Dec 31, 2020).
                          </p>
                          <div className="mt-6 h-px w-16 bg-accent-gold" aria-hidden="true" />
                        </div>
                      )}
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

        {/* Hero image panel */}
        <div data-aos="fade-up" data-aos-delay={250} className="relative mt-16 h-[420px] w-full lg:mt-20 lg:h-[520px]">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg"
            alt="Alternative investment fund"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/55 via-transparent to-transparent" aria-hidden="true" />

          <div className="absolute bottom-8 left-5 lg:bottom-12 lg:left-20">
            <div className="glass flex items-center gap-4 rounded-lg px-6 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-white p-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy">
                  SEBI
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">AIF Regulations, 2012</p>
                <p className="text-xs text-white/70">Trustee for AIF trusts set up as Trusts</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-24 lg:py-32" aria-label="AIF service content">
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
                      Next
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Services hub <span className="text-accent-gold">→</span>
                      </Link>
                      <Link
                        href="/investor"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Investor relations <span className="text-accent-gold">→</span>
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
                    Trustee for AIF trusts
                  </h2>
                </div>

                <div className="mt-10 space-y-6">
                  {parsed.introBlocks.slice(0, 2).map((p) => (
                    <p key={p} className="text-lg leading-relaxed text-primary-navy/60">
                      {p}
                    </p>
                  ))}
                </div>
              </section>

              <section id="deliverables" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Deliverables">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Deliverables
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    What Beacon delivers
                  </h2>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
                    <div className="bg-white p-10 lg:col-span-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Investment documents
                      </p>
                      <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                        Drafting & vetting pack
                      </p>
                      <div className="mt-8 space-y-3">
                        {parsed.services.documents.map((d, idx) => (
                          <div key={d} className="flex items-start gap-4">
                            <span className="mt-2 text-xs font-black tabular-nums text-accent-gold">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <p className="text-sm leading-relaxed text-primary-navy/70">{d}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 h-px w-20 bg-accent-gold" aria-hidden="true" />
                    </div>

                    <div className="bg-white p-10 lg:col-span-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Accounts
                      </p>
                      <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                        Operating stack
                      </p>
                      <div className="mt-8 space-y-3">
                        {parsed.services.accounts.map((a, idx) => (
                          <div key={a} className="flex items-start gap-4">
                            <span className="mt-2 text-xs font-black tabular-nums text-accent-gold">
                              {String(idx + 1).padStart(2, "0")}
                            </span>
                            <p className="text-sm leading-relaxed text-primary-navy/70">{a}</p>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 h-px w-20 bg-accent-gold" aria-hidden="true" />
                    </div>

                    <div className="bg-primary-navy p-10 text-white lg:col-span-12">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                        Operations & compliance
                      </p>
                      <div className="mt-8 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
                        {parsed.services.other.map((item, idx) => (
                          <div key={`${item}-${idx}`} className="bg-primary-navy/60 p-7">
                            <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/55">
                              {String(idx + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-white/75">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
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
                    Benefit to investment manager
                  </h2>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                    {parsed.managerBenefits.map((b, idx) => (
                      <div key={`${b}-${idx}`} className="bg-white p-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Benefit {String(idx + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-5 text-xl font-medium leading-tight text-primary-navy">{b}</p>
                        <div className="mt-8 h-px w-14 bg-accent-gold" aria-hidden="true" />
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {parsed.trustPrimer && (
                <section id="trust" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Trust primer">
                  <div className="border-b border-primary-navy/10 pb-6">
                    <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                      <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                      Appendix
                    </span>
                    <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                      What is a trust?
                    </h2>
                  </div>

                  <div className="mt-12 bg-primary-navy/10 p-px">
                    <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
                      <div className="bg-white p-10 lg:col-span-7">
                        <div className="space-y-5">
                          {parsed.trustPrimer.definition.map((p) => (
                            <p key={p} className="text-sm leading-relaxed text-primary-navy/70">
                              {p}
                            </p>
                          ))}
                        </div>

                        {parsed.trustPrimer.classifications.length > 0 && (
                          <div className="mt-10">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              Classifications
                            </p>
                            <div className="mt-5 space-y-3">
                              {parsed.trustPrimer.classifications.map((c) => (
                                <div key={c} className="flex items-start gap-4">
                                  <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                                  <p className="text-sm leading-relaxed text-primary-navy/70">{c}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="relative bg-primary-navy lg:col-span-5">
                        <Image
                          src={
                            parsed.trustPrimer.imageSrc ||
                            "https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
                          }
                          alt="Trust illustration"
                          fill
                          className="object-cover opacity-80"
                          sizes="(min-width: 1024px) 40vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/10 via-primary-navy/25 to-primary-navy" aria-hidden="true" />

                        <div className="relative flex h-full flex-col justify-end p-10 text-white">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                            Trustee responsibilities
                          </p>
                          <div className="mt-6 space-y-3">
                            {parsed.trustPrimer.responsibilities.slice(0, 4).map((r) => (
                              <p key={r} className="text-sm leading-relaxed text-white/75">
                                {r}
                              </p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {(parsed.trustPrimer.benefits.length > 0 || parsed.trustPrimer.corporateRole.length > 0) && (
                    <div className="mt-10 bg-primary-navy/10 p-px">
                      <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                        {parsed.trustPrimer.benefits.map((b, idx) => (
                          <div key={`${b}-${idx}`} className="bg-white p-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              Benefit
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-primary-navy/70">{b}</p>
                            <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                          </div>
                        ))}

                        {parsed.trustPrimer.corporateRole.map((r, idx) => (
                          <div key={`${r}-${idx}`} className="bg-white p-8">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              Corporate trustee
                            </p>
                            <p className="mt-4 text-sm leading-relaxed text-primary-navy/70">{r}</p>
                            <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

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
