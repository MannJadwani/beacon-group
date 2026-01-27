"use client";

import { useState, useMemo } from "react";

import Image from "next/image";

import { CtaSection } from "@/components/sections/CtaSection";

export type ContactData = {
  phone: string;
  email: string;
  address: string;
  services: string[];
  locations: Array<{
    name: string;
    type?: string;
    address?: string;
    image?: string;
  }>;
};

export type ContactFormProps = {
  data: ContactData;
};

export function ContactForm({ data }: ContactFormProps) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });

  const canSubmit = useMemo(
    () => Boolean(formState.name.trim() && formState.email.trim() && formState.phone.trim()),
    [formState.name, formState.email, formState.phone],
  );

  function buildMailto() {
    const subject = encodeURIComponent("Enquiry from Beacon website");
    const body = encodeURIComponent(
      [
        `Name: ${formState.name}`,
        `Email: ${formState.email}`,
        `Phone: ${formState.phone}`,
        formState.service ? `Service: ${formState.service}` : "",
        formState.location ? `Location: ${formState.location}` : "",
        "",
        "Message:",
        formState.message,
      ]
        .join("\n"),
    );
    return `mailto:${data.email}?subject=${subject}&body=${body}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    window.location.href = buildMailto();
  }

  return (
    <>
      <section id="form" className="scroll-mt-28" aria-label="Contact form">
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
            <form onSubmit={handleSubmit} className="space-y-8 p-10 lg:p-12">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-primary-navy">
                    Name*
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-primary-navy">
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-primary-navy">
                    Phone*
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="+91 ..."
                    required
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-sm font-semibold text-primary-navy">
                    Service
                  </label>
                  <select
                    id="service"
                    value={formState.service}
                    onChange={(e) => setFormState({ ...formState, service: e.target.value })}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                  >
                    <option value="">Select a service</option>
                    {data.services.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="location" className="text-sm font-semibold text-primary-navy">
                    Location
                  </label>
                  <select
                    id="location"
                    value={formState.location}
                    onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                    className="w-full border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                  >
                    <option value="">Select a location</option>
                    {data.locations.map((loc) => (
                      <option key={loc.name} value={loc.name} disabled={loc.type !== "City"}>
                        {loc.name}
                        {loc.type !== "City" && ` (${loc.type})`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-semibold text-primary-navy">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    rows={5}
                    className="w-full resize-none border border-primary-navy/10 bg-white px-4 py-3 text-primary-navy outline-none focus:border-accent-gold"
                    placeholder="How can we help you?"
                  />
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className={
                    "w-full px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white " +
                    (canSubmit ? "bg-primary-navy hover:bg-accent-gold" : "bg-primary-navy/40 cursor-not-allowed")
                  }
                >
                  Generate email draft <span aria-hidden="true">→</span>
                </button>
                {!canSubmit && (
                  <p className="mt-3 text-center text-sm text-primary-navy/60">
                    Please fill in the required fields.
                  </p>
                )}
              </div>

              <div className="mt-8 h-px w-16 bg-accent-gold" aria-hidden="true" />
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
          {data.locations.map((loc, idx) => (
            <div
              key={loc.name}
              className="border border-primary-navy/10 bg-white p-8 transition-all hover:border-accent-gold/30"
              data-aos="fade-up"
              data-aos-delay={loc.type === "City" ? 0 : 75}
            >
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                  {loc.image ? (
                    <div className="lg:col-span-2">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-navy/5">
                        <Image src={loc.image ?? ""} alt={loc.name} fill className="object-cover" sizes="(min-width: 1024px) 420px, 100vw" />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/80 via-transparent to-transparent" aria-hidden="true" />
                      </div>
                    </div>
                  ) : null}

                  <div className={loc.image ? "lg:col-span-2" : "lg:col-span-4"}>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                        {loc.type ?? "Other"}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-primary-navy">{loc.name}</p>
                    </div>

                    {loc.address ? (
                      <div>
                        <p className="mt-6 text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                          Address
                        </p>
                        <p className="mt-2 text-base text-primary-navy/60 break-words">{loc.address}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
