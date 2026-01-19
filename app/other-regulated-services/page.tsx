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

function parseOtherRegulated(markdown: string): {
  intro: string;
  disclaimer: string;
  services: ServiceItem[];
  whyBullets: string[];
  whyImage: string;
} {
  const lines = markdown.split(/\r?\n/);

  const servicesStart = lines.findIndex((l) => l.trim() === "## Other Regulated Services");
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

    if (line.startsWith("! [") || line.startsWith("![") || line.startsWith("### ")) break;

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
      href: s.href || "https://beacontrustee.co.in/other-regulated-services",
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

export default function OtherRegulatedServicesPage() {
  const mdPath = path.join(process.cwd(), "content", "other-regulated-services", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { intro, disclaimer, services, whyBullets, whyImage } = parseOtherRegulated(md);

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero - "Regulator switchboard" */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Other regulated services">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="wrapper relative mt-[80px] px-5 pb-16 pt-16 lg:mt-[118px] lg:px-20 lg:pb-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-primary-navy px-4 py-1.5 text-sm font-medium text-primary-navy">
                <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
                  <span className="size-[7px] rounded-full border border-base-white bg-accent-gold" aria-hidden="true" />
                </span>
                Services
              </p>

              <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                Other regulated
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                  fiduciary services.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                {intro ||
                  "Value addition beyond conventional trusteeship is one of our greatest differentiators."}
              </p>

              {disclaimer && (
                <div className="mt-8 border border-primary-navy/10 bg-white px-6 py-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Important
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                    {disclaimer}
                  </p>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <a
                  href="#services"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Browse services <span aria-hidden="true">→</span>
                </a>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  Contact us <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="bg-primary-navy/10 p-px">
                <div className="grid grid-cols-1 gap-px">
                  <Link
                    href="/services"
                    className="group bg-white p-8 transition-colors hover:bg-primary-navy hover:text-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Category
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy group-hover:text-white">
                      SEBI regulated
                    </p>
                    <p className="mt-3 text-sm text-primary-navy/55 group-hover:text-white/70">
                      Listed trustee and SEBI investor protection mechanisms.
                    </p>
                    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Go <span className="text-accent-gold">→</span>
                    </div>
                  </Link>

                  <div className="bg-primary-navy p-8 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent-gold/70">
                      You are here
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight">Other regulated</p>
                    <p className="mt-3 text-sm text-white/70">
                      RBI / IFSCA and other regulators. Separate from SEBI regulated services.
                    </p>
                    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-white/60">
                      {services.length} services
                    </div>
                  </div>

                  <Link
                    href="/unregulated-services"
                    className="group bg-white p-8 transition-colors hover:bg-primary-navy hover:text-white"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Category
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy group-hover:text-white">
                      Unregulated
                    </p>
                    <p className="mt-3 text-sm text-primary-navy/55 group-hover:text-white/70">
                      Specialist mandates outside regulator investor protection.
                    </p>
                    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Go <span className="text-accent-gold">→</span>
                    </div>
                  </Link>
                </div>
              </div>

              <div className="mt-10 border border-primary-navy/10 bg-white p-8">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                  Help
                </p>
                <p className="mt-4 text-lg font-medium leading-tight text-primary-navy">
                  Not sure where you fit?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                  Start with SEBI regulated services if your instrument is listed. Otherwise, browse these mandates.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                >
                  Speak with our team <span className="text-accent-gold">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section id="services" className="bg-white py-24 lg:py-32" aria-label="Other regulated services">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Services
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Other regulated coverage
            </h2>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
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
              Investor protection mechanisms under SEBI do not apply to these services. For any assistance, write to
              investorgrievances@beacontrustee.co.in or contact our support team.
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
      <section className="relative overflow-hidden bg-primary-navy py-24 text-white lg:py-32" aria-label="Why Beacon">
        <div className="absolute inset-0 swiss-grid opacity-[0.06]" aria-hidden="true" />

        <div className="wrapper relative px-5 lg:px-20">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6" data-aos="fade-right">
              <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  Why Beacon
                </span>
              </div>
              <h2 className="mt-8 text-4xl font-medium leading-tight text-white lg:text-6xl">
                Clarity, compliance,
                <br />
                and execution.
              </h2>

              <div className="mt-10 bg-white/10 p-px">
                <div className="divide-y divide-white/10">
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
                    <div key={item} className="bg-primary-navy/60 px-8 py-7">
                      <div className="flex items-start justify-between gap-10">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                            {String(idx + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-3 text-lg font-semibold text-white/90">{item}</p>
                        </div>
                        <span className="mt-3 h-px w-16 bg-white/20" aria-hidden="true" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-px bg-white/20 p-px sm:flex-row">
                <Link
                  href="/contact"
                  className="bg-accent-gold px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy hover:bg-white transition-all flex items-center justify-center gap-3"
                >
                  Contact us <span aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/services"
                  className="bg-white/5 px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center justify-center"
                >
                  SEBI regulated
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6" data-aos="fade-left">
              <div className="relative overflow-hidden border border-white/10 bg-white/5">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={whyImage || "https://beacontrustee.co.in/assets/images/why-choose.png"}
                    alt="Why choose Beacon"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-primary-navy/10 via-transparent to-primary-navy/90"
                    aria-hidden="true"
                  />
                </div>

                <div className="border-t border-white/10 bg-primary-navy/70 px-8 py-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                    Next
                  </p>
                  <p className="mt-3 text-lg font-medium leading-relaxed text-white/75">
                    Explore unregulated services for mandates outside financial sector regulator coverage.
                  </p>
                  <Link
                    href="/unregulated-services"
                    className="mt-6 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-white/80 hover:text-accent-gold"
                  >
                    Unregulated services <span className="text-accent-gold">→</span>
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
