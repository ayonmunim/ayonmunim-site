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
  { src: nsac.url,    tag: "NASA Space Apps", title: "Global Champion '22", who: "Team Diamonds, Bangladesh" },
  { src: nasa.url,    tag: "NASA Feature",     title: "Earth Data Project", who: "Featured by NASA" },
  { src: prothom.url, tag: "Prothom Alo",      title: "Front-page Coverage", who: "National daily" },
  { src: daily24.url, tag: "The Daily Star",   title: "Tech Innovator '24",  who: "English daily" },
  { src: kaler.url,   tag: "Kaler Kantho",     title: "Engineer Spotlight",  who: "National feature" },
  { src: samakal.url, tag: "Samakal",          title: "Youth in STEM",       who: "Profile piece" },
];

const GALLERY = [
  { src: daily24.url, title: "The Daily Star — 2024", note: "Tech innovator profile",     href: "#" },
  { src: prothom.url, title: "Prothom Alo",            note: "National daily feature",     href: "#" },
  { src: nasa.url,    title: "NASA Earth Data",        note: "Project highlight",          href: "#" },
  { src: nsac.url,    title: "NASA Space Apps",        note: "Global Champion 2022",       href: "#" },
  { src: kaler.url,   title: "Kaler Kantho",           title2: "",                          note: "Engineer spotlight", href: "#" },
  { src: samakal.url, title: "Samakal",                note: "Youth in STEM",              href: "#" },
  { src: observer.url,title: "Daily Observer",         note: "Innovation column",          href: "#" },
  { src: daily23.url, title: "The Daily Star — 2023",  note: "Featured story",             href: "#" },
  { src: news24.url,  title: "NEWS24",                 note: "Broadcast appearance",       href: "#" },
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
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
          style={{ background: "linear-gradient(to right, #FFF7DF, transparent)" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
          style={{ background: "linear-gradient(to left, #FCEBB0, transparent)" }}
        />
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

      {/* Press gallery — pop-up grid with hover overlay */}
      <div className="mx-auto mt-28 max-w-7xl px-6 md:mt-36">
        <AnimatedSection>
          <h3 className="font-display text-3xl uppercase tracking-tight md:text-5xl">
            <span className="text-ink/40">/</span> Press Gallery
          </h3>
          <p className="mt-4 max-w-xl text-ink/65">
            Hover any cover to read the story — click to open the source.
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {GALLERY.map((g, i) => (
            <motion.a
              key={i}
              href={g.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative block aspect-[3/4] overflow-hidden rounded-2xl bg-white shadow-[0_25px_60px_-25px_rgba(0,0,0,0.25)] ring-1 ring-ink/10"
            >
              <img
                src={g.src}
                alt={g.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Dark hover overlay with description */}
              <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0) 100%)",
                }}
              >
                <h4 className="font-display text-base font-semibold leading-tight text-white md:text-lg">
                  {g.title}
                </h4>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-white/75">{g.note}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
