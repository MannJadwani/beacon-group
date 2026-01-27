import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

import type { ServiceAtlasItem } from "./ServicesAtlas";

type ParsedService = {
  title: string;
  description: string;
  href: string;
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

function parseOuterMarkdownLink(line: string) {
  // Handles patterns like:
  // [Read more ![Read More](...)](https://example.com/path)
  const outer = line.match(/\)\]\((https?:\/\/[^)]+)\)\s*$/i);
  if (outer) return outer[1];

  const fallback = line.match(/\((https?:\/\/[^)]+)\)\s*$/i);
  return fallback?.[1] ?? "";
}

function shortTitle(title: string) {
  const t = title.toLowerCase();

  if (t.includes("listed non-convertible debenture") || t.includes("municipal bond")) {
    return "Listed NCD / Bond";
  }

  if (t.includes("alternative investment")) {
    return "AIF";
  }

  if (t.includes("sdi") || (t.includes("securitization") && t.includes("debt"))) {
    return "Securitization (SDI)";
  }

  if (t.includes("reit") || t.includes("invit")) {
    return "REIT & InvIT";
  }

  if (t.includes("fractional") && t.includes("escrow")) {
    return "Escrow (Fractional)";
  }

  if (t.includes("investor protection") && t.includes("escrow")) {
    return "Escrow (Investor Protection)";
  }

  if (t.includes("esop")) {
    return "ESOP";
  }

  if (t.includes("share pledge")) {
    return "Share Pledge";
  }

  return title;
}

function imageForService(title: string, idx: number) {
  const t = title.toLowerCase();

  if (t.includes("listed non-convertible") || t.includes("bond")) {
    return "https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg";
  }

  if (t.includes("alternative investment")) {
    return "https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg";
  }

  if (t.includes("sdi") || t.includes("securitization")) {
    return "https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg";
  }

  if (t.includes("reit") || t.includes("invit")) {
    return "https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg";
  }

  if (t.includes("escrow")) {
    return "https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg";
  }

  if (t.includes("esop")) {
    return "https://beacontrustee.co.in/assets/images/banners/head-banner-6.jpg";
  }

  if (t.includes("share pledge")) {
    return "https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg";
  }

  const fallbacks = [
    "https://beacontrustee.co.in/assets/images/banners/head-banner-1.jpg",
    "https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg",
    "https://beacontrustee.co.in/assets/images/banners/head-banner-3.jpg",
    "https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg",
    "https://beacontrustee.co.in/assets/images/banners/head-banner-5.jpg",
    "https://beacontrustee.co.in/assets/images/banners/head-banner-6.jpg",
  ];

  return fallbacks[idx % fallbacks.length];
}

function tagsForService(title: string): string[] {
  const t = title.toLowerCase();

  if (t.includes("listed non-convertible") || t.includes("bond")) {
    return ["LISTED", "DEBT", "TRUSTEE", "MUNICIPAL"]; 
  }

  if (t.includes("alternative investment")) {
    return ["AIF", "FUNDS", "GOVERNANCE"]; 
  }

  if (t.includes("sdi") || t.includes("securitization")) {
    return ["SECURITIZATION", "SDI", "TRUSTEE"]; 
  }

  if (t.includes("reit") || t.includes("invit")) {
    return ["REIT", "INVIT", "TRUSTEE"]; 
  }

  if (t.includes("fractional") && t.includes("escrow")) {
    return ["ESCROW", "FRACTIONAL", "SHARES"]; 
  }

  if (t.includes("investor protection") && t.includes("escrow")) {
    return ["ESCROW", "INVESTOR", "PROTECTION"]; 
  }

  if (t.includes("esop")) {
    return ["ESOP", "EWT", "TRUSTEE"]; 
  }

  if (t.includes("share pledge")) {
    return ["PLEDGE", "SHARES", "TRUSTEE"]; 
  }

  return ["TRUSTEE", "SERVICE"]; 
}

function parseServicesPage(markdown: string): {
  intro: string;
  note: string;
  services: ServiceAtlasItem[];
  whyBullets: string[];
  whyImage: string;
} {
  const lines = markdown.split(/\r?\n/);

  const servicesStart = lines.findIndex((l) => l.trim() === "## SEBI Regulated Services");
  const whyStart = lines.findIndex((l) => l.trim() === "## Why Do Business With Beacon?");
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");

  const serviceSlice = lines.slice(
    servicesStart >= 0 ? servicesStart + 1 : 0,
    whyStart > 0 ? whyStart : lines.length,
  );

  const introLines: string[] = [];
  let note = "";

  let i = 0;
  for (; i < serviceSlice.length; i++) {
    const line = serviceSlice[i].trim();

    if (!line) continue;
    if (line.startsWith("![")) break;
    if (line.startsWith("### ")) break;

    if (line.startsWith("*") && line.endsWith("*")) {
      note = normalizeText(line.replaceAll("*", ""));
      continue;
    }

    introLines.push(normalizeText(line));
  }

  const parsedServices: ParsedService[] = [];
  let current: ParsedService | null = null;

  for (; i < serviceSlice.length; i++) {
    const line = serviceSlice[i].trim();

    const heading = line.match(/^###\s+(.+)/);
    if (heading) {
      if (current) parsedServices.push(current);
      current = { title: normalizeText(heading[1]), description: "", href: "" };
      continue;
    }

    if (!current) continue;

    if (line.toLowerCase().startsWith("[read more")) {
      current.href = parseOuterMarkdownLink(line);
      continue;
    }

    if (!line) continue;
    if (line.startsWith("![")) continue;
    if (line.startsWith("## ")) continue;

    current.description = normalizeText(`${current.description} ${line}`.trim());
  }

  if (current) parsedServices.push(current);

  const services: ServiceAtlasItem[] = parsedServices.map((s, idx) => {
    const number = String(idx + 1).padStart(2, "0");
    const id = `service-${slugify(s.title)}`;

    return {
      id,
      number,
      title: s.title,
      shortTitle: shortTitle(s.title),
      description: s.description,
      href: s.href || "https://beacontrustee.co.in/services",
      imageSrc: imageForService(s.title, idx),
      tags: tagsForService(s.title),
    };
  });

  const whySlice = lines.slice(
    whyStart >= 0 ? whyStart + 1 : 0,
    end > 0 ? end : lines.length,
  );

  const whyBullets: string[] = [];
  let whyImage = "";

  for (const raw of whySlice) {
    const line = raw.trim();

    const bullet = line.match(/^\*\s+###\s+(.+)/);
    if (bullet) whyBullets.push(normalizeText(bullet[1]));

    const img = line.match(/^!\[[^\]]+\]\((https?:\/\/[^)]+)\)/);
    if (img) whyImage = img[1];
  }

  return {
    intro: introLines.join(" "),
    note,
    services,
    whyBullets,
    whyImage,
  };
}

export default function ServicesPage() {
  const mdPath = path.join(process.cwd(), "content", "services", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { intro, note, services, whyBullets, whyImage } = parseServicesPage(md);

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero - two-panel "catalog spread" */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Services">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="wrapper relative mt-[80px] px-5 pb-12 pt-12 lg:mt-[118px] lg:px-20 lg:pb-16 lg:pt-16">
          <div className="bg-primary-navy/10 p-px">
            <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
              <div className="bg-primary-navy px-10 py-12 text-white lg:col-span-7 lg:px-14 lg:py-16" data-aos="fade-right">
                <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                    SEBI Regulated Services
                  </span>
                </div>

                <h1 className="mt-10 text-4xl font-medium leading-[0.95] tracking-tight text-white lg:text-6xl">
                  Services
                  <br />
                  <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                    Mandate Atlas
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
                  {intro ||
                    "Value addition beyond conventional trusteeship is one of our greatest differentiators."}
                </p>

                {note && (
                  <div className="mt-8 inline-flex items-center gap-3 border border-white/10 bg-white/5 px-5 py-3 text-sm text-white/75">
                    <span className="size-1.5 bg-accent-gold" aria-hidden="true" />
                    <span>{note}</span>
                  </div>
                )}

                <div className="mt-10 flex flex-col gap-px bg-white/20 p-px sm:flex-row sm:max-w-xl">
                  <a
                    href="#atlas"
                    className="flex items-center justify-center gap-3 bg-accent-gold px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-white"
                  >
                    Browse mandates <span aria-hidden="true">→</span>
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3 bg-white/5 px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
                  >
                    Speak with us
                  </Link>
                </div>
              </div>

              <div className="bg-white px-10 py-12 lg:col-span-5 lg:px-14 lg:py-16" data-aos="fade-left">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                  Regulatory perimeter
                </p>
                <h2 className="mt-6 text-2xl font-medium leading-tight text-primary-navy lg:text-3xl">
                  Choose the correct
                  <br />
                  service category.
                </h2>

                <div className="mt-10 bg-primary-navy/10 p-px">
                  <div className="divide-y divide-primary-navy/10">
                    <a
                      href="#atlas"
                      className="group flex items-center justify-between gap-8 bg-primary-navy px-8 py-7 text-white"
                    >
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-gold/80">
                          You are here
                        </p>
                        <p className="mt-2 text-lg font-semibold">SEBI regulated</p>
                        <p className="mt-2 text-sm text-white/70">
                          {services.length} mandates in scope.
                        </p>
                      </div>
                      <span className="text-accent-gold">→</span>
                    </a>

                    <Link
                      href="/other-regulated-services"
                      className="group flex items-center justify-between gap-8 bg-white px-8 py-7 hover:bg-primary-navy/[0.02]"
                    >
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Next
                        </p>
                        <p className="mt-2 text-lg font-semibold text-primary-navy">
                          Other regulated
                        </p>
                        <p className="mt-2 text-sm text-primary-navy/60">
                          RBI / IFSCA and others.
                        </p>
                      </div>
                      <span className="text-accent-gold transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>

                    <Link
                      href="/unregulated-services"
                      className="group flex items-center justify-between gap-8 bg-white px-8 py-7 hover:bg-primary-navy/[0.02]"
                    >
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Also
                        </p>
                        <p className="mt-2 text-lg font-semibold text-primary-navy">
                          Unregulated
                        </p>
                        <p className="mt-2 text-sm text-primary-navy/60">
                          No SEBI investor protection.
                        </p>
                      </div>
                      <span className="text-accent-gold transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                <div className="mt-10 border-t border-primary-navy/10 pt-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Quick links
                  </p>
                  <div className="mt-4 flex flex-col gap-3">
                    <Link
                      href="/disclosure"
                      className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                    >
                      Investor charter & disclosures <span className="text-accent-gold">→</span>
                    </Link>
                    <Link
                      href="/investor_grievance"
                      className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                    >
                      Lodge a complaint <span className="text-accent-gold">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 bg-primary-navy/10 p-px" aria-hidden="true" data-aos="fade-up">
            <div className="grid grid-cols-2 gap-px sm:grid-cols-4 lg:grid-cols-8">
              {services.map((s) => (
                <div key={s.id} className="bg-white px-5 py-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/35">
                    {s.number}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-primary-navy/70">
                    {s.shortTitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="atlas" className="scroll-mt-28 bg-white py-24 lg:py-32" aria-label="Services grid">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Mandates
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              SEBI regulated services
              <br />
              in a grid view.
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
              Scan each service quickly, then open the detailed mandate page.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" data-aos="fade-up" data-aos-delay={150}>
            {services.map((service) => (
              <a
                key={service.id}
                href={service.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-primary-navy/10 bg-white transition-all hover:border-accent-gold/40"
              >
                <div className="relative h-44 w-full overflow-hidden bg-primary-navy/5">
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-primary-navy/20 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="absolute left-5 top-5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-white">
                    {service.number}
                  </div>
                </div>

                <div className="flex h-full flex-col gap-6 p-8">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      {service.shortTitle}
                    </p>
                    <h3 className="mt-4 text-2xl font-medium leading-tight text-primary-navy group-hover:text-accent-gold">
                      {service.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-primary-navy/60">
                      {service.description}
                    </p>
                  </div>

                  <div className="mt-auto flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={`${service.id}-${tag}`}
                        className="border border-primary-navy/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/60 group-hover:text-accent-gold">
                    Open mandate <span className="text-accent-gold">→</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Beacon - evidence grid */}
      <section id="why-beacon" className="relative overflow-hidden bg-base-white py-24 lg:py-32" aria-label="Why Beacon">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="wrapper relative px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Why Beacon
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Built for fiduciary
              <br />
              oversight.
            </h2>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
              <div className="bg-white p-10 lg:col-span-7 lg:p-12">
                <div className="grid grid-cols-1 gap-px bg-primary-navy/10 sm:grid-cols-2">
                  {(whyBullets.length > 0
                    ? whyBullets
                    : [
                        "Quality, Excellence & Trustworthiness",
                        "Client Centric Solutions",
                        "Absolute Confidentiality",
                        "Industry Experience",
                        "Value Added Services",
                      ]
                  ).map((item, idx) => (
                    <div key={item} className="bg-white p-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Proof {String(idx + 1).padStart(2, "0")}
                      </p>
                      <p className="mt-4 text-xl font-medium leading-tight text-primary-navy">
                        {item}
                      </p>
                      <div className="mt-6 h-px w-16 bg-accent-gold" aria-hidden="true" />
                    </div>
                  ))}
                </div>

                <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row">
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                  >
                    Contact us <span aria-hidden="true">→</span>
                  </Link>
                  <Link
                    href="/disclosure"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    View disclosures <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="relative overflow-hidden bg-primary-navy lg:col-span-5">
                <Image
                  src={whyImage || "https://beacontrustee.co.in/assets/images/why-choose.png"}
                  alt="Why choose Beacon"
                  fill
                  className="object-cover opacity-70"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/20 via-primary-navy/40 to-primary-navy" aria-hidden="true" />

                <div className="relative flex h-full flex-col justify-end p-10 text-white lg:p-12">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                    Operating principles
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-white/70">
                    We combine regulatory rigor, process discipline, and fast execution to protect issuer and investor interests.
                  </p>
                  <div className="mt-8 flex flex-col gap-3">
                    <a
                      href="https://scores.sebi.gov.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-white/80 hover:text-accent-gold"
                    >
                      SEBI SCORES <span className="text-accent-gold">→</span>
                    </a>
                    <Link
                      href="/investor"
                      className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-white/80 hover:text-accent-gold"
                    >
                      Investor Relations <span className="text-accent-gold">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
