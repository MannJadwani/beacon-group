import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { ProjectDetailsModal } from "@/components/sections/ProjectDetailsModal";

const detailItems = [
  { title: "Service", value: "Residential Construction" },
  { title: "Date", value: "June 2025" },
  { title: "Location", value: "San Diego, CA" },
  { title: "Client", value: "Kevin & Marissa Lake" },
] as const;

const workProcess = [
  {
    title: "Client Consultation & Concept Development",
    description:
      "We start by understanding clients' unique needs and preferences, defining goals and technology choices to create a tailored vision.",
  },
  {
    title: "Architectural Design & Smart Planning",
    description:
      "We integrate smart home systems and sustainable features into the design, focusing on energy efficiency, eco-friendliness, and modern aesthetics.",
  },
  {
    title: "Construction & Systems Integration",
    description:
      "We ensure high-quality construction while seamlessly incorporating automation systems and green solutions, balancing innovation with craftsmanship.",
  },
  {
    title: "Final Walkthrough & Training",
    description:
      "Upon project completion, we guide clients through every aspect of the home, providing a detailed walkthrough of all systems and functionalities.",
  },
] as const;

const highlights = [
  "/bricknet/images/highlights-01@1x.webp",
  "/bricknet/images/highlights-02@1x.webp",
  "/bricknet/images/highlights-03@1x.webp",
  "/bricknet/images/highlights-04@1x.webp",
] as const;

const relatedProjects = [
  {
    title: "Skyline Residence",
    category: "Residential Construction",
    imageSrc: "/bricknet/images/picture-blog-00@1x.webp",
  },
  {
    title: "Elm Street Renovation",
    category: "Renovation & Remodeling",
    imageSrc: "/bricknet/images/picture-fp-01@1x.webp",
  },
  {
    title: "Eastpoint Family Home",
    category: "Residential Construction",
    imageSrc: "/bricknet/images/picture-portfolio-05@1x.webp",
  },
] as const;

export default function ProjectDetailsPage() {
  return (
    <main>
      <section className="bg-base-white" aria-labelledby="project-title">
        <div className="wrapper flex flex-col">
          <BricknetHeader variant="white" />

          <div className="mt-[80px] flex w-full flex-col items-center gap-10 px-5 pb-10 pt-20 lg:mt-[118px] lg:px-20">
            <div className="flex w-full flex-col items-start justify-center gap-6 lg:flex-row lg:items-end">
              <h1
                id="project-title"
                data-aos="fade-right"
                className="flex-1 text-4xl font-medium leading-tight text-secondary-navy"
              >
                Oakridge Smart Home
              </h1>
              <p
                data-aos="fade-left"
                className="flex-1 text-lg leading-relaxed text-base-grey"
              >
                Oakridge Smart Home in San Diego combines smart and clean
                technology, sustainable materials, and redefining modern living.
              </p>
            </div>

            <div data-aos="fade-up" className="relative aspect-[35/50] w-full lg:aspect-[128/50]">
              <Image
                src="/bricknet/images/hero-05@1x.webp"
                alt="Modern city skyline with architectural structures"
                fill
                className="object-cover object-[0%_50%] lg:object-center"
                sizes="100vw"
                priority
              />
            </div>

            <div className="w-full border-b border-base-grey-stroke pb-10">
              <div className="grid grid-cols-1 gap-y-10 lg:grid-cols-4">
                {detailItems.map((item, idx) => (
                  <article
                    key={item.title}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="flex flex-col gap-2"
                  >
                    <h2 className="text-xl font-semibold leading-relaxed text-secondary-navy">
                      {item.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-base-grey">
                      {item.value}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="project-value-title">
        <div className="wrapper flex flex-col gap-16 px-5 pb-20 pt-10 lg:flex-row lg:px-20">
          <div data-aos="fade-up" className="flex flex-col gap-6">
            <h2
              id="project-value-title"
              className="text-2xl font-medium leading-tight text-secondary-navy"
            >
              Project Value
            </h2>
            <p className="text-3xl font-semibold leading-tight text-primary-orange">
              $1.2 Million
            </p>
          </div>

          <div data-aos="fade-up" data-aos-delay={300} className="flex-1">
            <h2 className="text-3xl font-medium leading-tight text-secondary-navy">
              About Project
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-base-grey">
              The Oakridge Smart Home project began with a clear client vision: a
              tech-integrated, future-ready home that harmonizes comfort, design,
              and sustainability. Our team worked closely with the Lakes to
              create a custom build featuring solar panels, home automation,
              energy-efficient HVAC, and minimalist interiors. The home includes
              4 bedrooms, 3 bathrooms, a home office, and outdoor living space
              designed for family gatherings and relaxation.
            </p>

            <div className="relative mt-8 h-[400px] w-full">
              <Image
                src="/bricknet/images/hero-06@2x.webp"
                alt="Blog Image"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 800px, 100vw"
              />
            </div>

            <h3 className="mt-10 text-2xl font-medium leading-tight text-secondary-navy">
              Work Process
            </h3>
            <ul className="mt-6 flex flex-col gap-8">
              {workProcess.map((step) => (
                <li key={step.title}>
                  <h4 className="text-xl font-semibold leading-relaxed text-secondary-navy">
                    {step.title}
                  </h4>
                  <p className="mt-2 text-lg leading-relaxed text-base-grey">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <ProjectDetailsModal />
            </div>

            <h3 className="mt-10 text-2xl font-medium leading-tight text-secondary-navy">
              Completed Highlights
            </h3>
            <p className="mt-2 text-lg leading-relaxed text-base-grey">
              A glimpse into the Oakridge Smart Home features and finishes
            </p>

            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
              {highlights.map((src) => (
                <div key={src} className="relative aspect-[492/240] w-full">
                  <Image
                    src={src}
                    alt="Modern city skyline with architectural structures"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>

            <blockquote className="mt-10 border-l-4 border-primary-orange pl-6">
              <p className="text-lg leading-relaxed text-secondary-navy">
                Working with Bricknet was an outstanding experience. From design
                to final handover, they delivered everything we imagined, if not
                more. The smart features are seamless, and the finishes are
                top-notch. It truly feels like home.
              </p>
              <footer className="mt-6 text-base text-base-grey">
                <span className="font-semibold text-secondary-navy">Kevin Lake</span>
                <span className="mx-3 text-primary-orange" aria-hidden="true">
                  •
                </span>
                Homeowner
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="related-projects-title">
        <div className="wrapper flex flex-col items-start gap-16 px-5 pb-28 pt-10 lg:px-20 lg:pt-20">
          <h2
            id="related-projects-title"
            data-aos="fade"
            className="w-full text-center text-4xl font-medium leading-tight text-secondary-navy"
          >
            Related Projects
          </h2>

          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3" aria-label="Related projects list">
            {relatedProjects.map((project, idx) => (
              <article
                key={project.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex flex-col gap-6"
              >
                <div className="relative aspect-square w-full">
                  <Image
                    src={project.imageSrc}
                    alt="Blog article cover image"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>

                <div className="flex flex-col gap-6">
                  <h3 className="text-2xl font-medium leading-tight text-secondary-navy">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-between gap-5">
                    <span className="label label-outline-dark">{project.category}</span>
                    <Link
                      href="/project-details"
                      className="inline-flex items-center gap-3 text-base font-medium leading-relaxed text-primary-orange transition-opacity hover:opacity-75"
                    >
                      See Details
                      <span aria-hidden="true" className="text-xl">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary-light-navy" aria-labelledby="cta-title">
        <div className="wrapper flex flex-col items-center justify-center gap-16 px-5 py-20 lg:p-20">
          <div className="flex w-full max-w-[980px] flex-col items-center gap-6 border-b border-base-white pb-16 text-center">
            <h2
              id="cta-title"
              data-aos="fade"
              className="text-4xl font-medium leading-tight text-base-white lg:text-[80px]"
            >
              Let’s Build What’s Next
            </h2>
            <p
              data-aos="fade"
              data-aos-delay={200}
              className="text-lg leading-snug text-base-white"
            >
              Ready to start your own project or curious about what else we’ve
              built? Explore more of our work, our services, or connect with the
              Bricknet team.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-10 lg:flex-row">
            <Link href="/projects" className="btn btn-solid-white" aria-label="View More Project">
              View More Project
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </Link>
            <Link href="/contact" className="btn btn-outline-white" aria-label="Contact Our Team">
              Contact Our Team
              <span aria-hidden="true" className="text-xl">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <BricknetFooter />
    </main>
  );
}
