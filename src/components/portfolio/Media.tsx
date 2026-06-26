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
        background:
          "radial-gradient(120% 90% at 50% 0%, #FFFDF8 0%, #FFF7DF 60%, #FCEBB0 130%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/70">
            (05) Media
          </p>
          <PaintTitle className="mt-6 text-5xl uppercase md:text-7xl">
            Media
          </PaintTitle>
          <p className="mt-6 max-w-xl text-ink/65 md:text-lg">
            Selected appearances, broadcast coverage and editorial features.
          </p>
        </AnimatedSection>
      </div>

      {/* Horizontal auto-scroll video cards */}
      <div className="relative mt-16 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, #FFF7DF, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, #FCEBB0, transparent)" }} />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex w-max gap-6 px-6"
        >
          {[...VIDEO_CARDS, ...VIDEO_CARDS].map((c, i) => (
            <article
              key={i}
              className="group relative w-[320px] shrink-0 overflow-hidden rounded-3xl bg-white shadow-[0_25px_80px_-25px_rgba(0,0,0,0.25)] ring-4 ring-sun transition-transform hover:scale-[1.02] md:w-[380px]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img src={c.src} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-ink">
                  {c.tag}
                </span>
                <button
                  aria-label={`Play ${c.title}`}
                  className="absolute bottom-4 right-4 grid size-12 place-items-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-110"
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

      {/* Press gallery — dense packed masonry collage */}
      <div className="relative mx-auto mt-28 max-w-[1400px] px-4 md:mt-36 md:px-6">
        <AnimatedSection>
          <h3 className="font-display text-3xl uppercase tracking-tight md:text-5xl">
            <span className="text-ink/40">/</span> Press Gallery
          </h3>
          <p className="mt-4 max-w-xl text-ink/65">
            Hover any tile to read the story.
          </p>
        </AnimatedSection>

        {(() => {
          const POOL = [daily23.url, prothom.url, nsac.url, nasa.url, news24.url, kaler.url, samakal.url, daily24.url, observer.url];
          const NOTES = ["Featured story", "National daily", "Cover feature", "Broadcast", "Editorial", "Profile piece", "Spotlight", "Innovation", "Press"];
          const ROWS = 4;
          const COLS = 5;
          const COUNT = ROWS * COLS; // 20 images exactly
          const items = Array.from({ length: COUNT }, (_, i) => ({
            src: POOL[i % POOL.length],
            title: `Press Feature ${String(i + 1).padStart(2, "0")}`,
            note: NOTES[i % NOTES.length],
          }));
          return (
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 md:mt-16 md:grid-cols-4 md:gap-4 lg:grid-cols-5">
              {items.map((t, i) => (
                <motion.a
                  key={i}
                  href="#"
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: (i % 5) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="group relative block overflow-hidden rounded-xl bg-white shadow-[0_15px_40px_-20px_rgba(0,0,0,0.25)] ring-1 ring-ink/5 md:rounded-2xl"
                >
                  <div style={{ aspectRatio: "1/1" }} className="relative">
                    <img
                      src={t.src}
                      alt={t.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex flex-col justify-end p-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:p-4"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)",
                      }}
                    >
                      <h4 className="font-display text-sm font-semibold leading-tight text-white md:text-base">
                        {t.title}
                      </h4>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/75">{t.note}</p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          );
        })()}
      </div>

      {/* White gradient fade covering the bottom ~4/5 rows of the gallery */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 25%, rgba(255,255,255,0.85) 65%, #ffffff 100%)",
        }}
      />
    </section>
  );
}
