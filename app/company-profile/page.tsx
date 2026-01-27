import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

const COMPANY_PROFILE_URL = "/content/company_profile/index.md";

export default function CompanyProfilePage() {
  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      <section className="relative overflow-hidden bg-base-white" aria-label="Company profile">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-32 top-20 h-[520px] w-[520px] rounded-full bg-primary-navy/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mt-[80px] px-5 pb-16 pt-16 lg:mt-[118px] lg:px-20 lg:pb-24">
          <div className="wrapper grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary-navy/10 bg-primary-navy/5 px-4 py-1.5 text-xs font-bold tracking-[0.2em] uppercase text-primary-navy">
                <span className="block size-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
                Company profile
              </p>
              <h1 className="mt-8 max-w-4xl text-4xl font-medium leading-tight text-primary-navy lg:text-6xl">
                Beacon Trusteeship
                <br />
                <span className="text-accent-gold">Company Profile</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Access our latest company profile to review governance, services, leadership,
                and regulatory credentials.
              </p>

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <Link
                  href={COMPANY_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Open PDF <span aria-hidden="true">→</span>
                </Link>
                <a
                  href={COMPANY_PROFILE_URL}
                  download
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  Download <span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Document details
                  </p>
                  <h2 className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                    Overview
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-primary-navy/60">
                    The PDF includes company history, service verticals, leadership profiles,
                    credentials, and key milestones.
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="border border-primary-navy/10 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Format</p>
                      <p className="mt-2 text-sm font-semibold text-primary-navy">PDF</p>
                    </div>
                    <div className="border border-primary-navy/10 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Access</p>
                      <p className="mt-2 text-sm font-semibold text-primary-navy">Public</p>
                    </div>
                  </div>
                  <div className="mt-8 border-t border-primary-navy/10 pt-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Need help?
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                      For clarifications, reach out to our team and we will respond promptly.
                    </p>
                    <Link
                      href="/contact"
                      className="mt-6 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy/70 hover:text-accent-gold"
                    >
                      Contact us <span className="text-accent-gold">→</span>
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
