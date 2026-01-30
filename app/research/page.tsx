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

type ResearchData = {
  reports: ResearchItem[];
  updates: ResearchItem[];
  categories: {
    reports: string[];
    updates: string[];
  };
  contact: {
    phone: string;
    email: string;
  };
};

// CMS API URL - in production, this should be an environment variable
const CMS_API_URL = process.env.CMS_API_URL || "http://localhost:3001/api";

// Fallback data in case CMS is unavailable
const fallbackData: ResearchData = {
  reports: [
    {
      title: "Report On AIF - Part I",
      href: "https://beacontrustee.co.in/cms/documents/png/report_on_aif_-_part_1_20231201154110_1697.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/report_on_aif_-_part_1_20231201154110_1697.jpg",
      views: 1073
    },
    {
      title: "Report On Securitization",
      href: "https://beacontrustee.co.in/cms/documents/png/report_on_securitization__20231201153658_5026.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/report_on_securitization__20231201153658_5026.jpg",
      views: 189
    }
  ],
  updates: [
    {
      title: "Simplification Of Requirements For Grant Of Accreditati...",
      href: "https://beacontrustee.co.in/cms/documents/png/simplification_of_requirements_for_grant_of_accreditation_to_investors_20260112183332_8761.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/simplification_of_requirements_for_grant_of_accreditation_to_investors_20260112183332_8761.jpg",
      views: 2
    },
    {
      title: "Certification Requirement For Compliance Officers Of M...",
      href: "https://beacontrustee.co.in/cms/documents/png/aifs147852369_20251231124142_8525.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/aifs147852369_20251231124142_8525.jpg",
      views: 6
    }
  ],
  categories: {
    reports: ["AIF", "Securitization"],
    updates: ["AIF", "Debenture Trustee", "Investor Grievances", "Board Meetings", "Others"]
  },
  contact: {
    phone: "+91 8451844276",
    email: "research@beacontrustee.co.in"
  }
};

// Fetch research data from CMS
async function getResearchData(): Promise<ResearchData> {
  try {
    // In production, fetch from CMS API
    const res = await fetch(`${CMS_API_URL}/research`, {
      // Add cache revalidation as needed
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });

    if (!res.ok) {
      throw new Error(`CMS API error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch from CMS, using fallback data:", error);
    // Return fallback data if CMS is unavailable
    return fallbackData;
  }
}

export default async function ResearchPage() {
  // Fetch data from CMS
  const data = await getResearchData();
  const { reports, updates, categories, contact } = data;

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
                    Managed via CMS — content is dynamically fetched from the research database.
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
                        href={`tel:${contact.phone.replace(/\s+/g, "")}`}
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
              Reports from the CMS. Open an item to view the source asset.
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
              Quick updates and circular snapshots from the CMS.
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
                    {categories.reports.map((cat) => (
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
                      {categories.updates.map((cat) => (
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
