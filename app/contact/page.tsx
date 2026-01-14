import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { MiniHeroCtaSection } from "@/components/sections/MiniHeroCtaSection";

const faqs = [
  {
    question: "What areas do you serve?",
    answer:
      "We primarily serve clients across California, but we’re open to select projects in neighboring states based on scope and timeline.",
  },
  {
    question: "How early should I contact you for a new project?",
    answer:
      "We primarily serve clients across California, but we’re open to select projects in neighboring states based on scope and timeline.",
  },
  {
    question: "Do you offer free consultations?",
    answer:
      "We primarily serve clients across California, but we’re open to select projects in neighboring states based on scope and timeline.",
  },
  {
    question: "Can you help with permits and documentation?",
    answer:
      "We primarily serve clients across California, but we’re open to select projects in neighboring states based on scope and timeline.",
  },
  {
    question: "Do you work with custom designs or only in-house plans?",
    answer:
      "We primarily serve clients across California, but we’re open to select projects in neighboring states based on scope and timeline.",
  },
] as const;

export default function ContactPage() {
  return (
    <main>
      <section className="bg-base-white" aria-labelledby="contact-title">
        <BricknetHeader variant="white" />

        <div
          className="mt-[80px] flex flex-col items-center gap-10 overflow-hidden px-5 pb-20 pt-20 lg:mt-[118px] lg:px-20"
          aria-labelledby="contact-title"
        >
          <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-secondary-navy px-4 py-1.5 text-sm font-medium text-secondary-navy">
            <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
              <span
                className="size-[7px] rounded-full border border-base-white bg-secondary-navy"
                aria-hidden="true"
              />
            </span>
            Our Contact
          </p>

          <div className="flex w-full flex-col items-center gap-6 text-center">
            <h1
              id="contact-title"
              data-aos="fade"
              className="max-w-7xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[80px] lg:leading-[88px]"
            >
              Let’s Talk About Your Project
            </h1>
            <p
              data-aos="fade"
              data-aos-delay={300}
              className="max-w-[750px] text-lg leading-relaxed text-base-grey"
            >
              Whether you&apos;re planning, building, or renovating, we’re here to
              help. Reach out today and let’s build something exceptional
              together.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary-navy" aria-labelledby="contact-detail-title">
        <div className="wrapper grid grid-cols-1 gap-20 px-5 py-20 lg:grid-cols-2 lg:px-20 lg:py-28">
          <div data-aos="fade-up" className="flex flex-col gap-20">
            <div className="flex flex-col gap-10">
              <span className="label label-solid-orange">Contact Details</span>

              <div className="flex flex-col gap-6">
                <h2
                  id="contact-detail-title"
                  className="text-4xl font-medium leading-tight text-base-white"
                >
                  Let&apos;s Work Together
                </h2>
                <p className="text-lg font-normal leading-tight text-base-white-background">
                  Whether you have a question, need more details about our
                  services, or want to discuss a potential collaboration,
                  we&apos;re here to help.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-10 lg:flex-row">
                <div className="w-full flex-1 border-t border-base-grey-stroke pt-8">
                  <h3 className="text-xl font-normal leading-tight text-base-grey-stroke">
                    Message Us
                  </h3>
                  <p className="mt-4 text-lg font-medium leading-tight text-base-white">
                    contact@bricknetbuilds.com
                  </p>
                </div>

                <div className="w-full flex-1 border-t border-base-grey-stroke pt-8">
                  <h3 className="text-xl font-normal leading-tight text-base-grey-stroke">
                    Call Us
                  </h3>
                  <p className="mt-4 text-lg font-medium leading-tight text-base-white">
                    (555) 483-2190
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-base-grey-stroke pt-8 lg:flex-row lg:justify-between">
                <h3 className="text-xl font-normal leading-tight text-base-grey-stroke">
                  Location
                </h3>
                <p className="text-lg font-medium leading-tight text-base-white">
                  82 Westfield Industrial Blvd, San Diego, CA 92101
                </p>
              </div>

              <div className="flex flex-col gap-4 border-t border-base-grey-stroke pt-8 lg:flex-row lg:justify-between">
                <h3 className="text-xl font-normal leading-tight text-base-grey-stroke">
                  Business Hours
                </h3>
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-medium leading-tight text-base-white">
                    Monday - Friday, 8:00 AM - 6:00 PM
                  </p>
                  <p className="text-lg font-medium leading-tight text-base-white">
                    Saturday: 9:00 AM – 2:00 PM
                  </p>
                  <p className="text-lg font-medium leading-tight text-base-white">
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form
            data-aos="fade-up"
            data-aos-delay={300}
            className="flex flex-col items-center gap-10 bg-base-white px-10 py-8"
            action="#"
            method="post"
            aria-label="Contact form"
          >
            <h2 className="text-center text-2xl font-medium leading-10 text-secondary-navy">
              Send Us Message!
            </h2>

            <div className="flex w-full flex-col gap-6">
              <div className="flex flex-col gap-3">
                <label htmlFor="fullName" className="text-base font-medium text-secondary-navy">
                  Full Name*
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full border border-base-grey-stroke px-4 py-3 text-secondary-navy outline-none focus:border-primary-orange"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="text-base font-medium text-secondary-navy">
                  Email Address*
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Your email"
                  className="w-full border border-base-grey-stroke px-4 py-3 text-secondary-navy outline-none focus:border-primary-orange"
                />
              </div>

              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="flex w-full flex-1 flex-col gap-3">
                  <label htmlFor="phone" className="text-base font-medium text-secondary-navy">
                    Phone Number*
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="Your phone number"
                    className="w-full border border-base-grey-stroke px-4 py-3 text-secondary-navy outline-none focus:border-primary-orange"
                  />
                </div>

                <div className="flex w-full flex-1 flex-col gap-3">
                  <label htmlFor="projectType" className="text-base font-medium text-secondary-navy">
                    Project Type*
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    defaultValue=""
                    className="w-full border border-base-grey-stroke bg-base-white px-4 py-3 text-secondary-navy outline-none focus:border-primary-orange"
                  >
                    <option value="" disabled>
                      Select project type
                    </option>
                    <option value="residential">Residential Construction</option>
                    <option value="commercial">Commercial Construction</option>
                    <option value="renovation">Renovation</option>
                    <option value="consultation">Consultation</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label htmlFor="message" className="text-base font-medium text-secondary-navy">
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell us about your project..."
                  className="h-36 w-full resize-none border border-base-grey-stroke px-4 py-3 text-secondary-navy outline-none focus:border-primary-orange"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-solid-orange mt-auto w-full">
              Send Message
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </button>
          </form>
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="map-title">
        <div className="wrapper flex flex-col items-start gap-20 px-5 pb-10 pt-28 lg:px-20 lg:pb-20">
          <header className="flex w-full flex-col items-center gap-10">
            <span className="label label-outline-orange">Our Location</span>
            <h2
              id="map-title"
              data-aos="fade"
              className="text-center text-4xl font-medium leading-tight text-secondary-navy lg:text-6xl lg:leading-[72px]"
            >
              Find Us on the Map
            </h2>
          </header>

          <div
            data-aos="fade-up"
            className="relative h-[620px] w-full overflow-hidden"
            aria-label="Google Map showing our location"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3224.779676193483!2d-79.78655032410002!3d36.074477672462876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88531f788d8b10f5%3A0xb752ae29e59d143b!2sPeter%20Draws!5e0!3m2!1sen!2sid!4v1757708841340!5m2!1sen!2sid"
              title="Google Maps showing Bricknet office location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="faq-title">
        <div className="wrapper flex flex-col items-center gap-20 px-5 pb-28 pt-10 lg:px-20 lg:pt-20">
          <header className="flex w-full flex-col items-center gap-10">
            <span className="label label-solid-orange">FAQs</span>
            <div className="flex flex-col items-center gap-6 text-center">
              <h2
                id="faq-title"
                data-aos="fade"
                className="text-4xl font-medium leading-tight text-secondary-navy"
              >
                Need Help Before You Build?
              </h2>
              <p
                data-aos="fade"
                data-aos-delay={200}
                className="text-lg leading-relaxed text-base-grey"
              >
                Find quick answers to the most common inquiries from new and
                returning clients
              </p>
            </div>
          </header>

          <div className="w-full" aria-label="Frequently Asked Questions">
            {faqs.map((faq, idx) => (
              <details
                key={faq.question}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="group border-b border-base-grey-stroke py-10 last:border-b-0 lg:p-10"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-10 lg:items-center">
                  <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[120px]">
                    <div className="w-10 text-2xl font-medium leading-tight text-primary-orange">
                      {(idx + 1).toString().padStart(2, "0")}
                    </div>
                    <div className="flex-1 text-2xl font-medium leading-tight text-secondary-navy">
                      {faq.question}
                    </div>
                  </div>
                  <span
                    className="mt-1.5 inline-flex size-10 items-center justify-center text-3xl text-secondary-navy transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  >
                    ▾
                  </span>
                </summary>
                <div className="mt-6 pl-0 text-lg leading-relaxed text-base-grey lg:pl-[160px]">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <MiniHeroCtaSection
        title="Find the Right Service for Your Build"
        description="Explore our construction services for new homes, resident, expansions, and renovations."
        buttonLabel="View All Projects"
        buttonHref="/projects"
        imageSrc="/bricknet/images/picture-minihero@1x.webp"
        imageAlt="Modern city skyline with architectural structures"
      />

      <BricknetFooter />
    </main>
  );
}
