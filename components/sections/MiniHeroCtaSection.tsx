import Image from "next/image";
import Link from "next/link";

type MiniHeroCtaSectionProps = {
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt: string;
};

export function MiniHeroCtaSection({
  title,
  description,
  buttonLabel,
  buttonHref,
  imageSrc,
  imageAlt,
}: MiniHeroCtaSectionProps) {
  return (
    <section className="relative bg-primary-light-orange" aria-label={title}>
      <div className="wrapper flex flex-col lg:flex-row">
        <div className="flex w-full flex-col items-start justify-center gap-10 px-5 py-20 lg:w-1/2 lg:p-20">
          <div className="flex w-full flex-col gap-6">
            <h2
              data-aos="fade"
              className="text-4xl font-medium leading-tight text-secondary-navy"
            >
              {title}
            </h2>
            <p
              data-aos="fade"
              data-aos-delay={200}
              className="text-lg leading-relaxed text-secondary-navy"
            >
              {description}
            </p>
          </div>
          <Link
            href={buttonHref}
            className="btn btn-solid-dark"
            aria-label={buttonLabel}
          >
            {buttonLabel}
            <span aria-hidden="true" className="text-xl">
              →
            </span>
          </Link>
        </div>

        <div className="relative aspect-square w-full lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </div>
    </section>
  );
}
