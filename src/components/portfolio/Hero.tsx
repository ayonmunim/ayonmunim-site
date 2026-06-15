import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import { ArrowRight, Mail } from "lucide-react";
import portraitAsset from "@/assets/munim-formal.jpg.asset.json";
const portrait = portraitAsset.url;
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
  w: number;
};

const FLOATERS: Floater[] = [
  { src: nsac.url,     alt: "NASA Space Apps Challenge 2022", w: 220 },
  { src: nasa.url,     alt: "NASA Earth Data",                w: 200 },
  { src: daily24.url,  alt: "The Daily Star 2024",            w: 230 },
  { src: prothom.url,  alt: "Prothom Alo",                    w: 200 },
  { src: daily23.url,  alt: "The Daily Star 2023",            w: 190 },
  { src: observer.url, alt: "Daily Observer",                 w: 200 },
  { src: kaler.url,    alt: "Kaler Kantho",                   w: 210 },
  { src: samakal.url,  alt: "Samakal",                        w: 220 },
  { src: news24.url,   alt: "NEWS24",                         w: 180 },
];

// One image: born at center → drifts outward at a random angle → fades out → loops.
function FloatingPiece({ f, index, total }: { f: Floater; index: number; total: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    // Stagger the launches so images come out one-by-one, then keep cycling.
    const CYCLE = 7.2; // seconds per image
    const STAGGER = CYCLE / total; // gap between consecutive launches

    const run = async () => {
      // Initial wait so each piece starts in sequence (one after another).
      await new Promise((r) => setTimeout(r, (0.4 + index * STAGGER) * 1000));

      while (!cancelled) {
        // Pick a fresh angle/distance every cycle so the spread looks shuffled.
        const angle = Math.random() * Math.PI * 2;
        const dist = 38 + Math.random() * 18; // vmin
        const tx = `${Math.cos(angle) * dist}vmin`;
        const ty = `${Math.sin(angle) * dist * 0.95}vmin`;
        const rot = (Math.random() - 0.5) * 20;
        const endBlur = 4 + Math.random() * 10;

        // Reset to center, invisible.
        await controls.set({
          x: "-50%",
          y: "-50%",
          scale: 0.2,
          opacity: 0,
          rotate: 0,
          filter: "blur(24px)",
        });

        // Slow, smooth drift outward with fade in then fade out as it leaves.
        await controls.start({
          x: [`-50%`, `calc(-50% + ${tx})`],
          y: [`-50%`, `calc(-50% + ${ty})`],
          scale: [0.2, 1, 1, 1.05],
          opacity: [0, 1, 1, 0],
          rotate: [0, rot * 0.4, rot, rot],
          filter: [
            "blur(24px)",
            "blur(0px)",
            "blur(0px)",
            `blur(${endBlur}px)`,
          ],
          transition: {
            duration: CYCLE,
            times: [0, 0.25, 0.7, 1],
            ease: [0.22, 1, 0.36, 1],
          },
        });
      }
    };

    run();
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, index, total]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.2 }}
      className="pointer-events-auto absolute left-1/2 top-1/2"
      style={{ width: `${f.w}px` }}
    >
      <div className="group overflow-hidden rounded-2xl bg-ink ring-2 ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105 hover:ring-sun">
        <img
          src={f.src}
          alt={f.alt}
          loading="lazy"
          className="block h-auto w-full grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      {/* Floating press collage — continuous loop, one-by-one outward drift */}
      <div className="pointer-events-none absolute inset-0">
        {FLOATERS.map((f, i) => (
          <FloatingPiece key={i} f={f} index={i} total={FLOATERS.length} />
        ))}
      </div>

      {/* Soft radial vignette so the headline stays legible over the collage */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 size-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(245,245,245,0.92), rgba(245,245,245,0.7) 45%, rgba(245,245,245,0) 78%)",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-ink/10 blur-3xl glow-pulse" style={{ transform: "scale(1.85)" }} />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="group relative size-40 overflow-hidden rounded-full bg-ink ring-4 ring-ink shadow-[0_20px_60px_-20px_rgba(0,0,0,0.45)] md:size-48"
          >
            <img
              src={portrait}
              alt="Munim Ahmed"
              width={480}
              height={480}
              className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
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
            className="group inline-flex items-center gap-2 rounded-full bg-sun px-6 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(245,196,0,0.7)] transition hover:bg-sun-deep"
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
