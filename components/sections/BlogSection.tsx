import Image from "next/image";

import { bricknetBlogPosts } from "@/lib/constants/bricknet";

export function BlogSection() {
  const [featured, ...rest] = bricknetBlogPosts;

  return (
    <section id="blog" className="bg-base-white" aria-label="Blog">
      <div className="wrapper px-5 py-20 pt-10 lg:px-20 lg:pb-28 lg:pt-20">
        <div className="flex flex-col items-center gap-20">
          <div className="flex flex-col items-center gap-10">
            <span className="label label-solid-orange">Blog</span>
            <div className="flex flex-col items-center gap-6">
              <h2 data-aos="fade" className="text-center text-4xl font-medium leading-tight text-base-black">
                Insights & Updates
              </h2>
              <p className="text-center text-lg leading-relaxed text-base-grey">
                Explore trends, tips, and inspiration in construction
              </p>
            </div>
          </div>

          <ul
            className="flex w-full list-none flex-col gap-20 p-0 lg:flex-row"
            aria-label="Blog articles"
          >
            {featured ? (
              <li className="flex flex-1 flex-col gap-8">
                <article data-aos="fade-up" className="flex w-full flex-col gap-6 pb-8">
                  {featured.imageSrc ? (
                    <a href="#" className="w-full transition-opacity hover:opacity-75">
                      <div className="relative aspect-[35/28] w-full lg:aspect-[15/7]">
                        <Image
                          src={featured.imageSrc}
                          alt={featured.imageAlt ?? ""}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                    </a>
                  ) : null}

                  <div className="flex w-full items-center justify-between">
                    <span className="label label-outline-dark">{featured.category}</span>
                    <time className="pl-5 text-lg leading-relaxed text-base-grey">
                      {featured.date}
                    </time>
                  </div>

                  <a href="#" className="transition-opacity hover:opacity-75">
                    <h3 className="text-xl font-medium leading-snug text-secondary-navy">
                      {featured.title}
                    </h3>
                  </a>

                  <div className="inline-flex items-center gap-3">
                    <span className="text-lg font-medium leading-tight text-secondary-navy">
                      {featured.author}
                    </span>
                    <span className="block size-3 rounded-full bg-primary-orange" aria-hidden="true" />
                    <span className="text-lg leading-tight text-base-grey">
                      {featured.readingTime}
                    </span>
                  </div>
                </article>
              </li>
            ) : null}

            <li className="flex flex-1 flex-col gap-8">
              {rest.map((post, idx) => (
                <article
                  key={post.title}
                  className="flex w-full flex-col gap-6 border-b border-base-grey-stroke pb-8"
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="label label-outline-dark">{post.category}</span>
                    <time className="pl-5 text-lg leading-relaxed text-base-grey">
                      {post.date}
                    </time>
                  </div>

                  <a href="#" className="transition-opacity hover:opacity-75">
                    <h3 className="text-xl font-medium leading-snug text-secondary-navy">
                      {post.title}
                    </h3>
                  </a>

                  <div className="inline-flex items-center gap-3">
                    <span className="text-lg font-medium leading-tight text-secondary-navy">
                      {post.author}
                    </span>
                    <span className="block size-3 rounded-full bg-primary-orange" aria-hidden="true" />
                    <span className="text-lg leading-tight text-base-grey">
                      {post.readingTime}
                    </span>
                  </div>
                </article>
              ))}
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
