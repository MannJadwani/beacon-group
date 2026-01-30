import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type AboutUsContent = {
  title: string;
  leadHeading: string;
  leadBody: string;
  incorporatedHeading: string;
  incorporatedBody: string;
  certificateImage: string;
  missionIcon: string;
  visionIcon: string;
  vision: string;
  mission: string;
  isoUrl: string;
  companyProfileUrl: string;
};

const content: AboutUsContent = {
  title: "Value addition beyond conventional Trusteeship",
  leadHeading: "We're a leading SEBI registered Debenture Trustee offering technology enabled solutions.",
  leadBody: "Value addition beyond conventional trusteeship is one of our greatest differentiators. We take pride in ensuring that our one-stop solution motto backed by a wide range of Trustee Services is the answer to your needs. Our offerings are based on the valued experience of our principles. With the help of expert opinion and advice of our members & reputed agencies empanelled with us, we continuously aim to enhance the quality of our offerings.",
  incorporatedHeading: "A SEBI registered Debenture Trustee incorporated in 2015",
  incorporatedBody: "Formed by a group of ex-bankers and professionals from a similar domain with a high amount of experience in the Trusteeship business, the team in their previous avatars has successfully handled various Trusteeship activities.",
  certificateImage: "https://beacontrustee.co.in/assets/images/sebi-certificate-latest.png",
  missionIcon: "https://beacontrustee.co.in/assets/images/mission-who-we-are.svg",
  visionIcon: "https://beacontrustee.co.in/assets/images/circle-blue.png",
  vision: "Endeavour to be the fiduciary in the most responsible and productive manner by providing our clients with the most effective solutions.",
  mission: "To be preferred trustee for our clients through operational excellence and international service quality.",
  isoUrl: "https://beacontrustee.co.in/assets/certificate/iso.pdf",
  companyProfileUrl: "https://beacontrustee.co.in/wp-content/uploads/company_profile.pdf",
};

export default function AboutUsPage() {
  const nav = [
    { id: "overview", label: "Overview" },
    { id: "credentials", label: "Credentials" },
    { id: "mission", label: "Mission & Vision" },
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-base-white" aria-label="About Us">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -right-24 top-24 h-[520px] w-[520px] rounded-full bg-accent-gold/10 blur-3xl"
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
                Company
              </p>

              <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                {content.title.split(" ").slice(0, 4).join(" ")}
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                  {content.title.split(" ").slice(4).join(" ") || "About"}
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                {content.leadHeading}
              </p>

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <a
                  href="#overview"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Read overview <span aria-hidden="true">→</span>
                </a>
                {content.companyProfileUrl ? (
                  <a
                    href={content.companyProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    Company profile <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link
                    href="/team"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    Leadership <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Credentials
                  </p>
                  <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                    Registration and certification
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                    A snapshot of formal credentials referenced in the About export.
                  </p>

                  <div className="mt-8 border border-primary-navy/10 bg-white">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-primary-navy/10">
                      <Image
                        src={content.certificateImage}
                        alt="SEBI registration certificate"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 420px, 100vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-primary-navy/70 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute bottom-4 left-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-gold/90">
                          SEBI Registered
                        </p>
                      </div>
                    </div>
                    <div className="border-t border-primary-navy/10 px-6 py-5">
                      <p className="text-sm font-semibold text-primary-navy">{content.incorporatedHeading}</p>
                      <p className="mt-2 text-sm leading-relaxed text-primary-navy/60">
                        {content.incorporatedBody}
                      </p>
                    </div>
                  </div>

                  {content.isoUrl ? (
                    <div className="mt-6 flex items-center justify-between border border-primary-navy/10 px-6 py-5">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">ISO</p>
                        <p className="mt-2 text-sm font-semibold text-primary-navy">ISO/IEC 27001:2022</p>
                      </div>
                      <a
                        href={content.isoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] font-black uppercase tracking-[0.25em] text-primary-navy hover:text-accent-gold"
                      >
                        View <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  ) : null}

                  <div className="mt-10 h-px w-16 bg-accent-gold" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-24 lg:py-32" aria-label="About content">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3" aria-label="On this page">
              <div className="lg:sticky lg:top-32">
                <div className="border border-primary-navy/10 bg-white" data-aos="fade-up">
                  <div className="border-b border-primary-navy/10 px-6 py-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Index</p>
                  </div>
                  <nav className="px-6 py-4" aria-label="About index">
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
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Next</p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                      Explore leadership profiles and governance details.
                    </p>
                    <Link
                      href="/team"
                      className="mt-6 inline-flex w-full items-center justify-center bg-primary-navy px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                    >
                      Leadership <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <section id="overview" className="scroll-mt-28" aria-label="Overview">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Overview
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    {content.leadHeading}
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-primary-navy/60">
                    {content.leadBody}
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2" data-aos="fade-up" data-aos-delay={150}>
                  <div className="border border-primary-navy/10 bg-white p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Principle</p>
                    <p className="mt-4 text-xl font-semibold text-primary-navy">Value addition</p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                      The export emphasizes one-stop solutions backed by experience, expert opinion and
                      continuous improvement.
                    </p>
                    <div className="mt-6 h-px w-10 bg-accent-gold" aria-hidden="true" />
                  </div>
                  <div className="border border-primary-navy/10 bg-white p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Method</p>
                    <p className="mt-4 text-xl font-semibold text-primary-navy">Technology enabled</p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                      Our teams combine regulatory discipline with process clarity — built to handle
                      high-volume mandates and stakeholder reporting.
                    </p>
                    <div className="mt-6 h-px w-10 bg-accent-gold" aria-hidden="true" />
                  </div>
                </div>
              </section>

              <section id="credentials" className="mt-20 scroll-mt-28" aria-label="Credentials">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Credentials
                  </span>
                  <h2 className="mt-6 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">
                    {content.incorporatedHeading}
                  </h2>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-primary-navy/60">
                    {content.incorporatedBody}
                  </p>
                </div>

                <div className="mt-10 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
                  <div className="bg-white p-10">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-navy/10">
                      <Image
                        src={content.certificateImage}
                        alt="SEBI registration certificate"
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 900px, 100vw"
                      />
                    </div>
                    <div className="mt-8 flex flex-col gap-4 border-t border-primary-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Certificate
                        </p>
                        <p className="mt-2 text-sm font-semibold text-primary-navy">SEBI registration</p>
                      </div>
                      {content.companyProfileUrl ? (
                        <a
                          href={content.companyProfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-primary-navy px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                        >
                          Download profile <span aria-hidden="true">→</span>
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </section>

              <section id="mission" className="mt-20 scroll-mt-28" aria-label="Mission and vision">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Mission & Vision
                  </span>
                  <h2 className="mt-6 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">Direction</h2>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-primary-navy/60">
                    Two statements from the About export that frame how Beacon approaches fiduciary
                    responsibility.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2" data-aos="fade-up" data-aos-delay={150}>
                  <div className="border border-primary-navy/10 bg-white p-10">
                    <div className="flex items-center justify-between gap-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Vision</p>
                      {content.visionIcon ? (
                        <Image src={content.visionIcon} alt="" width={44} height={44} aria-hidden="true" />
                      ) : null}
                    </div>
                    <p className="mt-6 text-xl font-semibold text-primary-navy">Our Vision</p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">{content.vision}</p>
                    <div className="mt-8 h-px w-12 bg-accent-gold" aria-hidden="true" />
                  </div>

                  <div className="border border-primary-navy/10 bg-white p-10">
                    <div className="flex items-center justify-between gap-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Mission</p>
                      {content.missionIcon ? (
                        <Image src={content.missionIcon} alt="" width={44} height={44} aria-hidden="true" />
                      ) : null}
                    </div>
                    <p className="mt-6 text-xl font-semibold text-primary-navy">Our Mission</p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">{content.mission}</p>
                    <div className="mt-8 h-px w-12 bg-accent-gold" aria-hidden="true" />
                  </div>
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
