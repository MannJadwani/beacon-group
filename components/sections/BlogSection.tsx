import Image from "next/image";

import { bricknetBlogPosts } from "@/lib/constants/bricknet";

export function BlogSection() {
  const [featured, ...rest] = bricknetBlogPosts;

  return (
    <section id="research" className="bg-white py-24 lg:py-32" aria-label="Research">
      <div className="wrapper px-5 lg:px-20">
        <div className="mb-20 space-y-6 lg:mb-24">
          <span className="inline-block bg-primary-navy px-3 py-1 text-[10px] font-black tracking-[0.3em] uppercase text-white">
            Library
          </span>
          <h2 className="text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
            Research & <br /> Regulatory Updates
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          {featured ? (
            <div data-aos="fade-right">
              <article className="group space-y-8">
                {featured.imageSrc && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={featured.imageSrc}
                      alt={featured.imageAlt ?? ""}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary-navy/20 transition-opacity group-hover:opacity-0" />
                  </div>
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-accent-gold">
                    <span>{featured.category}</span>
                    <span className="h-px w-8 bg-accent-gold/30" />
                    <time className="text-secondary-light-navy">{featured.date}</time>
                  </div>
                  <h3 className="text-3xl font-medium leading-tight text-primary-navy lg:text-4xl">
                    <a href={featured.href} className="hover:text-accent-gold transition-colors">
                      {featured.title}
                    </a>
                  </h3>
                  <a href={featured.href} className="inline-flex h-12 w-12 items-center justify-center border border-primary-navy transition-all group-hover:bg-primary-navy group-hover:text-white">
                    ↓
                  </a>
                </div>
              </article>
            </div>
          ) : null}

          <div className="space-y-0 border-t border-primary-navy/10">
            {rest.map((post, idx) => (
              <article
                key={post.title}
                className="group border-b border-primary-navy/10 py-10 transition-colors hover:bg-primary-navy hover:text-white"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="px-6 space-y-4">
                   <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-accent-gold">
                    <span>{post.category}</span>
                    <time className="text-secondary-light-navy group-hover:text-white/60">{post.date}</time>
                  </div>
                  <h3 className="text-2xl font-medium leading-tight text-primary-navy lg:text-3xl group-hover:text-white">
                    <a href={post.href} className="hover:text-accent-gold transition-colors">
                      {post.title}
                    </a>
                  </h3>
                  <a href={post.href} className="inline-flex text-xs font-bold tracking-widest text-primary-navy group-hover:text-white/80 hover:text-accent-gold transition-colors">
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
