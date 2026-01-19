import fs from "node:fs";
import path from "node:path";

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

function normalizeText(input: string) {
  return input
    .replaceAll("**", "")
    .replaceAll("\\_", " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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
      if (!line || line.startsWith("![") || line.startsWith("##") || line.startsWith("###") || line.startsWith("*")) {
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

function parseSecurityTrustee(markdown: string): {
  title: string;
  introBlocks: string[];
  sections: SplitBullets[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
} {
  const lines = markdown.split(/\r?\n/);

  const start = lines.findIndex((l) => l.trim() === "# Security Trustee");
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");

  const raw = lines.slice(start >= 0 ? start + 1 : 0, end > 0 ? end : lines.length);
  const content = extractAfterSubmit(raw);

  // Intro blocks: paragraphs until first ### section.
  const introBlocks: string[] = [];
  let i = 0;
  for (; i < content.length; i++) {
    const line = content[i].trim();
    if (!line) continue;
    if (line.startsWith("### ")) break;
    if (line.startsWith("![")) continue;

    // skip UI trash from export
    if (line.toLowerCase().includes("captcha validation")) continue;

    // treat as paragraph
    introBlocks.push(normalizeText(line));
  }

  const headings: Array<{ title: string; index: number }> = [];
  for (let j = 0; j < content.length; j++) {
    const m = content[j].trim().match(/^###\s+(.+)/);
    if (m) headings.push({ title: normalizeText(m[1]), index: j });
  }

  const sections: SplitBullets[] = [];
  for (let j = 0; j < headings.length; j++) {
    const h = headings[j];
    const next = headings[j + 1];
    const slice = content.slice(h.index + 1, next ? next.index : content.length);

    if (h.title.toLowerCase().startsWith("we also offer")) continue;
    if (h.title.toLowerCase().includes("office")) continue;

    const bullets: string[] = [];
    for (const rawLine of slice) {
      const line = rawLine.trim();
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) bullets.push(normalizeText(bm[1]));
    }

    if (bullets.length === 0) continue;

    sections.push({
      id: slugify(h.title),
      title: h.title,
      bullets,
    });
  }

  // Also offer links
  const alsoOffer: Array<{ label: string; href: string }> = [];
  const alsoStart = content.findIndex((l) => l.trim() === "### We Also Offer :");
  if (alsoStart >= 0) {
    const alsoSlice = content.slice(alsoStart + 1);
    for (const rawLine of alsoSlice) {
      const line = rawLine.trim();
      const lm = line.match(/^\*\s+\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
      if (!lm) continue;
      alsoOffer.push({ label: normalizeText(lm[1]), href: lm[2] });
    }
  }

  const offices = parseOfficeContacts(content);

  return {
    title: "Security Trustee",
    introBlocks,
    sections,
    alsoOffer,
    offices,
  };
}

export default function SecurityTrusteeServicesPage() {
  const mdPath = path.join(process.cwd(), "content", "security-trustee-services", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { title, introBlocks, sections, alsoOffer, offices } = parseSecurityTrustee(md);

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
