import fs from "node:fs";
import path from "node:path";

import { Suspense } from "react";

import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import { CareersApplyForm } from "./CareersApplyForm";

type Job = {
  title: string;
  location: string;
  href: string;
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

function parseJobs(markdown: string): Job[] {
  const lines = markdown.split(/\r?\n/);
  const start = lines.findIndex((l) => l.trim() === "#### Job Openings");
  const end = lines.findIndex((l, i) => i > start && l.trim() === "#### Apply Now");
  const slice = lines.slice(start >= 0 ? start + 1 : 0, end > 0 ? end : lines.length);

  const jobs: Job[] = [];
  for (let i = 0; i < slice.length; i++) {
    const line = slice[i].trim();
    const m = line.match(/^######\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (!m) continue;

    const title = normalizeText(m[1]);
    const href = absolutizeBeaconPath(m[2]);

    // Location is usually the next non-empty line that isn't a link.
    let location = "";
    for (let j = i + 1; j < slice.length; j++) {
      const candidate = slice[j].trim();
      if (!candidate) continue;
      if (candidate.startsWith("[")) continue;
      if (candidate.startsWith("####")) break;
      location = normalizeText(candidate);
      break;
    }

    jobs.push({ title, href, location });
  }

  // De-dupe by title.
  const seen = new Set<string>();
  return jobs.filter((j) => {
    const key = j.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function parseResumeEmail(markdown: string) {
  const lines = markdown.split(/\r?\n/);
  const anchor = lines.findIndex((l) => l.toLowerCase().includes("to submit your resume"));

  // Search nearby first, then fall back to the whole doc.
  const searchSpace =
    anchor >= 0
      ? lines.slice(anchor, Math.min(lines.length, anchor + 12)).join("\n")
      : markdown;

  const match = searchSpace.match(/\/cdn-cgi\/l\/email-protection#([0-9a-fA-F]+)\b/);
  if (!match) return "";
  return decodeCloudflareEmail(match[1]);
}

export default function CareersPage() {
  const mdPath = path.join(process.cwd(), "content", "careers", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const jobs = parseJobs(md);
  const resumeEmail = parseResumeEmail(md) || "contact@beacontrustee.co.in";

  const nav = [
    { id: "openings", label: "Openings" },
    { id: "apply", label: "Apply" },
    { id: "process", label: "Process" },
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Careers">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
        <div className="pointer-events-none absolute -right-24 top-24 h-[520px] w-[520px] rounded-full bg-accent-gold/10 blur-3xl" aria-hidden="true" />

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
                Careers
              </p>

              <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                Build the
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">trust layer.</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Beacon operates where markets meet governance. If you like precision, documentation and
                accountability, you will feel at home.
              </p>

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <a
                  href="#openings"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  View openings <span aria-hidden="true">→</span>
                </a>
                <a
                  href="#apply"
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  Apply now <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Hiring bulletin
                  </p>
                  <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">Open roles</p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                    Roles are listed from our content export. Use the application form to generate an
                    email draft.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-4">
                    <div className="border border-primary-navy/10 bg-white p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Count
                      </p>
                      <p className="mt-3 text-3xl font-medium tabular-nums text-primary-navy">
                        {jobs.length}
                      </p>
                    </div>

                    <div className="border border-primary-navy/10 bg-white p-5">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Resume inbox
                      </p>
                      <p className="mt-3 text-base font-semibold text-primary-navy break-words">{resumeEmail}</p>
                      <p className="mt-2 text-xs text-primary-navy/50">
                        We decode Cloudflare-protected email links from the source.
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 h-px w-16 bg-accent-gold" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-24 lg:py-32" aria-label="Careers content">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Sticky nav */}
            <aside className="lg:col-span-3" aria-label="On this page">
              <div className="lg:sticky lg:top-32">
                <div className="border border-primary-navy/10 bg-white" data-aos="fade-up">
                  <div className="border-b border-primary-navy/10 px-6 py-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Index
                    </p>
                  </div>
                  <nav className="px-6 py-4" aria-label="Careers index">
                    {nav.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="flex items-center justify-between border-b border-primary-navy/10 py-4 text-sm font-semibold text-primary-navy hover:text-accent-gold"
                      >
                        {item.label}
                        <span aria-hidden="true">→</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="mt-6 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={100}>
                  <div className="bg-white px-6 py-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Tip
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                      Want to apply for a role quickly? Use the “Apply” button on an opening to prefill
                      the form.
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              {/* Openings */}
              <section id="openings" className="scroll-mt-28" aria-label="Job openings">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Job openings
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    Current roles
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                    Explore the open positions and read details on the legacy site.
                  </p>
                </div>

                <div className="mt-10 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
                  <div className="bg-white">
                    <div className="grid grid-cols-12 border-b border-primary-navy/10 px-6 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      <div className="col-span-6">Role</div>
                      <div className="col-span-3">Location</div>
                      <div className="col-span-3 text-right">Actions</div>
                    </div>

                    {(jobs.length ? jobs : [{ title: "General Application", href: "", location: "" }]).map(
                      (job) => {
                        const applyHref = `/careers?role=${encodeURIComponent(job.title)}#apply`;
                        return (
                          <div
                            key={job.title}
                            className="grid grid-cols-1 gap-4 border-b border-primary-navy/10 px-6 py-6 lg:grid-cols-12 lg:items-center"
                          >
                            <div className="lg:col-span-6">
                              <p className="text-lg font-semibold text-primary-navy">{job.title}</p>
                              <p className="mt-1 text-sm text-primary-navy/50">
                                Reference: {job.href ? "Beacon careers export" : "Open application"}
                              </p>
                            </div>

                            <div className="lg:col-span-3">
                              <p className="text-sm font-semibold text-primary-navy">
                                {job.location || "Bandra East, Mumbai."}
                              </p>
                            </div>

                            <div className="lg:col-span-3 lg:text-right">
                              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                                {job.href ? (
                                  <a
                                    href={job.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center border border-primary-navy/10 bg-white px-4 py-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:bg-primary-navy/[0.02]"
                                  >
                                    Read more
                                  </a>
                                ) : null}
                                <Link
                                  href={applyHref}
                                  className="inline-flex items-center justify-center bg-primary-navy px-4 py-3 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                                >
                                  Apply
                                </Link>
                              </div>
                            </div>
                          </div>
                        );
                      },
                    )}
                  </div>
                </div>
              </section>

              <div className="mt-20">
                <Suspense
                  fallback={
                    <div className="border border-primary-navy/10 bg-white p-10">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Apply
                      </p>
                      <p className="mt-4 text-2xl font-medium text-primary-navy">Loading form…</p>
                    </div>
                  }
                >
                  <CareersApplyForm jobs={jobs} resumeEmail={resumeEmail} />
                </Suspense>
              </div>

              {/* Process */}
              <section id="process" className="mt-20 scroll-mt-28" aria-label="Hiring process">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Process
                  </span>
                  <h2 className="mt-6 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">
                    What to expect
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                    Our work is detail-heavy. We optimize for clarity, responsiveness and evidence.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3" data-aos="fade-up" data-aos-delay={150}>
                  {[
                    {
                      k: "01",
                      title: "Role alignment",
                      body: "We review your profile against role requirements and market-facing responsibilities.",
                    },
                    {
                      k: "02",
                      title: "Functional round",
                      body: "Expect scenario questions: documentation, compliance judgment and stakeholder communication.",
                    },
                    {
                      k: "03",
                      title: "Offer and onboarding",
                      body: "If aligned, we move quickly with formalities and a structured onboarding plan.",
                    },
                  ].map((step) => (
                    <div key={step.k} className="border border-primary-navy/10 bg-white p-8">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        Step {step.k}
                      </p>
                      <p className="mt-4 text-xl font-semibold text-primary-navy">{step.title}</p>
                      <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">{step.body}</p>
                      <div className="mt-6 h-px w-10 bg-accent-gold" aria-hidden="true" />
                    </div>
                  ))}
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
