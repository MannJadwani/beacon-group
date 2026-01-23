import fs from "node:fs";
import path from "node:path";

import Image from "next/image";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type ResearchItem = {
  title: string;
  href: string;
  imageSrc: string;
  views: number | null;
};

function normalizeText(input: string) {
  return input.replaceAll("**", "").replace(/\s+/g, " ").trim();
}

function absolutizeBeaconPath(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `https://beacontrustee.co.in${url}`;
  return `https://beacontrustee.co.in/${url}`;
}

function decodeCloudflareEmail(hex: string) {
  const clean = hex.trim();
  if (!/^[0-9a-fA-F]+$/.test(clean)) return "";
  if (clean.length < 4 || clean.length % 2 !== 0) return "";

  const key = parseInt(clean.slice(0, 2), 16);
  if (!Number.isFinite(key)) return "";

  let out = "";
  for (let i = 2; i < clean.length; i += 2) {
    const byte = parseInt(clean.slice(i, i + 2), 16);
    if (!Number.isFinite(byte)) return "";
    out += String.fromCharCode(byte ^ key);
  }
  return out;
}

function parseResearchContact(markdown: string): { phone: string; email: string } {
  const phoneMatch = markdown.match(/\[(\+?[\d\s]+)\]\(tel:[^)]+\)/);
  const phone = phoneMatch ? normalizeText(phoneMatch[1]) : "+91 8451844276";

  const emailMatch = markdown.match(/\/cdn-cgi\/l\/email-protection#([0-9a-fA-F]+)\b/);
  const email = emailMatch ? decodeCloudflareEmail(emailMatch[1]) : "research@beacontrustee.co.in";

  return { phone, email };
}

function parseItems(sectionLines: string[]): ResearchItem[] {
  const items: ResearchItem[] = [];

  let currentCover = "";
  let currentTitle = "";
  let currentHref = "";
  let currentViews: number | null = null;

  function reset() {
    currentCover = "";
    currentTitle = "";
    currentHref = "";
    currentViews = null;
  }

  function pushCurrent() {
    if (!currentTitle) return;
    const href = currentHref || currentCover;
    if (!href) return;
    items.push({
      title: currentTitle,
      href,
      imageSrc: currentCover || "https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg",
      views: currentViews,
    });
  }

  for (const raw of sectionLines) {
    const line = raw.trim();
    if (!line) continue;

    const coverLink = line.match(/^\[!\[[^\]]*\]\(([^)]+)\)\]\(([^)]+)\)/);
    if (coverLink) {
      const img = absolutizeBeaconPath(coverLink[1]);
      const href = absolutizeBeaconPath(coverLink[2]);

      // Prefer the cms/documents/png cover art over gallery images.
      const isPrimary = /\/cms\/documents\/png\//.test(img) || /\/cms\/documents\/png\//.test(href);
      if (!currentCover || isPrimary) currentCover = img;
      if (!currentHref || isPrimary) currentHref = href;
      continue;
    }

    const titleLink = line.match(/^\[#####\s+([^\]]+)\]\(([^)]+)\)/);
    if (titleLink) {
      currentTitle = normalizeText(titleLink[1]);
      currentHref = absolutizeBeaconPath(titleLink[2]);
      continue;
    }

    const views = line.match(/^(\d+)\s+Views$/i);
    if (views) {
      currentViews = Number.parseInt(views[1], 10);
      pushCurrent();
      reset();
    }
  }

  const seen = new Set<string>();
  return items.filter((item) => {
    const key = item.href;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function parseCategories(markdown: string): { reports: string[]; updates: string[] } {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim() === "### Categories");
  const end = lines.findIndex((l, i) => i > start && l.trim() === "## Copy link");
  const slice = lines.slice(start >= 0 ? start + 1 : 0, end > 0 ? end : lines.length);

  let mode: "reports" | "updates" | "" = "";
  const reports: string[] = [];
  const updates: string[] = [];

  for (const raw of slice) {
    const line = raw.trim();
    if (!line) continue;

    if (line === "#### Research Reports") {
      mode = "reports";
      continue;
    }
    if (line === "#### Regulatory Updates") {
      mode = "updates";
      continue;
    }
    const bullet = line.match(/^\*\s+(.+)/);
    if (!bullet || !mode) continue;

    const value = normalizeText(bullet[1]);
    if (!value) continue;

    if (mode === "reports") reports.push(value);
    if (mode === "updates") updates.push(value);
  }

  return {
    reports: Array.from(new Set(reports)),
    updates: Array.from(new Set(updates)),
  };
}

function parseResearch(markdown: string): {
  reports: ResearchItem[];
  updates: ResearchItem[];
  categories: { reports: string[]; updates: string[] };
  contact: { phone: string; email: string };
} {
  const lines = markdown.split(/\r?\n/);
  const reportsStart = lines.findIndex((l) => l.trim() === "#### Research Reports");
  const updatesStart = lines.findIndex((l) => l.trim() === "#### Regulatory Updates");
  const categoriesStart = lines.findIndex((l) => l.trim() === "### Categories");

  const reportsSlice = lines.slice(
    reportsStart >= 0 ? reportsStart + 1 : 0,
    updatesStart > 0 ? updatesStart : lines.length,
  );
  const updatesSlice = lines.slice(
    updatesStart >= 0 ? updatesStart + 1 : 0,
    categoriesStart > 0 ? categoriesStart : lines.length,
  );

  const reports = parseItems(reportsSlice);
  const updates = parseItems(updatesSlice);
  const categories = parseCategories(markdown);
  const contact = parseResearchContact(markdown);

  return { reports, updates, categories, contact };
}

export default function ResearchPage() {
  const mdPath = path.join(process.cwd(), "content", "research", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { reports, updates, categories, contact } = parseResearch(md);

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Research">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-24 top-16 h-[520px] w-[520px] rounded-full bg-primary-navy/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-24 top-32 h-[520px] w-[520px] rounded-full bg-accent-gold/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mt-[80px] px-5 pb-16 pt-16 lg:mt-[118px] lg:px-20 lg:pb-24">
          <div className="wrapper grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-primary-navy px-4 py-1.5 text-sm font-medium text-primary-navy">
                <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
                  <span
                    className="size-[7px] rounded-full border border-base-white bg-accent-gold"
                    aria-hidden="true"
                  />
                </span>
                Insights
              </p>

              <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                Research that
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                  travels with regulation.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Reports and regulatory updates compiled by Beacon Research — built to be practical,
                timely, and easy to reference.
              </p>

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <a
                  href="#reports"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Research reports <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#updates"
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  Regulatory updates <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Beacon Research desk
                  </p>
                  <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">Contact + coverage</p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                    This page is generated from the source export and lists the latest items captured.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-4">
                    <div className="border border-primary-navy/10 bg-white p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Email
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-3 block break-words text-base font-semibold text-primary-navy hover:text-accent-gold"
                      >
                        {contact.email}
                      </a>
                    </div>

                    <div className="border border-primary-navy/10 bg-white p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Phone
                      </p>
                      <a
                        href="tel:+918451844276"
                        className="mt-3 block text-base font-semibold text-primary-navy hover:text-accent-gold"
                      >
                        {contact.phone}
                      </a>
                    </div>

                    <div className="border border-primary-navy/10 bg-white p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Library
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-semibold text-primary-navy/60">Reports</p>
                          <p className="mt-1 text-3xl font-medium tabular-nums text-primary-navy">{reports.length}</p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-primary-navy/60">Updates</p>
                          <p className="mt-1 text-3xl font-medium tabular-nums text-primary-navy">{updates.length}</p>
                        </div>
                      </div>
                      <div className="mt-6 h-px w-16 bg-accent-gold" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Reports */}
      <section id="reports" className="bg-white py-24 lg:py-32 scroll-mt-28" aria-label="Research reports">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Research reports
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Long-form analysis
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
              Reports captured in the export. Open an item to view the source asset.
            </p>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {reports.map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white transition-colors hover:bg-primary-navy hover:text-white"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-navy">
                    <Image
                      src={item.imageSrc}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary-navy/75 via-transparent to-transparent opacity-90"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-gold/80">
                        Report {String(idx + 1).padStart(2, "0")}
                      </p>
                    </div>
                    {typeof item.views === "number" ? (
                      <div className="absolute bottom-4 right-4 rounded-sm bg-primary-navy/70 px-3 py-2 text-[10px] font-black uppercase tracking-[0.25em] text-white">
                        {item.views.toLocaleString()} views
                      </div>
                    ) : null}
                  </div>

                  <div className="p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Beacon Research
                    </p>
                    <h3 className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                      {item.title}
                    </h3>
                    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Open <span className="text-accent-gold">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Regulatory Updates */}
      <section id="updates" className="bg-base-white py-24 lg:py-32 scroll-mt-28" aria-label="Regulatory updates">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Regulatory updates
            </span>
            <h2 className="mt-6 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">
              A running log
            </h2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
              Quick updates and circular snapshots. Titles are preserved exactly as in the export.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-16" data-aos="fade-up" data-aos-delay={150}>
            <div className="lg:col-span-4">
              <div className="border border-primary-navy/10 bg-white">
                <div className="border-b border-primary-navy/10 px-6 py-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Categories
                  </p>
                </div>

                <div className="px-6 py-6">
                  <p className="text-sm font-semibold text-primary-navy">Research Reports</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(categories.reports.length ? categories.reports : ["AIF", "Securitization"]).map((cat) => (
                      <span
                        key={`reports-${cat}`}
                        className="rounded-sm border border-primary-navy/10 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-primary-navy/60"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 border-t border-primary-navy/10 pt-8">
                    <p className="text-sm font-semibold text-primary-navy">Regulatory Updates</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {(categories.updates.length
                        ? categories.updates
                        : ["AIF", "Debenture Trustee", "Investor Grievances", "Board Meetings", "Others"])?.map((cat) => (
                        <span
                          key={`updates-${cat}`}
                          className="rounded-sm border border-primary-navy/10 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-primary-navy/60"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-primary-navy/10 p-px">
                <div className="bg-white px-6 py-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Need something?
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                    Send a note to the research desk and we will point you to the right material.
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-6 inline-flex items-center justify-center bg-primary-navy px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                  >
                    Email research <span aria-hidden="true">→</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white">
                  <div className="hidden grid-cols-12 border-b border-primary-navy/10 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 lg:grid">
                    <div className="col-span-8">Update</div>
                    <div className="col-span-2">Views</div>
                    <div className="col-span-2 text-right">Link</div>
                  </div>

                  {updates.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group grid grid-cols-1 gap-4 border-b border-primary-navy/10 px-6 py-6 transition-colors hover:bg-primary-navy hover:text-white lg:grid-cols-12 lg:items-center"
                    >
                      <div className="lg:col-span-8">
                        <div className="flex items-center gap-4">
                          <div className="relative size-14 overflow-hidden bg-primary-navy/10">
                            <Image
                              src={item.imageSrc}
                              alt=""
                              fill
                              className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.03]"
                              sizes="56px"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-primary-navy group-hover:text-white">{item.title}</p>
                            <p className="mt-1 text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                              Regulatory update
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-2">
                        <p className="text-sm font-semibold tabular-nums text-primary-navy/70 group-hover:text-white">
                          {typeof item.views === "number" ? item.views.toLocaleString() : "-"}
                        </p>
                      </div>

                      <div className="lg:col-span-2 lg:text-right">
                        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/60 group-hover:text-accent-gold">
                          Open <span aria-hidden="true">→</span>
                        </p>
                      </div>
                    </a>
                  ))}
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
