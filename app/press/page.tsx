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

const listingImages: ListingImage[] = [
  { src: "https://beacontrustee.co.in/assets/images/nse_1.jpg", number: "01" },
  { src: "https://beacontrustee.co.in/assets/images/nse_2.jpg", number: "02" },
  { src: "https://beacontrustee.co.in/assets/images/nse_3.jpg", number: "03" },
  { src: "https://beacontrustee.co.in/assets/images/nse_4.jpg", number: "04" },
  { src: "https://beacontrustee.co.in/assets/images/nse_5.jpg", number: "05" },
  { src: "https://beacontrustee.co.in/assets/images/nse_6.jpg", number: "06" },
  { src: "https://beacontrustee.co.in/assets/images/nse_7.jpg", number: "07" },
  { src: "https://beacontrustee.co.in/assets/images/nse_8.jpg", number: "08" },
  { src: "https://beacontrustee.co.in/assets/images/nse_9.jpg", number: "09" },
  { src: "https://beacontrustee.co.in/assets/images/nse_10.jpg", number: "10" },
  { src: "https://beacontrustee.co.in/assets/images/nse_11.jpg", number: "11" },
  { src: "https://beacontrustee.co.in/assets/images/nse_12.jpg", number: "12" },
];

const news: NewsArticle[] = [
  {
    title: "Digital Gold in Emerging Markets: What are the opportunities and challenges for investors?",
    href: "https://www.livemint.com/money/personal-finance/digital-gold-in-emerging-markets-what-are-the-opportunities-and-challenges-for-investors-11682182482298.html",
    date: "25 April, 2023",
    sourceLogo: "https://beacontrustee.co.in/assets/images/mint.png",
    imageSrc: "https://beacontrustee.co.in/assets/images/gold.jpg",
  },
  {
    title: "SEBI to issue mutual fund light regulations in an effort to reduce compliance requirements for passive funds",
    href: "https://www.livemint.com/news/india/sebi-to-issue-mutual-fund-light-regulations-in-an-effort-to-reduce-compliance-requirements-for-passive-funds-11685114772099.html",
    date: "26 May, 2023",
    sourceLogo: "https://beacontrustee.co.in/assets/images/mint.png",
    imageSrc: "https://beacontrustee.co.in/assets/images/mint_2.jpg",
  },
  {
    title: "Active Vs Auto: Which Route Should You Opt For NPS Investment? Explained",
    href: "https://www.goodreturns.in/personal-finance/investment/active-vs-auto-which-route-should-you-opt-for-nps-investment-explained-1285837.html",
    date: "10 June, 2023",
    sourceLogo: "https://beacontrustee.co.in/assets/images/goodreturns.png",
    imageSrc: "https://beacontrustee.co.in/assets/images/pension.jpg",
  },
  {
    title: "Explained: Why PPF Should Not Be A Long Term Bet of 15-Year Lock In Period?",
    href: "https://www.goodreturns.in/personal-finance/investment/explained-why-ppf-should-not-be-a-long-term-bet-of-15-year-lock-in-period-1285836.html?story=1",
    date: "10 June, 2023",
    sourceLogo: "https://beacontrustee.co.in/assets/images/goodreturns.png",
    imageSrc: "https://beacontrustee.co.in/assets/images/good.jpg",
  },
  {
    title: "RBI monetary policy: Shaktikanta Das-led MPC keeps repo rate steady at 6.50%. Predicts 6.5% GDP growth in FY24",
    href: "https://www.livemint.com/economy/rbi-monetary-policy-shaktikanta-das-led-mpc-kepps-repo-rate-unchanged-at-650-11691640921674.html",
    date: "10 August, 2023",
    sourceLogo: "https://beacontrustee.co.in/assets/images/mint.png",
    imageSrc: "https://beacontrustee.co.in/assets/images/governor.jpg",
  },
  {
    title: "Which Stocks/Sectors To Bet After RBI Announced Incremental CRR For Banks?",
    href: "https://www.goodreturns.in/personal-finance/investment/which-stocks-sectors-to-bet-after-rbi-announced-incremental-crr-for-banks-1294089.html",
    date: "13 August, 2023",
    sourceLogo: "https://beacontrustee.co.in/assets/images/goodreturns.png",
    imageSrc: "https://beacontrustee.co.in/assets/images/stocks.jpg",
  },
];

const viewAllNewsUrl = "https://beacontrustee.co.in/press_view_all";

const covers: MagazineCover[] = [
  { coverSrc: "https://beacontrustee.co.in/assets/images/cover_2.png", pdfUrl: "https://beacontrustee.co.in/wp-content/uploads/press_release/india_today.pdf" },
  { coverSrc: "https://beacontrustee.co.in/assets/images/cover_3.png", pdfUrl: "https://beacontrustee.co.in/wp-content/uploads/press_release/business_today.pdf" },
  { coverSrc: "https://beacontrustee.co.in/assets/images/cover_magazine_2.png", pdfUrl: "https://beacontrustee.co.in/wp-content/uploads/press_release/magazine_cover_image.pdf" },
  { coverSrc: "https://beacontrustee.co.in/assets/images/cover_4.jpg", pdfUrl: "https://beacontrustee.co.in/wp-content/uploads/press_release/cover_4.pdf" },
  { coverSrc: "https://beacontrustee.co.in/assets/images/cover_5.jpg", pdfUrl: "https://beacontrustee.co.in/wp-content/uploads/press_release/cover_5.pdf" },
];

const videos: VideoItem[] = [
  { title: "Pratapsingh Nathani Decodes Beacon Trusteeship's Vision", url: "https://youtu.be/Sr0SWoY3jmQ?si=oYIxhZDUJXwJ3MzA" },
  { title: "Unveiling The Core Vision Of Beacon Trusteeship: Insights From Pratapsingh Nathanani", url: "https://youtu.be/2o3xOQGG2PQ?si=s-c770ydv6KA_6q5" },
  { title: "Pratapsingh Nathani In A Rapid Fire Episode On Let's Talk Business - Don't Miss It!", url: "https://youtu.be/56WFMIw_4SA?si=RYj3KpWliKUUDaPV" },
  { title: "Pratapsingh Nathani Reveals AIF Regulation Shifts & GIFT City Moves", url: "https://youtu.be/EAlWHLbkix4?si=NaOBnE0el5QZAwya" },
  { title: "Insider Scoop: Pratapsingh Nathani's Jaw-Dropping Insights On Real Estate Success", url: "https://youtu.be/3lJAITnDKxc?si=4KXlyBYh1b1ZSRDw" },
  { title: "Introducing Beacon Trusteeship : The Premier Corporate Trustee", url: "https://youtu.be/Xbf9dXR-W-A" },
  { title: "Founder's Talk with Mr. Pratap Singh Nathani", url: "https://youtu.be/1zGLGt1mlbo" },
  { title: "Meet the A-Team : Beacon Trusteeship Limited", url: "https://youtu.be/1sj7FsL2D3M" },
  { title: "2016 to 2024: Key Highlight & Milestones | Beacon Trusteeship Limited", url: "https://youtu.be/U-FYovYSf6c" },
  { title: "Beacon Trusteeship - Exclusive Discussion with the Top Management | SMEmitra", url: "https://youtu.be/acLI-7R22Sk" },
  { title: "India's First Trustee Company To be Listed on NSE - Beacon Trusteeship Limited", url: "https://youtu.be/FQgCb0idbI0" },
  { title: "Highlights of listing Ceremony of Beacon Trusteeship Limited", url: "https://youtu.be/JEXHhSuM0kY" },
  { title: "Beacon Trusteeship Ltd chosen by Alpha Ideas as one of 12 SMEs to showcase to 550+ investors", url: "https://youtu.be/NsGC6X_TBAM" },
  { title: "In Conversation with Beacon Trusteeship Ltd Management | CMD - Pratapsingh Nathani #BeaconGroup", url: "https://youtu.be/JqxVHoQDcEk" },
];

export default function PressPage() {
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
