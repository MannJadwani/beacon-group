import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

const SERVICE_LINK_MAP: Record<string, string> = {
  "https://beacontrustee.co.in/services": "/services",
  "https://beacontrustee.co.in/debenture-bond-trusteeship-listed": "/debenture-bond-trusteeship",
  "https://beacontrustee.co.in/alternative-investment-fund": "/alternative-investment-fund",
  "https://beacontrustee.co.in/securitization-trustee-regulated": "/securitization-trustee",
  "https://beacontrustee.co.in/reit-invit": "/reit-invit",
  "https://beacontrustee.co.in/escrow-fractional-regulated": "/escrow-fractional-regulated",
  "https://beacontrustee.co.in/escrow-ipef-regulated": "/escrow-ipef-regulated",
  "https://beacontrustee.co.in/esop-regulated": "/esop-regulated",
  "https://beacontrustee.co.in/share-pledge-trustee-regulated": "/share-pledge-trustee-regulated",
};

function mapServiceHref(href: string) {
  if (!href) return href;
  const clean = href.replace(/\/$/, "");
  return SERVICE_LINK_MAP[clean] ?? href;
}

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

function parseSharePledge(markdown: string): {
  title: string;
  intro: string;
  bullets: string[];
  benefitTitle: string;
  benefitBullets: string[];
  alsoOffer: Array<{ label: string; href: string }>;
  offices: OfficeContacts[];
} {
  const lines = markdown.split(/\r?\n/);

  const start = lines.findIndex((l) => l.trim() === "# Share Pledge Trustee (For Listed Shares)");
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");

  const raw = lines.slice(start >= 0 ? start + 1 : 0, end > 0 ? end : lines.length);
  const content = extractAfterSubmit(raw);

  const introLines: string[] = [];
  const bullets: string[] = [];
  let i = 0;
  for (; i < content.length; i++) {
    const line = content[i].trim();
    if (!line) continue;
    if (line.startsWith("### ")) break;
    if (line.startsWith("![")) continue;

    const bullet = line.match(/^\*\s+(.+)/);
    if (bullet) {
      bullets.push(normalizeText(bullet[1]));
      continue;
    }

    introLines.push(normalizeText(line));
  }

  const benefitIndex = content.findIndex((l) => l.trim().toLowerCase().startsWith("### benefits to"));
  const benefitTitle = benefitIndex >= 0 ? normalizeText(content[benefitIndex].replace(/^###\s+/, "")) : "Benefits";
  const benefitBullets: string[] = [];
  if (benefitIndex >= 0) {
    for (let j = benefitIndex + 1; j < content.length; j++) {
      const line = content[j].trim();
      if (line.startsWith("### ")) break;
      const bm = line.match(/^\*\s+(.+)/);
      if (bm) benefitBullets.push(normalizeText(bm[1]));
    }
  }

  const alsoOffer: Array<{ label: string; href: string }> = [];
  const alsoStart = content.findIndex((l) => l.trim().toLowerCase().startsWith("### we also offer"));
  if (alsoStart >= 0) {
    const alsoSlice = content.slice(alsoStart + 1);
    for (const rawLine of alsoSlice) {
      const line = rawLine.trim();
      const lm = line.match(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
      if (!lm) continue;
      alsoOffer.push({ label: normalizeText(lm[1]), href: lm[2] });
    }
  }

  const offices = parseOfficeContacts(content);

  return {
    title: "Share Pledge Trustee",
    intro: introLines.join(" "),
    bullets,
    benefitTitle,
    benefitBullets,
    alsoOffer,
    offices,
  };
}

export default function SharePledgeTrusteeRegulatedPage() {
  const mdPath = path.join(process.cwd(), "content", "share-pledge-trustee-regulated", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { title, intro, bullets, benefitTitle, benefitBullets, alsoOffer, offices } = parseSharePledge(md);

  const nav = [
    { id: "overview", label: "Overview" },
    { id: "monitoring", label: "Monitoring" },
    { id: "benefits", label: "Benefits" },
    ...(offices.length > 0 ? [{ id: "contacts", label: "Contacts" }] : []),
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="overlay" />

      <section className="relative overflow-hidden bg-primary-navy text-white" aria-label={title}>
        <div className="absolute inset-0 z-0">
          <Image
            src="https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
            alt="Share pledge trustee background"
            fill
            priority
            className="object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-navy/95 via-primary-navy/70 to-primary-navy" />
        </div>

        <div className="absolute inset-0 pointer-events-none opacity-5" aria-hidden="true">
          <div className="wrapper h-full grid grid-cols-4 lg:grid-cols-12">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-x border-white h-full" />
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(214,178,110,0.55) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
          aria-hidden="true"
        />

        <div className="wrapper relative z-10 px-5 pb-10 pt-32 lg:px-20 lg:pb-16 lg:pt-40">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <div className="inline-flex items-center gap-4 border border-accent-gold px-4 py-2">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold">
                  SEBI regulated service
                </span>
              </div>

              <h1 className="mt-8 font-sans text-[48px] font-black leading-[0.9] tracking-tighter uppercase md:text-[76px] lg:text-[98px]">
                Share
                <br />
                Pledge
                <br />
                <span className="text-accent-gold">Trustee</span>
              </h1>

              <p
                className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-white/70"
                data-aos="fade-up"
                data-aos-delay={200}
              >
                {intro ||
                  "Beacon monitors pledged listed shares, maintains lender margins, and executes pledge enforcement flows with disciplined governance."}
              </p>

              <div className="mt-10 flex flex-col gap-px bg-white/20 p-px sm:flex-row sm:max-w-xl" data-aos="fade-up" data-aos-delay={300}>
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
              <div className="bg-white/10 p-px">
                <div className="bg-primary-navy/70 p-8 lg:p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                    Oversight focus
                  </p>
                  <h2 className="mt-5 text-2xl font-medium leading-tight text-white">
                    Daily monitoring to protect lender collateral.
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-white/70">
                    We track pledged share value, margin adequacy, and enforce lender instructions when trigger events occur.
                  </p>
                  <ul className="mt-8 grid grid-cols-1 gap-3 text-sm text-white/80">
                    {(bullets.length > 0 ? bullets.slice(0, 4) : ["Daily valuation", "Margin monitoring", "Event triggers", "Pledge invocation"]).map(
                      (item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-2 size-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ),
                    )}
                  </ul>
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
      </section>

      <section className="bg-white py-24 lg:py-32" aria-label="Share pledge trustee content">
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
                        href="/security-trustee-services"
                        className="inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                      >
                        Security trustee <span className="text-accent-gold">→</span>
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
                    Monitoring pledged
                    <br />
                    listed shares.
                  </h2>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
                  <div className="lg:col-span-7">
                    <p className="text-lg leading-relaxed text-primary-navy/60">{intro}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="bg-primary-navy/10 p-px">
                      <div className="bg-white p-8">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Typical coverage
                        </p>
                        <ul className="mt-6 space-y-3 text-sm text-primary-navy/70">
                          {(bullets.length > 0 ? bullets.slice(0, 4) : ["Daily valuation", "Margin adequacy", "Default triggers", "Pledge invocation"]).map(
                            (t) => (
                              <li key={t} className="flex items-start gap-3">
                                <span className="mt-2 size-1.5 bg-accent-gold" aria-hidden="true" />
                                <span>{t}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="monitoring" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label="Monitoring">
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Monitoring
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                    Continuous reporting and action.
                  </h2>
                </div>

                <div className="mt-12">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {(bullets.length > 0 ? bullets : []).map((b, idx) => (
                      <div key={`monitor-${idx}`} className="border border-primary-navy/10 bg-white px-6 py-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Item {String(idx + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-primary-navy/70">{b}</p>
                      </div>
                    ))}
                    {bullets.length === 0 && (
                      <div className="border border-primary-navy/10 bg-white px-6 py-5">
                        <p className="text-sm leading-relaxed text-primary-navy/70">
                          Monitoring includes valuation, margin adequacy, and lender trigger support throughout the pledge lifecycle.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section id="benefits" className="mt-24 scroll-mt-28" data-aos="fade-up" aria-label={benefitTitle}>
                <div className="border-b border-primary-navy/10 pb-6">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Benefits
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                    {benefitTitle}.
                  </h2>
                </div>

                <div className="mt-12">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {(benefitBullets.length > 0
                      ? benefitBullets
                      : [
                          "Independent pledge holder",
                          "Periodic valuation and reporting",
                          "Timely disbursement support",
                          "Structured release controls",
                        ]
                    ).map((b, idx) => (
                      <div key={`benefit-${idx}`} className="border border-primary-navy/10 bg-white px-6 py-5">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Benefit {String(idx + 1).padStart(2, "0")}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-primary-navy/70">{b}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

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

      {alsoOffer.length > 0 && (
        <section className="relative overflow-hidden bg-base-white py-24 lg:py-32" data-aos="fade-up" aria-label="Related services">
          <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
          <div className="wrapper relative px-5 lg:px-20">
            <div className="border-b border-primary-navy/10 pb-6">
              <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                Related services
              </span>
              <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-5xl">
                Explore nearby mandates
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Continue with other SEBI regulated trustee services in the portfolio.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2" data-aos="fade-up" data-aos-delay={150}>
              {alsoOffer.slice(0, 6).map((link) => {
                const href = mapServiceHref(link.href);
                const isExternal = href.startsWith("http");

                return (
                  <a
                    key={link.href}
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    className="group border border-primary-navy/10 bg-white p-8 transition-all hover:border-accent-gold/40"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Related
                    </p>
                    <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy group-hover:text-accent-gold">
                      {link.label}
                    </p>
                    <div className="mt-6 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Open <span className="text-accent-gold">→</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
