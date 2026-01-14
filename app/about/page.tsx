import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { MiniHeroCtaSection } from "@/components/sections/MiniHeroCtaSection";

const luckyNumbers = [
  { value: "35+", label: "Industry Awards" },
  { value: "1500+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
] as const;

const storyPillars = [
  {
    iconSrc: "/bricknet/images/icon-handshake.svg",
    title: "Client Commitment",
    description:
      "Strong buildings start with strong relationships. We prioritize trust, clear and clean communication, and keeping our promises.",
  },
  {
    iconSrc: "/bricknet/images/icon-magnifying.svg",
    title: "Integrity in Every Detail",
    description:
      "We build with honesty and care, ensuring quality and transparency from start to finish.",
  },
  {
    iconSrc: "/bricknet/images/icon-lightbulb.svg",
    title: "Innovation-Driven",
    description:
      "We adopt smart technologies and sustainable methods to improve efficiency and results.",
  },
] as const;

const teamMembers = [
  { name: "Lucas Breen", role: "Founder & CEO", image: "/bricknet/images/picture-team-00@1x.webp" },
  { name: "Amanda Reyes", role: "Founder & CEO", image: "/bricknet/images/picture-team-01@1x.webp" },
  { name: "Jordan Kim", role: "Founder & CEO", image: "/bricknet/images/picture-team-02@1x.webp" },
  { name: "Tariq Hassan", role: "Founder & CEO", image: "/bricknet/images/picture-team-03@1x.webp" },
  { name: "Jordan Lowey", role: "Founder & CEO", image: "/bricknet/images/picture-team-04@1x.webp" },
  { name: "John Andreas", role: "Founder & CEO", image: "/bricknet/images/picture-team-05@1x.webp" },
] as const;

const projectPreviews = [
  { title: "Skyline Residence", image: "/bricknet/images/picture-blog-00@1x.webp" },
  { title: "StoneCore Office Park", image: "/bricknet/images/picture-blog-02@1x.webp" },
] as const;

export default function AboutPage() {
  return (
    <main>
      <section className="bg-base-white" aria-label="Hero section">
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
            About Us
          </p>

          <div className="flex w-full flex-col items-center gap-6 text-center">
            <h1
              id="hero-title"
              data-aos="fade"
              className="max-w-7xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[80px] lg:leading-[88px]"
            >
              More Than Builders — We’re Your Construction Partners
            </h1>
            <p
              data-aos="fade"
              data-aos-delay={300}
              className="max-w-[750px] text-lg leading-relaxed text-base-grey"
            >
              Learn what drives our team and how we turn visions into lasting
              structures.
            </p>
          </div>
        </div>

        <div className="relative h-[600px] w-full -mt-8 lg:-mt-6">
          <Image
            src="/bricknet/images/hero-02@1x.webp"
            alt="Modern city skyline with architectural structures"
            fill
            className="object-cover object-[50%_71%]"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="metrics-title">
        <div className="wrapper flex flex-col items-start gap-20 px-5 pt-20 lg:p-20">
          <header className="flex w-full flex-col items-center gap-10">
            <span className="label label-solid-orange">Our Lucky Numbers</span>
            <h2
              id="metrics-title"
              data-aos="fade"
              className="text-center text-3xl font-medium leading-tight text-secondary-navy lg:text-4xl"
            >
              Our track record and experiences reflect{" "}
              <span className="text-primary-orange">our commitment</span> to
              quality, safety, and client satisfaction
            </h2>
          </header>

          <ul
            className="mx-auto flex w-full list-none flex-col items-center justify-center p-0 lg:flex-row"
            aria-label="Key metrics and statistics"
          >
            {luckyNumbers.map((metric, idx) => (
              <li
                key={metric.label}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex w-full flex-col items-center gap-6 border-b border-base-grey-stroke py-6 last:border-b-0 lg:w-auto lg:flex-row lg:items-end lg:border-b-0 lg:border-l lg:px-10 lg:first:border-l-0"
              >
                <strong className="text-center text-7xl font-medium leading-tight text-secondary-navy lg:text-6xl">
                  {metric.value}
                </strong>
                <span className="w-full text-center text-lg font-medium leading-relaxed text-base-grey lg:w-24 lg:text-left lg:text-base lg:font-normal">
                  {metric.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="story-title">
        <div className="wrapper flex flex-col items-start gap-20 px-5 pb-28 pt-20 lg:px-20">
          <header className="flex w-full flex-col items-start gap-10">
            <span className="label label-solid-orange">Our Story</span>
            <h2
              id="story-title"
              className="text-4xl font-medium leading-tight text-secondary-navy"
            >
              Built with Purpose Our Journey from Passion to Industry Leadership
            </h2>
          </header>

          <div className="flex w-full flex-col gap-10 lg:flex-row">
            <div className="relative h-[600px] w-full lg:w-[620px]">
              <Image
                src="/bricknet/images/picture-story@1x.webp"
                alt="Modern city skyline with architectural structures"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 620px, 100vw"
              />
            </div>

            <div className="flex flex-1 flex-col gap-10">
              <p data-aos="fade" className="text-lg leading-relaxed text-base-grey">
                From humble beginnings to industry-leading builds, our story is
                shaped by passion, craftsmanship, and a commitment to delivering
                lasting impact through every structure we create.
              </p>

              <ul className="m-0 list-none p-0" aria-label="Our story milestones">
                {storyPillars.map((pillar, idx) => (
                  <li
                    key={pillar.title}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="flex gap-6 border-b border-base-grey-stroke py-8 last:border-b-0"
                  >
                    <Image
                      src={pillar.iconSrc}
                      alt=""
                      width={40}
                      height={40}
                      aria-hidden="true"
                    />
                    <div className="flex flex-1 flex-col gap-2">
                      <h3 className="text-2xl font-medium leading-tight text-secondary-navy">
                        {pillar.title}
                      </h3>
                      <p className="text-base leading-relaxed text-base-grey">
                        {pillar.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary-navy" aria-labelledby="video-title">
        <div className="wrapper flex flex-col items-start gap-20 px-5 pb-28 pt-20 lg:px-20">
          <header className="flex w-full flex-col items-center gap-10">
            <span className="label label-solid-dark-orange">Our Introduction</span>
            <div className="flex w-full flex-col items-center gap-6 text-center">
              <h2
                id="video-title"
                data-aos="fade"
                className="text-4xl font-medium leading-tight text-base-white lg:text-5xl"
              >
                See How We Build
              </h2>
              <p
                data-aos="fade"
                data-aos-delay={200}
                className="text-lg leading-relaxed text-base-white-background"
              >
                Watch our story unfold from blueprints to reality, and the
                passion behind every brick.
              </p>
            </div>
          </header>

          <div className="w-full" data-aos="fade-up">
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                className="absolute inset-0 h-full w-full"
                src="https://www.youtube.com/embed/nIOUg5TV5Uc?si=BoAYeBc3Rzc2ZB-S"
                title="BrickNet Construction Company Introduction Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="sr-only" id="video-description">
              A video showcasing BrickNet&apos;s construction projects, team, and
              building process from blueprints to completed structures.
            </div>
          </div>
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="team-title">
        <div className="wrapper flex flex-col items-start gap-20 px-5 pb-5 pt-28 lg:px-20 lg:pb-20">
          <header className="flex w-full flex-col items-center gap-10">
            <span className="label label-solid-orange">Our Team</span>
            <div className="flex w-full flex-col items-center gap-6">
              <h2
                id="team-title"
                data-aos="fade"
                className="text-center text-4xl font-medium leading-tight text-base-black"
              >
                Meet the Team
              </h2>
              <p
                data-aos="fade"
                data-aos-delay={200}
                className="text-center text-lg leading-relaxed text-base-grey"
              >
                Professionals united by purpose, experience, and a commitment to
                building better
              </p>
            </div>
          </header>

          <ul
            className="grid w-full list-none grid-cols-1 gap-10 p-0 lg:grid-cols-3"
            aria-label="Team members"
          >
            {teamMembers.map((member, idx) => (
              <li
                key={member.name}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
                className="flex flex-col gap-6 border border-base-grey-stroke pb-6"
              >
                <div className="relative aspect-[40/48] w-full">
                  <Image
                    src={member.image}
                    alt="Team"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 400px, 100vw"
                  />
                </div>
                <div className="flex items-center justify-center gap-3 px-1 lg:px-6">
                  <h3 className="line-clamp-2 text-lg font-medium leading-tight text-secondary-navy">
                    {member.name}
                  </h3>
                  <span
                    className="block size-3 shrink-0 rounded-full bg-primary-orange"
                    aria-hidden="true"
                  />
                  <p className="line-clamp-2 text-lg font-normal leading-tight text-base-grey">
                    {member.role}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-base-white" aria-labelledby="projects-title">
        <div className="wrapper flex flex-col items-start gap-20 px-5 pb-20 pt-20 lg:flex-row lg:px-20 lg:pb-28">
          <div className="flex w-full flex-col gap-10 lg:w-96">
            <span className="label label-solid-orange">Projects</span>
            <div className="flex w-full flex-1 flex-col justify-between">
              <header className="mb-20 flex flex-col gap-6">
                <h2
                  id="projects-title"
                  data-aos="fade"
                  className="text-4xl font-medium leading-tight text-secondary-navy"
                >
                  Our Real World Work in Action
                </h2>
                <p
                  data-aos="fade"
                  data-aos-delay={200}
                  className="text-lg leading-relaxed text-base-grey"
                >
                  Browse through some of our proudest builds and transformations
                </p>
              </header>

              <Link
                href="/projects"
                className="btn btn-outline-dark"
                aria-label="Explore More Project"
              >
                Explore More Project
                <span aria-hidden="true" className="text-xl">
                  →
                </span>
              </Link>
            </div>
          </div>

          <ul
            className="grid flex-1 list-none grid-cols-1 gap-10 p-0 lg:grid-cols-2"
            aria-label="Featured projects"
          >
            {projectPreviews.map((project, idx) => (
              <li
                key={project.title}
                data-aos="fade-left"
                data-aos-delay={idx * 100}
                className="flex flex-col gap-6"
              >
                <Link
                  href="/project-details"
                  className="w-full transition-opacity hover:opacity-75"
                  aria-label="See project details"
                >
                  <div className="relative aspect-[37/40] w-full">
                    <Image
                      src={project.image}
                      alt="Blog article cover image"
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 450px, 100vw"
                    />
                  </div>
                </Link>

                <Link
                  href="/project-details"
                  className="line-clamp-2 text-2xl font-medium leading-tight text-secondary-navy transition-opacity hover:opacity-75"
                >
                  {project.title}
                </Link>

                <Link
                  href="/project-details"
                  className="mt-auto inline-flex items-center gap-3 text-base font-medium leading-tight text-secondary-navy transition-colors hover:text-primary-orange"
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
