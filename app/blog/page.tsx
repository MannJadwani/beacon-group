import fs from "node:fs";
import path from "node:path";

import Image from "next/image";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type BlogPost = {
  title: string;
  href: string;
  imageSrc: string;
};

function normalizeText(input: string) {
  return input.replaceAll("**", "").replace(/\s+/g, " ").trim();
}

function absolutizeBeaconPath(url: string) {
  if (!url) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (url.startsWith("/")) return `https://beacontrustee.co.in${url}`;
  return `https://beacontrustee.co.in/${url}`;
}

function parseBlog(markdown: string): {
  categories: string[];
  posts: BlogPost[];
} {
  const lines = markdown.split(/\r?\n/);

  const start = lines.findIndex((l) => l.trim() === "# Welcome to our Blog");
  const discover = lines.findIndex((l, i) => i > start && l.trim() === "## Discover Our Blogs");
  const slice = lines.slice(start >= 0 ? start + 1 : 0, discover > 0 ? discover : lines.length);

  const categories = slice
    .map((l) => l.trim())
    .filter((l) => l.startsWith("*") && !l.includes("[") && l.length > 2)
    .map((l) => normalizeText(l.replace(/^\*\s+/, "")))
    .filter(Boolean);

  const topPostsIndex = lines.findIndex((l) => l.trim() === "#### Top Posts");
  const endIndex = lines.findIndex((l, i) => i > topPostsIndex && l.trim().startsWith("#### Follow Us On"));

  const posts: BlogPost[] = [];

  if (topPostsIndex >= 0) {
    for (let i = topPostsIndex + 1; i < (endIndex > 0 ? endIndex : lines.length); i++) {
      const line = lines[i].trim();

      // Pattern in export:
      // [![Alt](image_url)
      //
      // ##### Title](href)
      if (!line.startsWith("[![")) continue;

      const altEnd = line.indexOf("](");
      if (altEnd < 0) continue;

      const alt = line.slice(3, altEnd);

      const urlStart = altEnd + 2;
      const urlEnd = line.lastIndexOf(")");
      if (urlEnd < 0 || urlEnd <= urlStart) continue;
      const imageSrc = absolutizeBeaconPath(line.slice(urlStart, urlEnd));

      // Find the next non-empty line containing the link target.
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;
      if (j >= lines.length) continue;

      const titleLine = lines[j].trim();
      if (!titleLine.startsWith("#####")) continue;

      const linkStart = titleLine.lastIndexOf("](");
      const linkEnd = titleLine.lastIndexOf(")");
      if (linkStart < 0 || linkEnd < 0 || linkEnd <= linkStart + 2) continue;

      const title = normalizeText(
        titleLine
          .replace(/^#####\s+/, "")
          .slice(0, linkStart - "##### ".length)
          .trim(),
      ) || normalizeText(alt);

      const href = absolutizeBeaconPath(titleLine.slice(linkStart + 2, linkEnd));

      posts.push({
        title,
        href,
        imageSrc,
      });

      i = j;
    }
  }

  // De-dupe by href
  const seen = new Set<string>();
  const deduped = posts.filter((p) => {
    if (seen.has(p.href)) return false;
    seen.add(p.href);
    return true;
  });

  return {
    categories,
    posts: deduped,
  };
}

export default function BlogPage() {
  const mdPath = path.join(process.cwd(), "content", "blog", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { categories, posts } = parseBlog(md);

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Blog">
        <div className="swiss-grid absolute inset-0 opacity-[0.03]" aria-hidden="true" />

        <div className="relative mt-[80px] px-5 pb-16 pt-16 lg:mt-[118px] lg:px-20 lg:pb-24">
          <div className="wrapper grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7" data-aos="fade-right">
              <p className="inline-flex items-center gap-2 rounded-full outline outline-[0.5px] outline-primary-navy px-4 py-1.5 text-sm font-medium text-primary-navy">
                <span className="flex size-3 items-center justify-center rounded-full bg-base-white-background">
                  <span
                    className="size-[7px] rounded-full border border-base-white bg-accent-gold"
                    aria-hidden="true"
                  />
                </span>
                Insights
              </p>

              <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                Welcome to our
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">Blog</span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Perspectives on trusteeship, regulation, and market infrastructure, built for
                issuers, investors, and practitioners.
              </p>

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <a
                  href="#posts"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Browse posts <span aria-hidden="true">→</span>
                </a>
                <a
                  href="https://twitter.com/beacontrustee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                >
                  Follow updates <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
              {/* Category board */}
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Topics
                  </p>
                  <p className="mt-4 text-2xl font-medium leading-tight text-primary-navy">
                    Browse by theme
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-primary-navy/60">
                    The content export includes the following categories.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {(categories.length > 0
                      ? categories
                      : ["All", "Security Trustee", "Debenture Trustee", "AIF", "Securitization", "REITs"]
                    ).map((cat) => (
                      <span
                        key={cat}
                        className="rounded-sm border border-primary-navy/10 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-primary-navy/60"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>

                  <div className="mt-10 border-t border-primary-navy/10 pt-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Count
                    </p>
                    <p className="mt-3 text-3xl font-medium tabular-nums text-primary-navy">
                      {posts.length}
                    </p>
                    <p className="mt-2 text-sm text-primary-navy/60">Top posts listed in source.</p>
                    <div className="mt-6 h-px w-16 bg-accent-gold" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section id="posts" className="bg-white py-24 lg:py-32 scroll-mt-28" aria-label="Top posts">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Top posts
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Discover our blogs
            </h2>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, idx) => (
                <a
                  key={post.href}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white transition-colors hover:bg-primary-navy hover:text-white"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-navy">
                    <Image
                      src={post.imageSrc}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary-navy/70 via-transparent to-transparent opacity-90"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-gold/80">
                        Post {String(idx + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Beacon Blog
                    </p>
                    <h3 className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                      {post.title}
                    </h3>
                    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Read <span className="text-accent-gold">→</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaSection />
      <BricknetFooter />
    </main>
  );
}
