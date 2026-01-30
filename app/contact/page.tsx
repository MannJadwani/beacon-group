import Image from "next/image";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

const CONTACT_DATA = {
  phone: "+91 9555449955",
  email: "contact@beacontrustee.co.in",
  address: "5W, 5th Floor, The Metropolitan, E-Block, Bandra Kurla Complex, Bandra (E), Mumbai 400051",
  services: [
    "Alternative Investment Fund",
    "Bond Trustee",
    "Commercial Paper Trustee",
    "Debenture Trustee",
    "Enforcement Activity",
    "Escrow Agent",
    "Facility Agent",
    "Legal Documentation",
    "Safe Keeping",
    "Securitization (DA)",
    "Security Trustee",
    "Share Pledge Trustee",
    "ESOP Trustee",
    "Securitization (PTC)",
    "Securitization (C&P-PLI)",
    "Securitization (SDI)",
    "Securitization (C&P-PCE)",
    "Employee Welfare Trust",
    "Advisory Services",
    "REIT & InvIT",
    "Deposit Trustee",
  ],
  locations: [
    { name: "Mumbai", type: "Registered" },
    { name: "Ahmedabad", type: "Rep" },
    { name: "Bangalore", type: "Rep" },
    { name: "Chennai", type: "Rep" },
    { name: "Delhi", type: "Branch" },
    { name: "Hyderabad", type: "Rep" },
    { name: "IFSC Gandhinagar", type: "Branch" },
    { name: "Jaipur", type: "Rep" },
    { name: "Pune", type: "Rep" },
    { name: "Singapore", type: "Rep" },
    { name: "Dubai", type: "Rep" },
    { name: "Mauritius", type: "Rep" },
  ],
  offices: [
    {
      name: "Mumbai",
      type: "Registered & Corporate Office",
      address: "5W, 5th Floor, The Metropolitan, E-Block, Bandra Kurla Complex, Bandra (E), Mumbai 400051",
      image: "https://beacontrustee.co.in/assets/images/offc5.png",
    },
    {
      name: "Ahmedabad",
      type: "Rep. Office",
      address: "A/6, Abhivruddhi CHS, Opp Gujarat Vidyapith, Ashram Road, Ahmedabad- 380006",
      image: "https://beacontrustee.co.in/assets/images/offc6.png",
    },
    {
      name: "Bangalore",
      type: "Rep. Office",
      address: "3rd Floor, 53 to 58, Sri Chakravarthy Complex, V V Puram, Sajjan Rao Circle, Bangalore- 560004",
      image: "https://beacontrustee.co.in/assets/images/offc7.png",
    },
    {
      name: "Chennai",
      type: "Rep. Office",
      address: "Flat No.10, III Floor, Parsn Commercial Complex, No. 1, Kodambakkam High Road, Nungambakkam, Chennai - 600034",
      image: "https://beacontrustee.co.in/assets/images/offc8.png",
    },
    {
      name: "Delhi",
      type: "Branch Office",
      address: "715, 7th Floor, Naurang House, Building 21, Kausturba Gandhi Marg, New Delhi- 110001",
      image: "https://beacontrustee.co.in/assets/images/offc9.png",
    },
    {
      name: "Hyderabad",
      type: "Rep. Office",
      address: "#8-2-120/77, Park View Enclave, Plot no 92/A, 3rd Floor, Road No 2, Banjara Hills, Hyderabad 500034",
      image: "https://beacontrustee.co.in/assets/images/offc10.png",
    },
    {
      name: "IFSC Gandhinagar",
      type: "Branch Office",
      address: "1639, Hiranandani Signature, GIFT City, IFSC, Gandhinagar",
      image: "https://beacontrustee.co.in/assets/images/offc14.png",
    },
    {
      name: "Jaipur",
      type: "Rep. Office",
      address: "Behind Kamla Devi, Budhiya Goverment School, Jaipur- 302021",
      image: "https://beacontrustee.co.in/assets/images/offc12.png",
    },
    {
      name: "Pune",
      type: "Rep. Office",
      address: "Bakori Road, Pune 412207",
      image: "https://beacontrustee.co.in/assets/images/offc13.png",
    },
  ],
};

export default function ContactPage() {
  const nav = [
    { id: "details", label: "Contact Details" },
    { id: "form", label: "Contact Form" },
    { id: "locations", label: "Offices" },
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      <section className="relative overflow-hidden bg-base-white" aria-label="Contact us">
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
                Contact Us
              </p>

              <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                Get in touch.
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                  We&apos;re here to help.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Whether you have a question, need more details about our services, or want to discuss a
                potential collaboration, reach out today.
              </p>

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <a
                  href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, "")}`}
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Call us <span aria-hidden="true">→</span>
                </a>
                <a
                  href={`mailto:${CONTACT_DATA.email}`}
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  Email us <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Quick contact
                  </p>
                  <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">Reach out directly</p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                    Phone and email for general enquiries.
                  </p>

                  <div className="mt-8 grid grid-cols-1 gap-4">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Phone</p>
                      <a
                        href={`tel:${CONTACT_DATA.phone.replace(/\s+/g, "")}`}
                        className="mt-2 block text-base font-semibold text-primary-navy hover:text-accent-gold"
                      >
                        {CONTACT_DATA.phone}
                      </a>
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Email</p>
                      <a
                        href={`mailto:${CONTACT_DATA.email}`}
                        className="mt-2 block break-words text-base font-semibold text-primary-navy hover:text-accent-gold"
                      >
                        {CONTACT_DATA.email}
                      </a>
                    </div>
                  </div>

                  <div className="mt-8 border-t border-primary-navy/10 pt-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Address</p>
                    <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                      Registered & Corporate Office in Mumbai.
                    </p>
                    <p className="mt-2 text-base font-semibold text-primary-navy break-words">
                      {CONTACT_DATA.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-24 lg:py-32" aria-label="Contact content">
        <div className="wrapper px-5 lg:px-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <aside className="lg:col-span-3" aria-label="On this page">
              <div className="lg:sticky lg:top-32">
                <div className="border border-primary-navy/10 bg-white" data-aos="fade-up">
                  <div className="border-b border-primary-navy/10 px-6 py-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Index</p>
                  </div>
                  <nav className="px-6 py-4" aria-label="Contact index">
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
                    <a
                      href="/team"
                      className="mt-6 inline-flex w-full items-center justify-center bg-primary-navy px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-white hover:bg-accent-gold"
                    >
                      Leadership <span aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <section id="details" className="scroll-mt-28" aria-label="Contact details">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Contact details
                  </span>
                  <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
                    Get in touch
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                    Fill out the form or reach us directly via phone or email.
                  </p>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
                  <div className="bg-white p-10">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Phone</p>
                        <p className="mt-2 text-2xl font-medium tabular-nums text-primary-navy">{CONTACT_DATA.phone}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Email</p>
                        <a
                          href={`mailto:${CONTACT_DATA.email}`}
                          className="mt-2 block break-words text-base font-semibold text-primary-navy hover:text-accent-gold"
                        >
                          {CONTACT_DATA.email}
                        </a>
                      </div>
                      <div className="lg:col-span-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">Address</p>
                        <p className="mt-2 text-base font-semibold text-primary-navy break-words">
                          {CONTACT_DATA.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section id="form" className="mt-20 scroll-mt-28" aria-label="Contact form">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Contact form
                  </span>
                  <h2 className="mt-6 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">
                    Send an enquiry
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                    This form generates an email draft. Attach any documents after the draft opens.
                  </p>
                </div>

                <div className="mt-12 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
                  <div className="bg-white">
                    <form className="space-y-8 p-10 lg:p-12">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-primary-navy">
                            Name*
                          </label>
                          <input
                            type="text"
                            placeholder="Your full name"
                            required
                            className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-primary-navy">
                            Email*
                          </label>
                          <input
                            type="email"
                            placeholder="you@example.com"
                            required
                            className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-primary-navy">
                            Phone*
                          </label>
                          <input
                            type="tel"
                            placeholder="+91 ..."
                            required
                            className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text font-semibold text-primary-navy">
                            Service
                          </label>
                          <select className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold">
                            <option value="">Select a service</option>
                            {CONTACT_DATA.services.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-primary-navy">
                            Location
                          </label>
                          <select className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold">
                            <option value="">Select a location</option>
                            {CONTACT_DATA.locations.map((loc) => (
                              <option key={loc.name} value={loc.name}>
                                {loc.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-semibold text-primary-navy">
                            Message
                          </label>
                          <textarea
                            rows={5}
                            placeholder="How can we help you?"
                            className="w-full resize-none border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                          />
                        </div>
                      </div>

                      <div className="mt-8">
                        <button
                          type="submit"
                          className="w-full px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white bg-primary-navy hover:bg-accent-gold"
                        >
                          Generate email draft <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </section>

              <section id="locations" className="mt-20 scroll-mt-28" aria-label="Offices">
                <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
                  <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                    <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
                    Our offices
                  </span>
                  <h2 className="mt-6 text-3xl font-medium leading-tight text-primary-navy lg:text-5xl">
                    Presence across India and offshore
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                    Beacon operates from Mumbai and has presence in major Indian
                    cities and international locations.
                  </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2" data-aos="fade-up" data-aos-delay={150}>
                  {CONTACT_DATA.offices.map((office) => (
                    <div
                      key={office.name}
                      className="border border-primary-navy/10 bg-white p-8 transition-all hover:border-accent-gold/30"
                    >
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                        {office.image ? (
                          <div className="lg:col-span-2">
                            <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-navy/5">
                              <Image
                                src={office.image}
                                alt={office.name}
                                fill
                                className="object-cover"
                                sizes="(min-width: 1024px) 420px, 100vw"
                              />
                              <div
                                className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-transparent to-transparent"
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        ) : null}

                        <div className={office.image ? "lg:col-span-2" : "lg:col-span-4"}>
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                              {office.type}
                            </p>
                            <p className="mt-2 text-2xl font-semibold text-primary-navy">{office.name}</p>
                          </div>

                          {office.address ? (
                            <div>
                              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                                Address
                              </p>
                              <p className="mt-2 text-base font-semibold text-primary-navy break-words">
                                {office.address}
                              </p>
                            </div>
                          ) : null}
                        </div>
                      </div>
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
