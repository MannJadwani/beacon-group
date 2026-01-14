import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";
import {
  PortfolioItem,
  ProjectsPortfolioSection,
} from "@/components/sections/ProjectsPortfolioSection";
import { bricknetPartnerLogos } from "@/lib/constants/bricknet";

const recentWork = [
  {
    title: "Oakridge Smart Home",
    client: "Kevin & Marissa Lake",
    location: "San Diego, CA",
    date: "June 2025",
    imageSrc: "/bricknet/images/hero-04@1x.webp",
    imageAlt: "Oakridge Smart Home",
    category: "Residential Construction",
    description:
      "A modern two-story smart home featuring energy-efficient systems, open-concept living, and sustainable materials. Designed for comfort and innovation, the Oakridge project reflects our commitment to blending technology with lifestyle-focused construction.",
  },
  {
    title: "Riverfront Commercial Plaza",
    client: "Michael Chen & Associates",
    location: "Portland, OR",
    date: "September 2025",
    imageSrc: "/bricknet/images/hero-02@1x.webp",
    imageAlt: "Riverfront Commercial Plaza",
    category: "Commercial Development",
    description:
      "An innovative mixed-use commercial plaza featuring sustainable architecture, riverside dining venues, and premium office spaces. This project seamlessly integrates urban functionality with natural surroundings, creating a vibrant community hub.",
  },
  {
    title: "Mountain View Residences",
    client: "Sarah Williams Design Group",
    location: "Denver, CO",
    date: "March 2026",
    imageSrc: "/bricknet/images/hero-03@1x.webp",
    imageAlt: "Mountain View Residences",
    category: "Multi-Family Housing",
    description:
      "A luxury apartment complex featuring panoramic mountain views, state-of-the-art amenities, and eco-friendly design elements. This development combines modern living with natural beauty, offering residents an unparalleled living experience.",
  },
] as const;

const featuredProjects = [
  {
    category: "Commercial Construction",
    company: "StoneCore Real Estate",
    location: "Austin, TX",
    year: "2025",
    title: "StoneCore Office Park",
    imageSrc: "/bricknet/images/picture-fp-00@1x.webp",
  },
  {
    category: "Renovation & Remodeling",
    company: "City of Boulder",
    location: "Boulder, CO",
    year: "2025",
    title: "Elm Street Renovation",
    imageSrc: "/bricknet/images/picture-fp-01@1x.webp",
  },
  {
    category: "Commercial Construction",
    company: "Horizon Property Group",
    location: "Phoenix, AZ",
    year: "2025",
    title: "Horizon Mall Expansion",
    imageSrc: "/bricknet/images/picture-fp-02@1x.webp",
  },
] as const;

const portfolioItems: PortfolioItem[] = [
  {
    title: "Skyline Residence",
    group: "residential-construction",
    imageSrc: "/bricknet/images/picture-portfolio-00@1x.webp",
    detailsHref: "/project-details",
  },
  {
    title: "Meadowview Apartments",
    group: "residential-construction",
    imageSrc: "/bricknet/images/picture-portfolio-01@1x.webp",
    detailsHref: "/project-details",
  },
  {
    title: "Pacific Trade Hub",
    group: "commercial-construction",
    imageSrc: "/bricknet/images/picture-portfolio-02@1x.webp",
    detailsHref: "/project-details",
  },
  {
    title: "Downtown Plaza Upgrade",
    group: "renovation-remodeling",
    imageSrc: "/bricknet/images/picture-portfolio-03@1x.webp",
    detailsHref: "/project-details",
  },
  {
    title: "GreenTower Offices",
    group: "architectural-planning",
    imageSrc: "/bricknet/images/picture-portfolio-04@1x.webp",
    detailsHref: "/project-details",
  },
  {
    title: "Eastpoint Family Home",
    group: "residential-construction",
    imageSrc: "/bricknet/images/picture-portfolio-05@1x.webp",
    detailsHref: "/project-details",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <section className="bg-base-white" aria-labelledby="hero-title">
        <BricknetHeader variant="white" />

        <div
          className="mt-[80px] flex flex-col items-center gap-10 overflow-hidden px-5 pb-20 pt-20 lg:mt-[118px] lg:px-20"
          aria-labelledby="hero-title"
        >
          <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-secondary-navy px-4 py-1.5 text-sm font-medium text-secondary-navy">
            <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
              <span
                className="size-[7px] rounded-full border border-base-white bg-secondary-navy"
                aria-hidden="true"
              />
            </span>
            Projects
          </p>

          <div className="flex w-full flex-col items-center gap-6 text-center">
            <h1
              id="hero-title"
              data-aos="fade"
              className="max-w-7xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[80px] lg:leading-[88px]"
            >
              Structures That Define Standards
            </h1>
            <p
              data-aos="fade"
              data-aos-delay={300}
              className="max-w-[750px] text-lg leading-relaxed text-base-grey"
            >
              Explore our portfolio of residential and commercial projects,
              highlighting quality, precision, and impact.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-base-white" aria-label="Our Recent Work">
        <div className="wrapper flex flex-col items-center gap-10 px-5 pb-28 pt-5 lg:items-start lg:px-20 lg:pt-20">
          <header data-aos="fade-up">
            <span className="label label-solid-orange">Our Recent Work</span>
          </header>

          <div className="flex w-full flex-col gap-16" data-aos="fade-up">
            {recentWork.map((work, idx) => (
              <article
                key={work.title}
                className="flex flex-col gap-6"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex flex-col items-start justify-between gap-4 lg:flex-row">
                  <h2 className="flex-1 text-center text-3xl font-medium leading-tight text-secondary-navy lg:text-left">
                    {work.title}
                  </h2>

                  <div className="mt-4 flex w-full flex-col items-center gap-4 lg:mt-0 lg:w-auto lg:flex-row">
                    <p className="text-lg font-medium leading-tight text-secondary-navy">
                      {work.client}
                    </p>
                    <span className="hidden size-3 shrink-0 rounded-full bg-primary-orange lg:block" aria-hidden="true" />
                    <div className="flex items-center gap-4">
                      <p className="text-lg leading-tight text-base-grey">
                        {work.location}
                      </p>
                      <span className="block size-3 shrink-0 rounded-full bg-primary-orange" aria-hidden="true" />
                      <p className="text-lg leading-tight text-base-grey">
                        {work.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative aspect-[35/50] w-full lg:aspect-[64/25]">
                  <Image
                    src={work.imageSrc}
                    alt={work.imageAlt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>

                <div className="flex flex-col items-center gap-4 lg:items-start">
                  <span className="label label-outline-dark">{work.category}</span>

                  <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start">
                    <p className="w-full flex-1 text-center text-base leading-relaxed text-base-grey lg:text-left">
                      {work.description}
                    </p>
                    <Link href="/project-details" className="btn btn-outline-dark">
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

      <section className="bg-secondary-navy" aria-labelledby="featured-projects-title">
        <div className="wrapper flex flex-col items-start gap-20 px-5 pb-20 pt-20 lg:px-20 lg:pb-28">
          <h2
            id="featured-projects-title"
            data-aos="fade"
            className="w-full text-center text-4xl font-medium leading-tight text-base-white"
          >
            Featured Projects
          </h2>

          <ul className="grid w-full list-none grid-cols-1 gap-10 p-0 lg:grid-cols-3" aria-label="Featured projects">
            {featuredProjects.map((project, idx) => (
              <li
                key={project.title}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex w-full flex-col gap-8"
              >
                <div className="relative aspect-square w-full">
                  <span className="absolute left-4 top-4 z-20 inline-flex items-center rounded-full bg-base-white px-4 py-1.5 text-sm font-medium leading-tight text-secondary-navy">
                    {project.category}
                  </span>

                  <Image
                    src={project.imageSrc}
                    alt="Blog article cover image"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 33vw, 100vw"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-base font-medium leading-tight text-base-white-background">
                      {project.company}
                    </span>
                    <span className="block size-3 shrink-0 rounded-full bg-primary-orange" aria-hidden="true" />
                    <span className="text-base font-normal leading-tight text-base-white-background">
                      {project.location}
                    </span>
                    <span className="block size-3 shrink-0 rounded-full bg-primary-orange" aria-hidden="true" />
                    <span className="text-base font-normal leading-tight text-base-white-background">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-2xl font-medium leading-tight text-base-white">
                    {project.title}
                  </h3>
                </div>

                <Link
                  href="/project-details"
                  className="inline-flex items-center gap-3 text-base font-medium leading-relaxed text-primary-orange transition-colors hover:text-base-white"
                >
                  See Details
                  <span aria-hidden="true" className="text-xl">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProjectsPortfolioSection items={portfolioItems} />

      <section className="bg-base-white" aria-labelledby="partners-title">
        <div className="wrapper flex flex-col gap-20 px-5 pb-20 pt-20 lg:px-20 lg:pb-32">
          <h2
            id="partners-title"
            data-aos="fade"
            className="text-center text-2xl font-medium leading-tight text-secondary-navy"
          >
            Our Trusted Partners
          </h2>

          <div
            className="flex flex-col gap-14 lg:flex-row lg:items-start lg:justify-between lg:gap-0"
            aria-label="Partner logos"
          >
            {bricknetPartnerLogos.map((logo, idx) => (
              <div
                key={logo.src}
                className="mx-5 h-9"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={140}
                  height={36}
                  className="h-full w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
