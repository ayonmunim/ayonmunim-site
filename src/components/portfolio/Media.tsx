import { motion } from "motion/react";
import { Play } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { PaintTitle } from "./PaintTitle";
import daily23 from "@/assets/press/Daily_23.png.asset.json";
import daily24 from "@/assets/press/Daily_24.png.asset.json";
import kaler from "@/assets/press/Kaler_Kantho.png.asset.json";
import nasa from "@/assets/press/NASA.png.asset.json";
import observer from "@/assets/press/Observer.png.asset.json";
import samakal from "@/assets/press/Samakal.png.asset.json";
import prothom from "@/assets/press/Prothom_Alo_2023_2.png.asset.json";
import news24 from "@/assets/press/NEWS24.png.asset.json";
import nsac from "@/assets/press/NSAC_2022.png.asset.json";

const VIDEO_CARDS = [
  { src: nsac.url, tag: "NASA Space Apps", title: "Global Champion '22", who: "Team Diamonds, Bangladesh" },
  { src: nasa.url, tag: "NASA Feature", title: "Earth Data Project", who: "Featured by NASA" },
  { src: prothom.url, tag: "Prothom Alo", title: "Front-page Coverage", who: "National daily" },
  { src: daily24.url, tag: "The Daily Star", title: "Tech Innovator '24", who: "English daily" },
  { src: kaler.url, tag: "Kaler Kantho", title: "Engineer Spotlight", who: "National feature" },
  { src: samakal.url, tag: "Samakal", title: "Youth in STEM", who: "Profile piece" },
];

// Dense collage — 5 columns. Side columns pop in from sides on scroll,
// then settle into a tight aligned top row like the reference gallery.
type Tile = {
  src: string;
  title: string;
  note: string;
  href: string;
  col: number; // 0..4
  offset?: number; // vertical stagger px
  aspect?: string;
};

const TILES: Tile[] = [
  // Top row — staggered like the reference image
  { src: daily23.url, title: "The Daily Star — 2023", note: "Featured story", href: "#", col: 0, offset: 120, aspect: "3/4" },
  { src: prothom.url, title: "Prothom Alo", note: "National daily feature", href: "#", col: 1, offset: 40, aspect: "3/4" },
  { src: nsac.url, title: "NASA Space Apps", note: "Global Champion 2022", href: "#", col: 2, offset: 0, aspect: "3/5" },
  { src: nasa.url, title: "NASA Earth Data", note: "Project highlight", href: "#", col: 3, offset: 40, aspect: "3/4" },
  { src: news24.url, title: "NEWS24", note: "Broadcast appearance", href: "#", col: 4, offset: 120, aspect: "3/4" },

  // Second row
  { src: kaler.url, title: "Kaler Kantho", note: "Engineer spotlight", href: "#", col: 0, offset: 0, aspect: "4/5" },
  { src: samakal.url, title: "Samakal", note: "Youth in STEM", href: "#", col: 1, offset: 40, aspect: "4/5" },
  { src: daily24.url, title: "The Daily Star — 2024", note: "Tech innovator profile", href: "#", col: 2, offset: 0, aspect: "4/5" },
  { src: observer.url, title: "Daily Observer", note: "Innovation column", href: "#", col: 3, offset: 40, aspect: "4/5" },
  { src: prothom.url, title: "Prothom Alo · Cover", note: "Editorial spread", href: "#", col: 4, offset: 0, aspect: "4/5" },
];

export function Media() {
  return (
    <section
      id="media"
      className="relative py-28 md:py-40"
      style={{
        color: "#000000",
        background:
          "linear-gradient(to bottom, #FFFDF8 0%, #FDF8EE 35%, #F7F3E8 70%, #F5EFDF 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] opacity-55">
            (05) Media
          </p>
          <PaintTitle className="mt-6 text-5xl uppercase md:text-7xl">
            Media
          </PaintTitle>
          <p className="mt-6 max-w-xl opacity-65 md:text-lg">
            Selected appearances, broadcast coverage and editorial features.
          </p>
        </AnimatedSection>
      </div>

      {/* Horizontal auto-scroll video cards */}
      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, #FFFDF8, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, #F5EFDF, transparent)" }} />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex w-max gap-6 px-6"
        >
          {[...VIDEO_CARDS, ...VIDEO_CARDS].map((c, i) => (
            <article
              key={i}
              className="group relative w-[320px] shrink-0 overflow-hidden rounded-3xl bg-[#F7F3E8]/80 backdrop-blur-md shadow-[0_25px_80px_-25px_rgba(0,0,0,0.12)] ring-1 ring-black/10 transition-all duration-500 hover:scale-[1.02] hover:bg-[#FFFDF8] hover:ring-black/25 md:w-[380px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.src} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-black">
                  {c.tag}
                </span>
                <button
                  aria-label={`Play ${c.title}`}
                  className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-white/95 text-black shadow-lg transition-transform hover:scale-110"
                >
                  <Play className="size-5 fill-current" />
                </button>
                <div className="absolute bottom-4 left-4 right-20 text-white">
                  <h3 className="font-display text-lg leading-tight md:text-xl">{c.title}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/80">{c.who}</p>
                </div>
              </div>
            </article>
          ))}
        </motion.div>
      </div>

      {/* Press gallery — nas.com style parallax columns */}
      <PressGallery />

    </section>
  );
}

function PressGallery() {
  const POOL = [daily23.url, prothom.url, nsac.url, nasa.url, news24.url, kaler.url, samakal.url, daily24.url, observer.url];
  const NOTES = ["Featured story", "National daily", "Cover feature", "Broadcast", "Editorial", "Profile piece", "Spotlight", "Innovation", "Press"];

  // 5 columns — center column appears first, columns "spread" outward
  // from center as the user scrolls deeper into the section (nas.com style).
  const COLS = 5;
  const TILES_PER_COL = 5;
  const CENTER = (COLS - 1) / 2;

  const columns = Array.from({ length: COLS }, (_, c) =>
    Array.from({ length: TILES_PER_COL }, (_, r) => {
      const i = (c * 13 + r * 3) % POOL.length;
      return {
        src: POOL[i],
        title: `Press Feature ${String(c * TILES_PER_COL + r + 1).padStart(2, "0")}`,
        note: NOTES[i],
      };
    })
  );

  return (
    <div className="relative mx-auto mt-12 max-w-[1600px] px-3 py-12 text-ink md:mt-16 md:px-4 md:py-16 rounded-3xl" style={{ background: "linear-gradient(to bottom, #FFFDF8 0%, #FDF8EE 45%, #FAF3E5 75%, #F7F3E8 100%)" }}>
      <AnimatedSection>
        <h3 className="font-display text-3xl uppercase tracking-tight md:text-5xl px-3 md:px-4">
          <span className="text-ink/40">/</span> Press Gallery
        </h3>
        <p className="mt-4 max-w-xl text-ink/65 px-3 md:px-4">
          Hover any tile to read the story.
        </p>
      </AnimatedSection>

      {/* responsive grid collage — flows directly into the footer */}
      <div className="relative mt-10 px-2 md:mt-14 md:px-3">
        <div
          className="grid gap-2 md:gap-3"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {columns.map((col) => (
            <div key={crypto.randomUUID()} className="flex flex-col gap-2 md:gap-3">
              {col.map((t) => (
                <a
                  key={crypto.randomUUID()}
                  href="#"
                  className="group relative block overflow-hidden rounded-md bg-black/5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)] ring-1 ring-black/10 md:rounded-lg"
                >
                  <div style={{ aspectRatio: "1/1" }} className="relative">
                    <img
                      src={t.src}
                      alt={t.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex flex-col justify-end p-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-3"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%)",
                      }}
                    >
                      <h4 className="font-display text-xs font-semibold leading-tight text-white md:text-sm">
                        {t.title}
                      </h4>
                      <p className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-white/80">
                        {t.note}
                      </p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


