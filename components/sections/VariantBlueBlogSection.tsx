import Image from "next/image";

import { bricknetBlogPosts } from "@/lib/constants/bricknet";

export function VariantBlueBlogSection() {
  const [featured, ...rest] = bricknetBlogPosts;

  return (
    <section id="research" className="relative bg-white py-24 lg:py-32 overflow-hidden" aria-label="Research">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-[#183EFA]/3 blur-3xl" />
      
      <div className="wrapper px-5 lg:px-20">
        <div className="mb-20 space-y-6 lg:mb-24">
          <span className="inline-block bg-[#183EFA] px-4 py-2 text-[10px] font-bold tracking-[0.3em] uppercase text-white rounded-full shadow-lg shadow-[#183EFA]/25">
            Library
          </span>
          <h2 className="text-4xl font-semibold leading-[1.1] text-[#183EFA] lg:text-6xl">
            Research & <br /> Regulatory Updates
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {featured ? (
            <div data-aos="fade-right">
              <article className="group space-y-8">
                {featured.imageSrc && (
                  <div className="relative aspect-video overflow-hidden rounded-3xl shadow-xl shadow-[#183EFA]/10 transition-all group-hover:shadow-2xl group-hover:-translate-y-1">
                    <Image
                      src={featured.imageSrc}
                      alt={featured.imageAlt ?? ""}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#183EFA]/40 to-transparent transition-opacity group-hover:opacity-60" />
                  </div>
                )}
                
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <span className="bg-[#EDE44C]/20 text-[#183EFA] px-3 py-1 rounded-full">{featured.category}</span>
                    <time className="text-[#183EFA]/50">{featured.date}</time>
                  </div>
                  <h3 className="font-serif text-2xl leading-tight text-[#183EFA] lg:text-3xl">
                    <a href={featured.href} className="transition-colors hover:text-[#183EFA]/70">
                      {featured.title}
                    </a>
                  </h3>
                  <a href={featured.href} className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#183EFA]/5 text-[#183EFA] transition-all hover:bg-[#183EFA] hover:text-white shadow-lg">
                    ↓
                  </a>
                </div>
              </article>
            </div>
          ) : null}

          <div className="space-y-8">
            {rest.map((post, idx) => (
              <article
                key={post.title}
                className="group rounded-2xl bg-gradient-to-br from-[#f8faff] to-white p-8 shadow-lg shadow-[#183EFA]/5 transition-all hover:shadow-xl hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="space-y-4">
                   <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
                    <span className="bg-[#EDE44C]/20 text-[#183EFA] px-3 py-1 rounded-full">{post.category}</span>
                    <time className="text-[#183EFA]/50">{post.date}</time>
                  </div>
                  <h3 className="font-serif text-xl leading-tight text-[#183EFA] lg:text-2xl">
                    <a href={post.href} className="transition-colors hover:text-[#183EFA]/70">
                      {post.title}
                    </a>
                  </h3>
                  <a href={post.href} className="inline-flex text-xs font-bold tracking-widest text-[#183EFA] hover:text-[#183EFA]/70 transition-colors">
                    DOWNLOAD PDF →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
