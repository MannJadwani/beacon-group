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

type SafeKeepingContent = {
  title: string;
  intro: string;
  benefits: string[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
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

function parseSafeKeeping(markdown: string): SafeKeepingContent {
  const lines = markdown.split(/\r?\n/);

  const titleLine = lines.find((l) => l.trim().startsWith("# ")) ?? "# Safe Keeping Agent";
  const title = normalizeText(titleLine.replace(/^#\s+/, ""));

  const start = lines.findIndex((l) => l.trim() === titleLine.trim());
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");
  const raw = lines.slice(start >= 0 ? start + 1 : 0, end > 0 ? end : lines.length);
  const content = extractAfterSubmit(raw);

  let intro = "";
  for (const rawLine of content) {
    const line = rawLine.trim();
    if (!line) continue;
    if (line.startsWith("###")) break;
    if (line.startsWith("*")) break;
    intro = normalizeText(line);
    break;
  }

  const benefits: string[] = [];
  const benefitsHeading = content.findIndex((l) => l.trim() === "### Benefit to our Clients:");
  if (benefitsHeading >= 0) {
    for (let i = benefitsHeading + 1; i < content.length; i++) {
      const line = content[i].trim();
      if (line.startsWith("### ")) break;
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) benefits.push(normalizeText(bm[1]));
    }
  }

  const alsoOffer: Array<{ label: string; href: string }> = [];
  const alsoHeading = content.findIndex((l) => l.trim() === "### We Also Offer :");
  if (alsoHeading >= 0) {
    const officeStart = content.findIndex((l) => l.trim().match(/^###\s+.+Office$/i));
    const slice = content.slice(alsoHeading + 1, officeStart > 0 ? officeStart : content.length);

    for (const rawLine of slice) {
      const line = rawLine.trim();
      const m = line.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
      if (!m) continue;

      // Skip self link
      if (m[2].includes("/safe-keeping-agent")) continue;
      alsoOffer.push({ label: normalizeText(m[1]), href: m[2] });
    }
  }

  const offices = parseOfficeContacts(content);

  return {
    title,
    intro,
    benefits,
    alsoOffer,
    offices,
  };
}

function mapToInternalHref(url: string) {
  try {
    const u = new URL(url);
    if (u.hostname !== "beacontrustee.co.in") return url;

    if (u.pathname === "/escrow-monitoring-agency") return "/escrow-monitoring-agency";
    if (u.pathname === "/security-trustee-services") return "/security-trustee-services";
    if (u.pathname === "/facility-agent") return "/facility-agent";
    if (u.pathname === "/safe-keeping-agent") return "/safe-keeping-agent";

    return url;
  } catch {
    return url;
  }
}

export default function SafeKeepingAgentPage() {
  const mdPath = path.join(process.cwd(), "content", "safe-keeping-agent", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const parsed = parseSafeKeeping(md);

  const hasShcil = /\bshcil\b/i.test(parsed.intro) || parsed.intro.toLowerCase().includes("stock holding");

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "benefits", label: "Benefits" },
    ...(parsed.alsoOffer.length > 0 ? [{ id: "also", label: "Also offer" }] : []),
    ...(parsed.offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero - "Vault ledger" */}
      <section className="relative overflow-hidden bg-base-white" aria-label={parsed.title}>
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="relative mt-[80px] px-5 pb-16 pt-16 lg:mt-[118px] lg:px-20 lg:pb-20">
          <div className="wrapper">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7" data-aos="fade-right">
                <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-primary-navy px-4 py-1.5 text-sm font-medium text-primary-navy">
                  <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
                    <span
                      className="size-[7px] rounded-full border border-base-white bg-accent-gold"
                      aria-hidden="true"
                    />
                  </span>
                  Unregulated service
                </p>

                <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                  Safe Keeping
                  <br />
                  <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                    Agent.
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                  {parsed.intro}
                </p>

                <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                  <a
                    href="#overview"
                    className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                  >
                    View details <span aria-hidden="true">→</span>
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    Request custody <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5" data-aos="fade-left">
                {/* Visual spec board */}
                <div className="bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px">
                    <div className="bg-primary-navy p-10 text-white">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                        Vault spec
                      </p>
                      <p className="mt-6 text-2xl font-medium leading-tight text-white">
                        Fire proof custody.
                        <br />
                        24-hour surveillance.
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-white/70">
                        Designed for valuable documents, deeds, and certificates.
                      </p>
                    </div>

                    <div className="bg-white p-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Features
                      </p>

                      <div className="mt-8 grid grid-cols-2 gap-px bg-primary-navy/10">
                        {[
                          { label: "Storage", value: "Fire + theft proof" },
                          { label: "Ops", value: "Pan-India" },
                          { label: "Digitisation", value: "Document scans" },
                          { label: "Paperwork", value: "Minimal" },
                        ].map((s) => (
                          <div key={s.label} className="bg-white p-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              {s.label}
                            </p>
                            <p className="mt-3 text-sm font-semibold text-primary-navy">
                              {s.value}
                            </p>
                          </div>
                        ))}
                      </div>

                      {hasShcil && (
                        <div className="mt-8 border-t border-primary-navy/10 pt-8">
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                            Partner
                          </p>
                          <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                            Offered via an exclusive tie-up with Stock Holding Corporation of India Ltd. (SHCIL).
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
        <div className="relative h-[520px] w-full -mt-8 lg:-mt-6" data-aos="fade-up" data-aos-delay={200}>
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-6.jpg"
            alt="Safe custody"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-primary-navy/70" aria-hidden="true" />

          {/* Vault-grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10" aria-hidden="true">
            <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-x border-white h-full" />
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-5 lg:bottom-12 lg:left-20">
            <div className="border border-white/10 bg-primary-navy/80 backdrop-blur-xl px-6 py-5 text-white">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                Custody
              </p>
              <p className="mt-3 text-lg font-medium leading-tight text-white">
                Fire proof storage
              </p>
              <p className="mt-2 text-sm text-white/70">
                24-hour surveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-24 lg:py-32" aria-label="Safe keeping agent content">
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
                        href="/unregulated-services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Unregulated services <span className="text-accent-gold">→</span>
                      </Link>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Contact us <span className="text-accent-gold">→</span>
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
                    Fire-proof custody for documents
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed text-primary-navy/60">
                      {parsed.intro}
                    </p>
                  </div>

                  <div className="lg:col-span-5">
                    {/* Visual: document stack */}
                    <div className="relative bg-primary-navy/10 p-px">
                      <div className="absolute inset-0 -translate-x-3 translate-y-3 bg-primary-navy/5" aria-hidden="true" />
                      <div className="absolute inset-0 -translate-x-1 translate-y-1 bg-primary-navy/10" aria-hidden="true" />
                      <div className="relative bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Custody notes
                        </p>
                        <div className="mt-6 space-y-4">
                          {["Fire proof safe custody", "Theft proof storage", "24-hour surveillance"].map((t) => (
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

              <section id="benefits" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Benefits">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Benefits
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    Benefit to our clients
                  </h2>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px">
                  <div className="grid grid-cols-1 gap-px sm:grid-cols-2">
                    {parsed.benefits.map((b, idx) => (
                      <div key={`${b}-${idx}`} className="bg-white p-10">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Benefit {String(idx + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-5 text-xl font-medium leading-tight text-primary-navy">
                          {b}
                        </p>
                        <div className="mt-8 h-px w-14 bg-accent-gold" aria-hidden="true" />
                      </div>
                    ))}
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
                      Related services
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
