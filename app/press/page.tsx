import fs from "node:fs";
import path from "node:path";

import Image from "next/image";
import Link from "next/link";

import { BricknetFooter } from "@/components/layout/BricknetFooter";
import { BricknetHeader } from "@/components/layout/BricknetHeader";
import { CtaSection } from "@/components/sections/CtaSection";

type ListingImage = {
  src: string;
  number: string;
};

type NewsArticle = {
  title: string;
  href: string;
  date: string;
  sourceLogo: string;
  imageSrc: string;
};

type MagazineCover = {
  coverSrc: string;
  pdfUrl: string;
};

type VideoItem = {
  title: string;
  url: string;
};

function normalizeText(input: string) {
  return input.replaceAll("**", "").replace(/\s+/g, " ").trim();
}

function parsePress(markdown: string): {
  title: string;
  listingImages: ListingImage[];
  news: NewsArticle[];
  viewAllNewsUrl: string;
  covers: MagazineCover[];
  videos: VideoItem[];
} {
  const lines = markdown.split(/\r?\n/);

  const start = lines.findIndex((l) => l.trim() === "# First and only listed Trustee company in India");
  const end = lines.findIndex((l) => l.trim() === "## Testimonials");
  const slice = lines.slice(start >= 0 ? start : 0, end > 0 ? end : lines.length);

  const title = "Press & Media";

  const newsHeadingIndex = slice.findIndex((l) => l.trim() === "## News Articles");
  const coversHeadingIndex = slice.findIndex((l) => l.trim() === "## Business Magazines Cover");
  const videosHeadingIndex = slice.findIndex((l) => l.trim() === "## Featured Videos");

  // Listing images (NSE ceremony photos)
  const listingImages: ListingImage[] = [];
  const listingSlice = slice.slice(
    1,
    newsHeadingIndex > 0 ? newsHeadingIndex : slice.length,
  );
  for (const raw of listingSlice) {
    const line = raw.trim();
    const m = line.match(/^!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
    if (!m) continue;
    listingImages.push({
      src: m[1],
      number: String(listingImages.length + 1).padStart(2, "0"),
    });
  }

  // News articles
  const news: NewsArticle[] = [];
  let viewAllNewsUrl = "";
  if (newsHeadingIndex >= 0) {
    const newsSlice = slice.slice(
      newsHeadingIndex + 1,
      coversHeadingIndex > 0 ? coversHeadingIndex : slice.length,
    );

    let currentLogo = "";
    let currentTitle = "";
    let currentHref = "";
    let currentImage = "";
    let currentDate = "";

    function pushCurrent() {
      if (!currentTitle || !currentHref) return;
      news.push({
        title: currentTitle,
        href: currentHref,
        date: currentDate,
        sourceLogo: currentLogo,
        imageSrc: currentImage,
      });
    }

    for (const raw of newsSlice) {
      const line = raw.trim();
      if (!line) continue;

      const viewAll = line.match(/^\[VIEW ALL NEWS\]\((https?:\/\/[^)]+)\)/i);
      if (viewAll) {
        viewAllNewsUrl = viewAll[1];
        continue;
      }

      const logo = line.match(/^!\[logo\]\((https?:\/\/[^)]+)\)/i);
      if (logo) {
        // If a new logo starts and we already have an article in progress, flush.
        if (currentTitle && currentHref) {
          pushCurrent();
          currentTitle = "";
          currentHref = "";
          currentImage = "";
          currentDate = "";
        }
        currentLogo = logo[1];
        continue;
      }

      const link = line.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)/);
      if (link && !line.toUpperCase().includes("VIEW ALL NEWS")) {
        currentTitle = normalizeText(link[1]);
        currentHref = link[2];
        continue;
      }

      const img = line.match(/^!\[[^\]]*\]\((https?:\/\/[^)]+)\)/);
      if (img && currentTitle) {
        currentImage = img[1];
        continue;
      }

      const date = line.match(/^\d{1,2}\s+[A-Za-z]+,\s+\d{4}$/);
      if (date) {
        currentDate = line;
        pushCurrent();
        currentLogo = "";
        currentTitle = "";
        currentHref = "";
        currentImage = "";
        currentDate = "";
      }
    }
  }

  // Magazine covers
  const covers: MagazineCover[] = [];
  if (coversHeadingIndex >= 0) {
    const coverSlice = slice.slice(
      coversHeadingIndex + 1,
      videosHeadingIndex > 0 ? videosHeadingIndex : slice.length,
    );

    for (const raw of coverSlice) {
      const line = raw.trim();
      const m = line.match(/^\[!\[[^\]]*\]\((https?:\/\/[^)]+)\)\]\((https?:\/\/[^)]+)\)/);
      if (!m) continue;
      covers.push({ coverSrc: m[1], pdfUrl: m[2] });
    }
  }

  // Videos
  const videos: VideoItem[] = [];
  if (videosHeadingIndex >= 0) {
    const videoSlice = slice.slice(videosHeadingIndex + 1);

    let pendingUrl = "";
    for (let i = 0; i < videoSlice.length; i++) {
      const line = videoSlice[i].trim();
      if (!line) continue;

      const vidLink = line.match(/^\[!\[[^\]]*\]\([^)]*\)\]\((https?:\/\/[^)]+)\)/);
      if (vidLink) {
        pendingUrl = vidLink[1];
        continue;
      }

      const titleMatch = line.match(/^####\s+(.+)/);
      if (titleMatch && pendingUrl) {
        videos.push({
          title: normalizeText(titleMatch[1]),
          url: pendingUrl,
        });
        pendingUrl = "";
      }
    }
  }

  return {
    title,
    listingImages,
    news,
    viewAllNewsUrl,
    covers,
    videos,
  };
}

export default function PressPage() {
  const mdPath = path.join(process.cwd(), "content", "press", "index.md");
  const md = fs.readFileSync(mdPath, "utf8");

  const { listingImages, news, viewAllNewsUrl, covers, videos } = parsePress(md);

  const nav = [
    { id: "listing", label: "Listing" },
    { id: "news", label: "News" },
    { id: "covers", label: "Covers" },
    { id: "videos", label: "Videos" },
  ];

  return (
    <main id="top" className="min-h-screen bg-white text-primary-navy">
      <BricknetHeader variant="white" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-base-white" aria-label="Press and media">
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
                Press & Media
              </p>

              <h1 className="mt-8 max-w-6xl text-4xl font-medium leading-tight text-secondary-navy lg:text-[84px] lg:leading-[92px]">
                A public company,
                <br />
                <span className="font-sans font-black uppercase tracking-tighter text-accent-gold">
                  documented.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-primary-navy/60">
                Listing milestones, coverage, magazine features and leadership appearances.
              </p>

              <div className="mt-10 flex flex-col gap-px bg-primary-navy/10 p-px sm:flex-row sm:max-w-xl">
                <a
                  href="#news"
                  className="flex items-center justify-center gap-3 bg-primary-navy px-10 py-6 text-[12px] font-black uppercase tracking-widest text-white transition-all hover:bg-accent-gold"
                >
                  Browse news <span aria-hidden="true">→</span>
                </a>
                {viewAllNewsUrl ? (
                  <a
                    href={viewAllNewsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    View all <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="flex items-center justify-center gap-3 bg-white px-10 py-6 text-[12px] font-black uppercase tracking-widest text-primary-navy transition-all hover:bg-primary-navy/[0.02]"
                  >
                    Contact us <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            </div>

            <div className="lg:col-span-5" data-aos="fade-left" data-aos-delay={150}>
              <div className="bg-primary-navy/10 p-px">
                <div className="bg-white p-10">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                    Pressroom index
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-px bg-primary-navy/10">
                    {[
                      { label: "Gallery", value: String(listingImages.length), id: "listing" },
                      { label: "Articles", value: String(news.length), id: "news" },
                      { label: "Covers", value: String(covers.length), id: "covers" },
                      { label: "Videos", value: String(videos.length), id: "videos" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={`#${s.id}`}
                        className="group bg-white p-6 hover:bg-primary-navy hover:text-white transition-colors"
                      >
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                          {s.label}
                        </p>
                        <p className="mt-3 text-2xl font-medium tabular-nums text-primary-navy group-hover:text-white">
                          {s.value}
                        </p>
                        <div className="mt-4 h-px w-14 bg-accent-gold" aria-hidden="true" />
                      </a>
                    ))}
                  </div>

                  <div className="mt-10 border-t border-primary-navy/10 pt-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40">
                      Quick jump
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {nav.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className="rounded-sm border border-primary-navy/10 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-widest text-primary-navy/60 hover:text-accent-gold"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero panel */}
        <div className="relative h-[420px] w-full -mt-8 lg:-mt-6" data-aos="fade-up" data-aos-delay={200}>
          <Image
            src={
              listingImages[0]?.src ||
              "https://beacontrustee.co.in/assets/images/banners/head-banner-2.jpg"
            }
            alt="Listing ceremony"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/60 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute bottom-8 left-5 lg:bottom-12 lg:left-20">
            <div className="glass flex items-center gap-4 rounded-lg px-6 py-4">
              <div className="flex h-12 w-12 items-center justify-center rounded bg-white p-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy">
                  NSE
                </span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  First and only listed trustee company in India
                </p>
                <p className="text-xs text-white/70">Ticker: BEACON</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listing gallery */}
      <section id="listing" className="bg-white py-24 lg:py-32 scroll-mt-28" aria-label="Listing gallery">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Listing
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Listing ceremony contact sheet
            </h2>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-4">
              {listingImages.map((img) => (
                <div key={img.src} className="relative bg-primary-navy/70">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={img.src}
                      alt={`NSE listing image ${img.number}`}
                      fill
                      className="object-cover opacity-90"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary-navy/65 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-3 left-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-gold/85">
                        Frame {img.number}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="bg-base-white py-24 lg:py-32 scroll-mt-28" aria-label="News articles">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              News
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              News articles
            </h2>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {news.map((article, idx) => (
                <a
                  key={`${article.href}-${idx}`}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white transition-colors hover:bg-primary-navy hover:text-white"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-primary-navy">
                    {article.imageSrc ? (
                      <Image
                        src={article.imageSrc}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-primary-navy/80" />
                    )}
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary-navy/70 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute top-4 left-4 flex items-center gap-3">
                      {article.sourceLogo ? (
                        <div className="relative h-6 w-20">
                          <Image
                            src={article.sourceLogo}
                            alt="Source"
                            fill
                            className="object-contain brightness-0 invert"
                            sizes="80px"
                          />
                        </div>
                      ) : (
                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
                          Source
                        </span>
                      )}

                      {article.date && (
                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
                          {article.date}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Article {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                      {article.title}
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

      {/* Covers */}
      <section id="covers" className="bg-white py-24 lg:py-32 scroll-mt-28" aria-label="Magazine covers">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Covers
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Magazine cover features
            </h2>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
              {covers.map((cover, idx) => (
                <a
                  key={cover.pdfUrl}
                  href={cover.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white transition-colors hover:bg-primary-navy hover:text-white"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-primary-navy">
                    <Image
                      src={cover.coverSrc}
                      alt={`Magazine cover ${idx + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-primary-navy/70 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-gold/80">
                        PDF {String(idx + 1).padStart(2, "0")}
                      </p>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary-navy/40 group-hover:text-accent-gold">
                      Press release
                    </p>
                    <p className="mt-4 text-sm font-semibold text-primary-navy/70 group-hover:text-white/80">
                      View cover PDF
                    </p>
                    <div className="mt-6 h-px w-14 bg-accent-gold" aria-hidden="true" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Videos */}
      <section id="videos" className="bg-base-white py-24 lg:py-32 scroll-mt-28" aria-label="Featured videos">
        <div className="wrapper px-5 lg:px-20">
          <div className="border-b border-primary-navy/10 pb-6" data-aos="fade-up">
            <span className="inline-flex items-center gap-2 bg-primary-navy px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              <span className="block size-1.5 bg-accent-gold" aria-hidden="true" />
              Videos
            </span>
            <h2 className="mt-6 text-4xl font-medium leading-[1.1] text-primary-navy lg:text-6xl">
              Featured videos
            </h2>
          </div>

          <div className="mt-16 bg-primary-navy/10 p-px" data-aos="fade-up" data-aos-delay={150}>
            <div className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3">
              {videos.map((video, idx) => (
                <a
                  key={`${video.url}-${idx}`}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white transition-colors hover:bg-primary-navy hover:text-white"
                >
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-primary-navy">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-navy to-secondary-navy" />
                    <div className="absolute inset-0 swiss-grid opacity-[0.08]" aria-hidden="true" />
                    <div className="absolute left-6 top-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-accent-gold/80">
                        Video {String(idx + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur">
                        <span className="text-accent-gold text-2xl" aria-hidden="true">
                          ▶
                        </span>
                      </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <p className="text-[10px] font-black uppercase tracking-[0.35em] text-white/60">
                        YouTube
                      </p>
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="text-xl font-medium leading-tight text-primary-navy group-hover:text-white">
                      {video.title}
                    </h3>
                    <div className="mt-8 text-[10px] font-black uppercase tracking-[0.25em] text-primary-navy/50 group-hover:text-accent-gold">
                      Watch <span className="text-accent-gold">→</span>
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
