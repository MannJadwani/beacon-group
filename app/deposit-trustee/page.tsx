import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type BulletSection = {
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

function parseDepositTrustee(markdown: string): {
  intro: string;
  numberedPoints: string[];
  sections: BulletSection[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
} {
  const lines = markdown.split(/\r?\n/);

  const start = lines.findIndex((l) => l.trim() === "# Deposit Trustee");
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");

  const slice = lines.slice(start >= 0 ? start + 1 : 0, end > 0 ? end : lines.length);

  // Intro: first paragraph after the form block.
  // We detect intro as the first non-empty line after "Submit".
  const submitIndex = slice.findIndex((l) => l.trim() === "Submit");
  const afterSubmit = submitIndex >= 0 ? slice.slice(submitIndex + 1) : slice;

  let intro = "";
  for (const raw of afterSubmit) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("1.")) break;
    intro = normalizeText(line);
    break;
  }

  const numberedPoints: string[] = [];
  for (const raw of afterSubmit) {
    const line = raw.trim();
    const m = line.match(/^\d+\.\s+(.+)/);
    if (m) numberedPoints.push(normalizeText(m[1]));
    if (line.startsWith("### ")) break;
  }

  const headings: Array<{ title: string; index: number }> = [];
  for (let i = 0; i < afterSubmit.length; i++) {
    const line = afterSubmit[i].trim();
    const hm = line.match(/^###\s+(.+)/);
    if (hm) headings.push({ title: normalizeText(hm[1]), index: i });
  }

  const sections: BulletSection[] = [];
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const next = headings[i + 1];
    const sectionSlice = afterSubmit.slice(h.index + 1, next ? next.index : afterSubmit.length);

    if (h.title.toLowerCase().startsWith("we also offer")) continue;

    const bullets: string[] = [];
    for (const raw of sectionSlice) {
      const line = raw.trim();
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) bullets.push(normalizeText(bm[1]));
      if (line.trim().startsWith("### ")) break;
    }

    if (bullets.length === 0) continue;

    sections.push({
      id: slugify(h.title),
      title: h.title,
      bullets,
    });
  }

  const alsoOffer: Array<{ label: string; href: string }> = [];
  const alsoStart = afterSubmit.findIndex((l) => l.trim() === "### We Also Offer :");
  const officeStart = afterSubmit.findIndex((l) => l.trim().startsWith("### ") && l.trim().toLowerCase().includes("office"));

  if (alsoStart >= 0) {
    const alsoSlice = afterSubmit.slice(alsoStart + 1, officeStart > 0 ? officeStart : afterSubmit.length);
    for (const raw of alsoSlice) {
      const line = raw.trim();
      const lm = line.match(/^\*\s+\[.*?\]\((https?:\/\/[^)]+)\)/);
      if (!lm) continue;

      const labelMatch = line.match(/^\*\s+\[.*?\)\s*([^\]]+)\]\(/);
      // The markdown is: * [![](icon) Label](url)
      const label = normalizeText(line.replace(/^\*\s+\[.*?\)\s*/, "").replace(/\]\(.+\)$/, ""));

      alsoOffer.push({
        label,
        href: lm[1],
      });
    }
  }

  // Offices and contacts
  const offices: OfficeContacts[] = [];
  const officeIndices: Array<{ office: string; index: number }> = [];

  for (let i = 0; i < afterSubmit.length; i++) {
    const line = afterSubmit[i].trim();
    const m = line.match(/^###\s+(.+Office)$/i);
    if (m) officeIndices.push({ office: normalizeText(m[1]), index: i });
  }

  for (let i = 0; i < officeIndices.length; i++) {
    const o = officeIndices[i];
    const next = officeIndices[i + 1];
    const officeSlice = afterSubmit.slice(o.index + 1, next ? next.index : afterSubmit.length);

    const people: ContactPerson[] = [];

    for (let j = 0; j < officeSlice.length; j++) {
      const line = officeSlice[j].trim();
      // Pattern: Name (line), **Role** (line), **[phone](tel:...)** (line)
      if (!line || line.startsWith("![")) continue;

      // detect name lines by excluding headings and bullets
      if (line.startsWith("##") || line.startsWith("###") || line.startsWith("*") || line.startsWith("[") || line.startsWith("Submit")) {
        continue;
      }

      const name = normalizeText(line);

      const roleLine = officeSlice[j + 1]?.trim() ?? "";
      const phoneLine = officeSlice[j + 2]?.trim() ?? "";

      const role = normalizeText(roleLine.replaceAll("*", "").trim());
      const phoneMatch = phoneLine.match(/\[\+?\d[^\]]+\]\((tel:[^)]+)\)/i);
      const phoneTextMatch = phoneLine.match(/\*\*\[(\+?\d[^\]]+)\]\(/i);

      if (!role || !phoneMatch || !phoneTextMatch) continue;

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

  return {
    intro,
    numberedPoints,
    sections,
    alsoOffer,
    offices,
  };
}

export default function DepositTrusteePage() {
  const mdPath = path.join(process.cwd(), "content", "deposit-trustee", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { intro, numberedPoints, sections, alsoOffer, offices } = parseDepositTrustee(md);

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "services", label: "Services" },
    ...(offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      {/* Hero - "Compliance blueprint" */}
      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label="Deposit Trustee">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
            alt="Deposit Trustee background"
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/70 to-primary-navy" />
        </div>

        <div className="absolute inset-0 z-0 pointer-events-none opacity-5" aria-hidden="true">
          <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-x border-white h-full" />
            ))}
          </div>
        </div>

        <div className="wrapper relative z-10 px-5 pb-16 pt-32 lg:px-20 lg:pb-24 lg:pt-40">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  Service Detail
                </span>
              </div>

              <h1 className="mt-8 font-sans text-[52px] font-black leading-[0.86] tracking-tighter uppercase md:text-[80px] lg:text-[104px]">
                Deposit
                <br />
                <span className="text-accent-gold">Trustee</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {intro ||
                  "Under the Companies Act, appointment of a deposit trustee is mandatory for certain deposit-raising companies."}
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
              {/* Unique component: a "requirements" board */}
              <div className="bg-white/10 p-px">
                <div className="grid grid-cols-1 gap-px">
                  <div className="bg-primary-navy/70 px-8 py-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                      Requirements
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight text-white">
                      Statutory cover
                      <br />
                      and charge creation.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      RBI requires NBFCs to maintain full cover for public deposits. Deposit trustees support the mechanism via trust deed.
                    </p>
                  </div>

                  <div className="bg-white px-8 py-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Reference actions
                    </p>
                    <div className="mt-5 space-y-3">
                      {numberedPoints.slice(0, 2).map((p) => (
                        <div key={p} className="flex items-start gap-4">
                          <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                          <p className="text-sm leading-relaxed text-primary-navy/70">{p}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white px-8 py-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Quick links
                    </p>
                    <div className="mt-5 flex flex-col gap-3">
                      <Link
                        href="/services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Service hub <span className="text-accent-gold">→</span>
                      </Link>
                      <Link
                        href="/disclosure"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Disclosures <span className="text-accent-gold">→</span>
                      </Link>
                    </div>
                  </div>

                  <div className="bg-primary-navy px-8 py-7 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                      Coverage
                    </p>
                    <p className="mt-4 text-lg font-medium leading-tight">Companies Act, 2013</p>
                    <p className="mt-2 text-sm text-white/70">RBI / NHB regulations for NBFCs / HFCs.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex gap-px bg-white/20 p-px" aria-label="On page navigation">
                {nav.map((item) => (
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

      {/* Content */}
      <section className="bg-white py-24 lg:py-32" aria-label="Deposit Trustee content">
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
              <section id="overview" className="scroll-mt-28" aria-label="Overview" data-aos="fade-up">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Overview
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    Why deposit trusteeship exists
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
                          Core mechanism
                        </p>
                        <div className="mt-6 space-y-5">
                          {numberedPoints.map((p, idx) => (
                            <div key={p} className="flex items-start gap-4">
                              <span className="mt-2 text-xs font-black tabular-nums text-accent-gold">
                                {String(idx + 1).padStart(2, "0")}
                              </span>
                              <p className="text-sm leading-relaxed text-primary-navy/70">{p}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="services" className="mt-24 scroll-mt-28" aria-label="Services" data-aos="fade-up">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Services
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    Scope and monitoring
                  </h2>
                </div>

                <div className="mt-12 space-y-10">
                  {sections.map((sec) => (
                    <div key={sec.id} className="bg-primary-navy/10 p-px">
                      <div className="bg-white p-8 lg:p-10">
                        <div className="flex items-center justify-between gap-10">
                          <h3 className="text-2xl font-medium leading-tight text-primary-navy">
                            {sec.title}
                          </h3>
                          <span className="h-px w-16 bg-accent-gold" aria-hidden="true" />
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
                          {sec.bullets.map((b) => (
                            <div key={b} className="flex items-start gap-4 border border-primary-navy/10 bg-primary-navy/[0.01] px-5 py-4">
                              <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                              <p className="text-sm leading-relaxed text-primary-navy/70">{b}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {alsoOffer.length > 0 && (
                  <div className="mt-12" data-aos="fade-up">
                    <div className="bg-primary-navy/10 p-px">
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
                              We also offer
                            </p>
                            <p className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                              {link.label}
                            </p>
                            <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                              Explore <span className="text-accent-gold">→</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {offices.length > 0 && (
                <section id="contacts" className="mt-24 scroll-mt-28" aria-label="Contacts" data-aos="fade-up">
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
                              <div key={p.phone} className="bg-white p-7">
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