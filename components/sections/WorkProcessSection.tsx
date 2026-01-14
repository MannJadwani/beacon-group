import { bricknetWorkSteps } from "@/lib/constants/bricknet";

export function WorkProcessSection() {
  return (
    <section className="bg-base-white" aria-label="How We Work">
      <div className="wrapper px-5 py-20 lg:px-20 lg:pb-20 lg:pt-28">
        <div className="flex flex-col gap-20 lg:flex-row">
          <div className="flex flex-1 flex-col gap-10">
            <span className="label label-solid-orange">How We Work</span>
            <div className="flex flex-col gap-6">
              <h2 data-aos="fade" className="text-4xl font-medium leading-tight text-secondary-navy">
                Our Work Process
              </h2>
              <p className="text-lg leading-relaxed text-base-grey">
                A proven process to bring your ideas to life turns concepts into
                reality through strategic planning and execution.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[608px]" aria-label="Work process steps">
            {bricknetWorkSteps.map((step, idx) => (
              <article
                key={step.number}
                className="group w-full border-b border-base-grey-stroke py-10 transition-colors hover:border-primary-orange"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex items-center gap-6">
                  <div className="text-xl leading-loose">
                    <span className="font-semibold text-secondary-navy">
                      {step.number}
                    </span>
                    <span className="text-secondary-navy">/</span>
                    <span className="text-base-grey-stroke">(03)</span>
                  </div>
                  <span aria-hidden="true" className="text-xl text-secondary-navy">
                    →
                  </span>
                </div>
                <h3 className="mt-6 text-2xl font-medium leading-tight text-secondary-navy">
                  {step.title}
                </h3>
                <p className="mt-6 text-base leading-relaxed text-base-grey">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
