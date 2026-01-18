import Link from "next/link";

import { bricknetPricingPlans } from "@/lib/constants/bricknet";

export function PricingSection() {
  return (
    <section className="bg-base-white" aria-label="Pricing">
      <div className="wrapper px-5 py-10 lg:p-20">
        <div className="flex flex-col items-center gap-20">
          <div className="flex flex-col items-center gap-10">
            <span className="label label-solid-orange">Service Coverage</span>
            <div className="flex flex-col items-center gap-6 px-5">
              <h2 data-aos="fade" className="text-center text-4xl font-medium leading-tight text-secondary-navy">
                Regulated and specialized trustee solutions
              </h2>
              <p className="text-center text-lg leading-relaxed text-base-grey">
                Explore core trustee mandates, regulated offerings, and specialized services.
              </p>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-3" aria-label="Pricing plans">
            {bricknetPricingPlans.map((plan, idx) => (
              <article
                key={plan.name}
                className="group flex flex-col items-center gap-10 border border-secondary-navy px-8 pb-10 pt-8 transition-colors hover:bg-secondary-navy"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex w-full flex-col gap-6">
                  <h3 className="line-clamp-1 text-2xl font-medium leading-tight text-secondary-navy transition-colors group-hover:text-base-white">
                    {plan.name}
                  </h3>
                </div>

                <div className="w-full">
                  {plan.sublabel ? (
                    <p className="text-base leading-tight text-base-grey transition-colors group-hover:text-base-white-background">
                      {plan.sublabel}
                    </p>
                  ) : (
                    <div className="h-5" aria-hidden="true" />
                  )}
                  <div className="mt-2 text-3xl font-medium leading-tight text-secondary-navy transition-colors group-hover:text-base-white">
                    {plan.price}
                  </div>
                </div>

                <Link
                  href={plan.href}
                  className="w-full bg-primary-light-orange px-6 py-3.5 text-center text-base font-medium leading-tight text-secondary-navy transition-colors duration-300 hover:bg-base-white hover:text-primary-orange group-hover:bg-primary-orange group-hover:text-base-white"
                >
                  {plan.cta}
                </Link>

                <div className="flex w-full flex-col gap-4">
                  <h4 className="text-lg font-medium leading-tight text-secondary-navy transition-colors group-hover:text-base-white">
                    Features
                  </h4>
                  <ul className="flex flex-col gap-4" aria-label="Package features">
                    {plan.features.map((feature) => (
                      <li key={feature} className="inline-flex items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="text-lg text-secondary-navy transition-colors group-hover:text-base-white"
                        >
                          ✓
                        </span>
                        <span className="text-base leading-tight text-base-grey transition-colors group-hover:text-base-grey-stroke">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
