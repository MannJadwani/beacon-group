import { bricknetValues } from "@/lib/constants/bricknet";

export function VariantBlueValuesSection() {
  return (
    <section className="relative bg-gradient-to-b from-white to-[#f8faff] py-24 lg:py-32 overflow-hidden" aria-label="Why Beacon">
      {/* Decorative elements */}
      <div className="absolute top-40 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#183EFA]/3 blur-3xl" />
      
      <div className="wrapper px-5 lg:px-20">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">
          <div className="lg:w-1/3">
            <div data-aos="fade-right" className="sticky top-32 space-y-8">
              <span className="inline-block bg-[#183EFA] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white rounded-full shadow-lg shadow-[#183EFA]/25">
                Our Values
              </span>
              <h2 className="text-4xl font-semibold leading-[1.1] text-[#183EFA] lg:text-6xl">
                Why Beacon <br /> Trusteeship?
              </h2>
              <p className="text-lg text-[#183EFA]/50">
                Institutional governance meets <br /> entrepreneurial speed.
              </p>
            </div>
          </div>

          <div className="flex-1">
            <div
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
              aria-label="Company values"
            >
              {bricknetValues.map((value, idx) => (
                <article
                  key={value.title}
                  className="group relative flex flex-col space-y-6 rounded-3xl bg-white p-10 shadow-xl shadow-[#183EFA]/5 transition-all hover:shadow-2xl hover:-translate-y-1"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#EDE44C]/20 to-[#EDE44C]/5 text-[#183EFA] transition-all group-hover:from-[#EDE44C] group-hover:to-[#f5ed8a] group-hover:shadow-lg group-hover:shadow-[#EDE44C]/25">
                    <span className="text-xl font-bold">0{idx + 1}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold tracking-tight text-[#183EFA]">
                      {value.title}
                    </h3>
                    <p className="text-base leading-relaxed text-[#183EFA]/50">
                      {value.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
