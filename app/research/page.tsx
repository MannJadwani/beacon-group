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

const data = {
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
  ] as ResearchItem[],
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
    },
    {
      title: "Modification In The Conditions Specified For Reduction ...",
      href: "https://beacontrustee.co.in/cms/documents/png/hyuiikjsdfghjk_20251223184359_3693.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/hyuiikjsdfghjk_20251223184359_3693.jpg",
      views: 6
    },
    {
      title: "SEBI Board Meeting - 17th December 2025",
      href: "https://beacontrustee.co.in/cms/documents/png/sbm147852369_20251223181808_1617.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/sbm147852369_20251223181808_1617.jpg",
      views: 4
    },
    {
      title: "Mandating Periodic Disclosure Requirements - Securitise...",
      href: "https://beacontrustee.co.in/cms/documents/png/7896543210147_20251219151642_8308.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/7896543210147_20251219151642_8308.jpg",
      views: 6
    },
    {
      title: "Relaxation On Geo-tagging Requirement In India For NRIs...",
      href: "https://beacontrustee.co.in/cms/documents/png/25896314745698_20251212162447_7300.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/25896314745698_20251212162447_7300.jpg",
      views: 6
    },
    {
      title: "Clarification On The Digital Accessibility Circulars Of...",
      href: "https://beacontrustee.co.in/cms/documents/png/123456789iuytrewq_20251210175838_1228.png",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/123456789iuytrewq_20251210175838_1228.png",
      views: 5
    },
    {
      title: "Modalities For Migration To AI Only Schemes And Relaxa...",
      href: "https://beacontrustee.co.in/cms/documents/png/zxcvbnmlkjhgfdsa_20251209182824_5171.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/zxcvbnmlkjhgfdsa_20251209182824_5171.jpg",
      views: 4
    },
    {
      title: "Modifications To Chapter IV Of The Master Circular For ...",
      href: "https://beacontrustee.co.in/cms/documents/png/dt_modification_20251203181242_4265.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/dt_modification_20251203181242_4265.jpg",
      views: 6
    },
    {
      title: "Specification Of The Terms And Conditions For Debenture...",
      href: "https://beacontrustee.co.in/cms/documents/png/dt45_20251202182226_3626.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/dt45_20251202182226_3626.jpg",
      views: 2
    },
    {
      title: "Timeline For Submission Of Information By The Issuer To...",
      href: "https://beacontrustee.co.in/cms/documents/png/dt_20251201182006_3571.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/dt_20251201182006_3571.jpg",
      views: 3
    },
    {
      title: "Relaxation In Timeline For Disclosure Of Allocation Met...",
      href: "https://beacontrustee.co.in/cms/documents/png/relaxation_in_timeline_for_disclosure_of_allocation_0987_20251017173914_4093.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/relaxation_in_timeline_for_disclosure_of_allocation_0987_20251017173914_4093.jpg",
      views: 10
    },
    {
      title: "Compliance Guidelines For Digital Accessibility Circula...",
      href: "https://beacontrustee.co.in/cms/documents/png/2016879654_20250926174110_7955.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/2016879654_20250926174110_7955.jpg",
      views: 11
    },
    {
      title: "SEBI Board Meeting - 12th September 2025",
      href: "https://beacontrustee.co.in/cms/documents/png/bm_12thsept_20250918184148_2164.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/bm_12thsept_20250918184148_2164.jpg",
      views: 10
    },
    {
      title: "Revised Regulatory Framework For Angel Funds Under AIF ...",
      href: "https://beacontrustee.co.in/cms/documents/png/7896543210_20250912182917_1651.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/7896543210_20250912182917_1651.jpg",
      views: 4
    },
    {
      title: "Framework For AIFs To Make Co-investment Within The AIF...",
      href: "https://beacontrustee.co.in/cms/documents/png/258147369_20250912171317_7872.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/258147369_20250912171317_7872.jpg",
      views: 6
    },
    {
      title: "Extension Of Timelines And Update Of Reporting Authorit...",
      href: "https://beacontrustee.co.in/cms/documents/png/0147852369_20250901180426_9468.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/0147852369_20250901180426_9468.jpg",
      views: 8
    },
    {
      title: "Rights Of Persons With Disabilities Act, 2016 And Rules...",
      href: "https://beacontrustee.co.in/cms/documents/png/369963_20250811182016_5569.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/369963_20250811182016_5569.jpg",
      views: 3
    },
    {
      title: "Reserve Bank Of India (Investment In AIF) Directions, 2...",
      href: "https://beacontrustee.co.in/cms/documents/png/reserve_bank_of_india_(investment_in_aif)_directions,_2025_20250731172739_6896.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/reserve_bank_of_india_(investment_in_aif)_directions,_2025_20250731172739_6896.jpg",
      views: 9
    },
    {
      title: "Extension Towards Adoption And Implementation Of Cybers...",
      href: "https://beacontrustee.co.in/cms/documents/png/extension_towards_adoption_and_implementation_of_cybersecurity_and_cyber_resilience_20250701173146_9519.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/extension_towards_adoption_and_implementation_of_cybersecurity_and_cyber_resilience_20250701173146_9519.jpg",
      views: 11
    },
    {
      title: "SEBI Board Meeting - 18th June 2025",
      href: "https://beacontrustee.co.in/cms/documents/png/sbm_-_18th_june_2025_20250624163529_5794.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/sbm_-_18th_june_2025_20250624163529_5794.jpg",
      views: 13
    },
    {
      title: "Extension Of Timeline Of Additional Liquidation Period ...",
      href: "https://beacontrustee.co.in/cms/documents/png/aif_circular_20250609180644_6096.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/aif_circular_20250609180644_6096.jpg",
      views: 9
    },
    {
      title: "Review Of Provisions Pertaining To Electronic Book Prov...",
      href: "https://beacontrustee.co.in/cms/documents/png/ksyom_20250522175859_9226.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/ksyom_20250522175859_9226.jpg",
      views: 10
    },
    {
      title: "Rating Of Municipal Bonds On The Expected Loss (EL) Bas...",
      href: "https://beacontrustee.co.in/cms/documents/png/municipal_jpeg_20250519181031_2069.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/municipal_jpeg_20250519181031_2069.jpg",
      views: 11
    },
    {
      title: "Extension Of Timeline For Complying With The Certificat...",
      href: "https://beacontrustee.co.in/cms/documents/png/aif_new_circular_20250514174342_9366.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/aif_new_circular_20250514174342_9366.jpg",
      views: 7
    },
    {
      title: "SECURITIES AND EXCHANGE BOARD OF INDIA (LISTING OBLIGAT...",
      href: "https://beacontrustee.co.in/cms/documents/png/sebi_lodr_img_20250404182723_3305.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/sebi_lodr_img_20250404182723_3305.jpg",
      views: 18
    },
    {
      title: "Extension Towards Adoption And Implementation Of Cybers...",
      href: "https://beacontrustee.co.in/cms/documents/png/cscrf_&_res_20250331180442_2207.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/cscrf_&_res_20250331180442_2207.jpg",
      views: 10
    },
    {
      title: "SEBI Board Meeting - 24th March 2025",
      href: "https://beacontrustee.co.in/cms/documents/png/sebi_board_meeting_-_24th_march_2025_20250328174022_7147.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/sebi_board_meeting_-_24th_march_2025_20250328174022_7147.jpg",
      views: 15
    },
    {
      title: "Relaxation In Timeline For Reporting Of Differential Ri...",
      href: "https://beacontrustee.co.in/cms/documents/png/67890_20250304181333_5748.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/67890_20250304181333_5748.jpg",
      views: 13
    },
    {
      title: "Relaxation In Timelines For Holding AIFs' Investments...",
      href: "https://beacontrustee.co.in/cms/documents/png/circular_14th_feb_20250218162205_6834.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/circular_14th_feb_20250218162205_6834.jpg",
      views: 13
    },
    {
      title: "Private Placement Of Non-Convertible Debentures (NCDs) ...",
      href: "https://beacontrustee.co.in/cms/documents/png/nbfc_hfc_circular_20250204154845_6514.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/nbfc_hfc_circular_20250204154845_6514.jpg",
      views: 12
    },
    {
      title: "Measures For Ease Of Doing Business For Credit Rating A...",
      href: "https://beacontrustee.co.in/cms/documents/png/measures_for_ease_of_doing_business_for_credit_rating_agencies_(cras)_timelines_jpeg_20250110171710_8964.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/measures_for_ease_of_doing_business_for_credit_rating_agencies_(cras)_timelines_jpeg_20250110171710_8964.jpg",
      views: 22
    },
    {
      title: "SEBI Board Meeting - 18th December 2024",
      href: "https://beacontrustee.co.in/cms/documents/png/sebi_board_meeting_-_18th_december_2024_20241219172635_8911.jpg",
      imageSrc: "https://beacontrustee.co.in/cms/documents/png/sebi_board_meeting_-_18th_december_2024_20241219172635_8911.jpg",
      views: null
    }
  ] as ResearchItem[],
  categories: {
    reports: ["AIF", "Securitization"],
    updates: ["AIF", "Debenture Trustee", "Investor Grievances", "Board Meetings", "Others"]
  },
  contact: {
    phone: "+91 8451844276",
    email: "research@beacontrustee.co.in"
  }
};

export default function ResearchPage() {
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
