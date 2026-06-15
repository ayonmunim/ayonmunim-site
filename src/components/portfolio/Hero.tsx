import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import portrait from "@/assets/munim-hero.jpg";
import daily23 from "@/assets/press/Daily_23.png.asset.json";
import daily24 from "@/assets/press/Daily_24.png.asset.json";
import kaler from "@/assets/press/Kaler_Kantho.png.asset.json";
import nasa from "@/assets/press/NASA.png.asset.json";
import nsac from "@/assets/press/NSAC_2022.png.asset.json";
import observer from "@/assets/press/Observer.png.asset.json";
import news24 from "@/assets/press/NEWS24.png.asset.json";
import samakal from "@/assets/press/Samakal.png.asset.json";
import prothom from "@/assets/press/Prothom_Alo_2023_2.png.asset.json";

type Floater = {
  src: string;
  alt: string;
  // final position in % offset from center
  x: string;
  y: string;
  w: number; // width in px (desktop)
  rotate: number;
  delay: number;
};

const floaters: Floater[] = [
  { src: nsac.url,     alt: "NASA Space Apps Challenge 2022",   x: "-38%", y: "-30%", w: 280, rotate: -6, delay: 0.1 },
  { src: nasa.url,     alt: "NASA Earth Data",                  x: "32%",  y: "-34%", w: 300, rotate: 5,  delay: 0.18 },
  { src: daily23.url,  alt: "The Daily Star 2023",              x: "-44%", y: "6%",   w: 260, rotate: -8, delay: 0.26 },
  { src: daily24.url,  alt: "The Daily Star 2024",              x: "40%",  y: "10%",  w: 270, rotate: 7,  delay: 0.34 },
  { src: observer.url, alt: "Daily Observer",                   x: "-30%", y: "34%",  w: 240, rotate: 4,  delay: 0.42 },
  { src: prothom.url,  alt: "Prothom Alo",                      x: "30%",  y: "36%",  w: 250, rotate: -5, delay: 0.5 },
  { src: kaler.url,    alt: "Kaler Kantho",                     x: "-52%", y: "-4%",  w: 220, rotate: 9,  delay: 0.58 },
  { src: samakal.url,  alt: "Samakal",                          x: "50%",  y: "-6%",  w: 230, rotate: -7, delay: 0.66 },
  { src: news24.url,   alt: "NEWS24",                           x: "0%",   y: "-44%", w: 260, rotate: 2,  delay: 0.74 },
];

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      {/* Floating press collage — emerges from center outward */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-full w-full max-w-6xl">
          {floaters.map((f, i) => (
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                scale: 0.2,
                x: "-50%",
                y: "-50%",
                rotate: 0,
                filter: "blur(20px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: `calc(-50% + ${f.x})`,
                y: `calc(-50% + ${f.y})`,
                rotate: f.rotate,
                filter: "blur(2px)",
              }}
              transition={{
                duration: 1.4,
                delay: f.delay,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute left-1/2 top-1/2"
              style={{ width: `${f.w}px` }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 6 + (i % 4),
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2,
                }}
                className="overflow-hidden rounded-xl ring-1 ring-ink/10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={f.src}
                  alt={f.alt}
                  loading="lazy"
                  className="block h-auto w-full opacity-90"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Glassmorphism center spotlight */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/40 backdrop-blur-2xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-bone/70 blur-2xl" />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-ink/[0.04] blur-3xl glow-pulse" style={{ transform: "scale(1.8)" }} />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-40 overflow-hidden rounded-full ring-1 ring-line shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] md:size-48"
          >
            <img
              src={portrait}
              alt="Munim Ahmed"
              width={480}
              height={480}
              className="h-full w-full object-cover grayscale"
            />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/55"
        >
          Software Engineer · Full Stack Developer
        </motion.p>

        <h1 className="mt-6 font-display text-6xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
          {"Munim Ahmed".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-6 max-w-xl text-base text-ink/65 md:text-lg"
        >
          Building meaningful digital experiences through design, code, and data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bone transition hover:bg-ink/85"
          >
            View Projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-bone"
          >
            <Mail className="size-4" /> Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink/40"
      >
        Scroll
      </motion.div>
    </section>
  );
}
