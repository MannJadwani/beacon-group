import Image from "next/image";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

import { InvestorGrievanceWizard, type GrievanceTrack } from "./InvestorGrievanceWizard";

const grievanceTracks: GrievanceTrack[] = [
  {
    id: "listed-debt",
    regulator: "SEBI",
    title: "Listed Debt Securities (Corporate & Municipal)",
    description: "Debenture Trustee for listed NCDs, bonds, and municipal debt.",
    complaintOptions: [
      "Delay in payment of interest",
      "Delay in payment of principal",
      "Any other",
    ],
  },
  {
    id: "listed-sdi",
    regulator: "SEBI",
    title: "Listed Securitized Debt Instruments (SDI)",
    description: "Trustee for listed SDIs issued by trusts formed by originators.",
    complaintOptions: ["Any other"],
  },
  {
    id: "aif",
    regulator: "SEBI",
    title: "Alternative Investment Fund (AIF)",
    description: "Trustee for privately pooled AIF structures.",
    complaintOptions: ["Any other"],
  },
  {
    id: "reit-invit",
    regulator: "SEBI",
    title: "REIT & InvIT",
    description: "Trustee for Infrastructure Investment Trusts and Real Estate Investment Trusts.",
    complaintOptions: ["Any other"],
  },
  {
    id: "esop",
    regulator: "SEBI",
    title: "ESOP Trusts (Listed Shares)",
    description: "Trustee for employee stock option plans / employee welfare trusts.",
    complaintOptions: ["Any other"],
  },
  {
    id: "fractional",
    regulator: "SEBI",
    title: "Fractional Shares",
    description: "Trustee for fractional share structures.",
    complaintOptions: ["Any other"],
  },
  {
    id: "unlisted-debt",
    regulator: "NON_SEBI",
    title: "Unlisted Debentures (Corporate)",
    description: "Debenture Trustee for unlisted corporate debentures.",
    complaintOptions: [
      "Delay in payment of interest",
      "Delay in payment of principal",
      "Any other",
    ],
  },
  {
    id: "others",
    regulator: "NON_SEBI",
    title: "Others",
    description: "Any other financial product where Beacon is appointed in a fiduciary role.",
    complaintOptions: ["Any other"],
  },
];

export default function InvestorGrievancePage() {
  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero - unique: "procedural" Swiss UI */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Lodge complaint">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="relative mt-[80px] px-5 pb-14 pt-16 lg:mt-[118px] lg:px-20 lg:pb-20">
          <div className="wrapper grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-primary-navy px-4 py-1.5 text-sm font-medium text-primary-navy">
                <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
                  <span className="size-[7px] rounded-full border border-base-white bg-accent-gold" aria-hidden="true" />
                </span>
                Lodge Complaint
              </p>

              <h1
                data-aos="fade"
                className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]"
              >
                A structured way to
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                  file a grievance.
                </span>
              </h1>

              <p
                data-aos="fade"
                data-aos-delay={200}
                className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60"
              >
                Form to file complaint with Beacon Trusteeship Limited in respect of instruments / trusts for which it is appointed as Trustee.
              </p>

              <div
                data-aos="fade-up"
                data-aos-delay={300}
                className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl"
              >
                <a
                  href="#wizard"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Start
                  <span aria-hidden="true">→</span>
                </a>
                <a
                  href="https://scores.sebi.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  SEBI SCORES
                  <span aria-hidden="true">→</span>
                </a>
              </div>

              <div className="mt-12 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={400}>
                <div className="grid grid-cols-1 gap-px sm:grid-cols-3">
                  {[
                    { label: "Step 01", value: "Investor" },
                    { label: "Step 02", value: "Investment" },
                    { label: "Step 03", value: "Complaint" },
                  ].map((s) => (
                    <div key={s.label} className="bg-white p-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        {s.label}
                      </p>
                      <p className="mt-2 text-lg font-medium text-primary-navy">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left">
              <div className="relative overflow-hidden border border-primary-navy/10 bg-primary-navy/5">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src="https://beacontrustee.co.in/assets/images/banners/head-banner-4.jpg"
                    alt="Support"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    priority
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-primary-navy/85"
                    aria-hidden="true"
                  />
                </div>

                <div className="absolute left-6 top-6 right-6 border border-primary-navy/10 bg-white/90 backdrop-blur-sm p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/50">
                    Support
                  </p>
                  <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-start justify-between gap-6">
                      <span className="text-primary-navy/50">Email</span>
                      <a
                        className="font-semibold text-primary-navy underline decoration-primary-navy/20 underline-offset-4 hover:text-accent-gold"
                        href="mailto:investorgrievances@beacontrustee.co.in"
                      >
                        investorgrievances@beacontrustee.co.in
                      </a>
                    </div>
                    <div className="flex items-start justify-between gap-6">
                      <span className="text-primary-navy/50">Phone</span>
                      <a
                        className="font-semibold text-primary-navy underline decoration-primary-navy/20 underline-offset-4 hover:text-accent-gold"
                        href="tel:+919555449955"
                      >
                        +91 9555449955
                      </a>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 bg-primary-navy/90 backdrop-blur-xl">
                  <div className="px-6 py-6 text-white">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-gold/70">
                      Disclosure
                    </p>
                    <p className="mt-2 text-sm font-semibold text-white/80">
                      Investor Charter & complaints data available on the Disclosures page.
                    </p>
                    <a
                      href="/disclosure"
                      className="mt-4 inline-flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.25em] text-white/70 hover:text-accent-gold"
                    >
                      Go to Disclosures <span className="text-accent-gold">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div id="wizard" className="scroll-mt-28">
        <InvestorGrievanceWizard tracks={grievanceTracks} />
      </div>

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
