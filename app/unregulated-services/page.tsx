import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type ServiceItem = {
  id: string;
  number: string;
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
  const outer = line.match(/\)\]\((https?:\/\/[^)]+)\)\s*$/i);
  if (outer) return outer[1];

  const fallback = line.match(/\((https?:\/\/[^)]+)\)\s*$/i);
  return fallback?.[1] ?? "";
}

function parseUnregulated(markdown: string): {
  intro: string;
  disclaimer: string;
  services: ServiceItem[];
  whyBullets: string[];
  whyImage: string;
} {
  const lines = markdown.split(/\r?\n/);

  const servicesStart = lines.findIndex((l) => l.trim() === "## Unregulated Services");
  const whyStart = lines.findIndex((l) => l.trim() === "## Why Do Business With Beacon?");
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");

  const slice = lines.slice(
    servicesStart >= 0 ? servicesStart + 1 : 0,
    whyStart > 0 ? whyStart : lines.length,
  );

  const introLines: string[] = [];
  let disclaimer = "";

  let i = 0;
  for (; i < slice.length; i++) {
    const line = slice[i].trim();
    if (!line) continue;

    if (line.startsWith("![") || line.startsWith("### ")) break;

    if (line.startsWith("*") && line.endsWith("*")) {
      disclaimer = normalizeText(line.replaceAll("*", ""));
      continue;
    }

    introLines.push(normalizeText(line));
  }

  const rawServices: Array<{ title: string; description: string; href: string }> = [];
  let current: { title: string; description: string; href: string } | null = null;

  for (; i < slice.length; i++) {
    const line = slice[i].trim();

    const heading = line.match(/^###\s+(.+)/);
    if (heading) {
      if (current) rawServices.push(current);
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

  if (current) rawServices.push(current);

  const services: ServiceItem[] = rawServices.map((s, idx) => {
    const number = String(idx + 1).padStart(2, "0");
    const id = `service-${slugify(s.title)}`;
    return {
      id,
      number,
      title: s.title,
      description: s.description,
      href: s.href || "https://beacontrustee.co.in/unregulated-services",
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
    disclaimer,
    services,
    whyBullets,
    whyImage,
  };
}

export default function UnregulatedServicesPage() {
  const mdPath = path.join(process.cwd(), "content", "unregulated-services", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { intro, disclaimer, services, whyBullets, whyImage } = parseUnregulated(md);

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      {/* Hero - dark warning board */}
      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label="Unregulated services">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-6.jpg"
            alt="Unregulated services background"
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/75 to-primary-navy" />
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
                  Unregulated Services
                </span>
              </div>

              <h1 className="mt-8 font-sans text-[52px] font-black leading-[0.86] tracking-tighter uppercase md:text-[80px] lg:text-[104px]">
                Specialist
                <br />
                <span className="text-accent-gold">mandates</span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70" data-aos="fade-up" data-aos-delay={200}>
                {intro ||
                  "Value addition beyond conventional trusteeship is one of our greatest differentiators."}
              </p>

              {disclaimer && (
                <div className="mt-8 border border-white/10 bg-white/5 px-6 py-5" data-aos="fade-up" data-aos-delay={250}>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/50">
                    Important
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    {disclaimer}
                  </p>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-px bg-white/20 p-px sm:flex-row sm:max-w-xl" data-aos="fade-up" data-aos-delay={300}>
                <a
                  href="#services"
                  className="flex items-center justify-center gap-3 bg-accent-gold px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-white"
                >
                  Browse services <span aria-hidden="true">→</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 bg-white/5 px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
                >
                  Contact us
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left">
              {/* Unique element: caution + routing panel */}
              <div className="bg-white/10 p-px">
                <div className="grid grid-cols-1 gap-px">
                  <div className="bg-primary-navy/70 px-8 py-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                      Caution
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight text-white">
                      Investor protection mechanisms may not apply.
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-white/70">
                      These mandates are outside SEBI and other regulator investor protection. Escalate via Beacon support if needed.
                    </p>
                    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                      {services.length} services
                    </div>
                  </div>

                  <Link
                    href="/investor_grievance"
                    className="group bg-white px-8 py-7 transition-colors hover:bg-primary-navy hover:text-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Support
                    </p>
                    <p className="mt-3 text-lg font-semibold text-primary-navy group-hover:text-white">
                      Lodge a complaint
                    </p>
                    <p className="mt-2 text-sm text-primary-navy/60 group-hover:text-white/70">
                      Generate an email draft to investorgrievances@beacontrustee.co.in.
                    </p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Go <span className="text-accent-gold">→</span>
                    </div>
                  </Link>

                  <Link
                    href="/services"
                    className="group bg-white px-8 py-7 transition-colors hover:bg-primary-navy hover:text-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Category
                    </p>
                    <p className="mt-3 text-lg font-semibold text-primary-navy group-hover:text-white">
                      SEBI regulated services
                    </p>
                    <p className="mt-2 text-sm text-primary-navy/60 group-hover:text-white/70">
                      If your instrument is listed, start here instead.
                    </p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Go <span className="text-accent-gold">→</span>
                    </div>
                  </Link>

                  <Link
                    href="/other-regulated-services"
                    className="group bg-white px-8 py-7 transition-colors hover:bg-primary-navy hover:text-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Category
                    </p>
                    <p className="mt-3 text-lg font-semibold text-primary-navy group-hover:text-white">
                      Other regulated
                    </p>
                    <p className="mt-2 text-sm text-primary-navy/60 group-hover:text-white/70">
                      RBI / IFSCA and other regulators.
                    </p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Go <span className="text-accent-gold">→</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section id="services" className="bg-white py-24 lg:py-32" aria-label="Unregulated services">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Services
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Unregulated coverage
            </h2>
          </div>

          {/* Unique element: "risk band" headers */}
          <div className="mt-10 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px lg:grid-cols-12">
              <div className="bg-white p-8 lg:col-span-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                  Regulator
                </p>
                <p className="mt-3 text-lg font-semibold text-primary-navy">None</p>
              </div>
              <div className="bg-white p-8 lg:col-span-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                  Protection
                </p>
                <p className="mt-3 text-lg font-semibold text-primary-navy">No SEBI mechanisms</p>
              </div>
              <div className="bg-white p-8 lg:col-span-4">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                  Route
                </p>
                <p className="mt-3 text-lg font-semibold text-primary-navy">Beacon support</p>
              </div>
            </div>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={200}>
            <div className="divide-y divide-primary-navy/10">
              {services.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white px-8 py-8 transition-colors hover:bg-primary-navy hover:text-white"
                >
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                        Service {s.number}
                      </p>
                      <p className="mt-4 text-lg font-medium leading-tight text-primary-navy group-hover:text-white">
                        {s.title}
                      </p>
                    </div>
                    <div className="lg:col-span-7">
                      <p className="text-lg leading-relaxed text-primary-navy/60 group-hover:text-white/70">
                        {s.description}
                      </p>
                    </div>
                    <div className="lg:col-span-2 lg:text-right">
                      <span className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/60 group-hover:text-accent-gold">
                        Read more <span className="text-accent-gold">→</span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-10 border border-primary-navy/10 bg-white px-8 py-7" data-aos="fade-up" data-aos-delay={250}>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
              Escalation
            </p>
            <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
              For these services, please contact Beacon directly. Write to investorgrievances@beacontrustee.co.in or
              use the Lodge Complaint page to generate a structured case summary.
            </p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/investor_grievance"
                className="inline-flex items-center justify-center gap-3 bg-primary-navy px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
              >
                Lodge complaint <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 border border-primary-navy/10 bg-white px-8 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:bg-primary-navy/[0.02]"
              >
                Contact us <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Beacon */}
      <section className="relative overflow-hidden bg-base-white py-24 lg:py-32" aria-label="Why Beacon">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="wrapper relative px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Why Beacon
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              A consistent
              <br />
              execution partner.
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
                    href="/services"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    SEBI regulated <span aria-hidden="true">→</span>
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
                    Next
                  </p>
                  <p className="mt-5 text-lg leading-relaxed text-white/70">
                    If your instrument is listed, explore SEBI regulated services for investor protection mechanisms.
                  </p>
                  <Link
                    href="/services"
                    className="mt-6 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-white/80 hover:text-accent-gold"
                  >
                    SEBI regulated <span className="text-accent-gold">→</span>
                  </Link>
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
