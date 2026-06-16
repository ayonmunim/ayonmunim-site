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
  { src: nsac.url,     alt: "NASA Space Apps Challenge 2022", w: 300 },
  { src: nasa.url,     alt: "NASA Earth Data",                w: 270 },
  { src: daily24.url,  alt: "The Daily Star 2024",            w: 310 },
  { src: prothom.url,  alt: "Prothom Alo",                    w: 280 },
  { src: daily23.url,  alt: "The Daily Star 2023",            w: 260 },
  { src: observer.url, alt: "Daily Observer",                 w: 280 },
  { src: kaler.url,    alt: "Kaler Kantho",                   w: 290 },
  { src: samakal.url,  alt: "Samakal",                        w: 300 },
  { src: news24.url,   alt: "NEWS24",                         w: 250 },
];

// One image: born at center → drifts straight outward → blurs/fades → loops.
function FloatingPiece({ f, index, total }: { f: Floater; index: number; total: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    const CYCLE = 12; // slower, more cinematic
    const STAGGER = CYCLE / total;

    const run = async () => {
      await new Promise((r) => setTimeout(r, (0.5 + index * STAGGER) * 1000));

      while (!cancelled) {
        // Random straight outward direction — no rotation
        const angle = Math.random() * Math.PI * 2;
        const dist = 44 + Math.random() * 16; // vmin
        const tx = `${Math.cos(angle) * dist}vmin`;
        const ty = `${Math.sin(angle) * dist * 0.95}vmin`;

        await controls.set({
          x: "-50%",
          y: "-50%",
          scale: 0.18,
          opacity: 0,
          filter: "blur(28px)",
        });

        await controls.start({
          x: [`-50%`, `calc(-50% + ${tx})`],
          y: [`-50%`, `calc(-50% + ${ty})`],
          scale: [0.18, 1, 1, 1.04],
          opacity: [0, 1, 1, 0],
          filter: [
            "blur(28px)",
            "blur(0px)",
            "blur(0px)",
            "blur(14px)",
          ],
          transition: {
            duration: CYCLE,
            times: [0, 0.28, 0.72, 1],
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
      initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.18 }}
      className="pointer-events-auto absolute left-1/2 top-1/2"
      style={{ width: `${f.w}px` }}
    >
      <div className="group overflow-hidden rounded-2xl bg-ink ring-2 ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105 hover:ring-sun">
        <img
          src={f.src}
          alt={f.alt}
          loading="lazy"
          className="block h-auto w-full grayscale transition-all duration-700 group-hover:grayscale-0"
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
      style={{
        background:
          "radial-gradient(130% 90% at 50% 0%, #FFFDF8 0%, #FFF7DF 55%, #FCEBB0 120%)",
      }}
    >
      {/* Soft warm inner glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 55%, rgba(245,196,0,0.10), rgba(245,196,0,0) 70%)",
        }}
      />

      {/* Floating press collage — continuous straight outward drift */}
      <div className="pointer-events-none absolute inset-0">
        {FLOATERS.map((f, i) => (
          <FloatingPiece key={i} f={f} index={i} total={FLOATERS.length} />
        ))}
      </div>

      {/* Focal vignette — keeps text area crisp, blurs the periphery */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] size-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,253,248,0.98) 0%, rgba(255,253,248,0.85) 38%, rgba(255,253,248,0) 78%)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-sun/40 blur-3xl glow-pulse" style={{ transform: "scale(1.95)" }} />
          <motion.div
            animate={{ y: [0, -10, 0], scale: [1, 1.025, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="group relative size-48 overflow-hidden rounded-full bg-ink ring-[6px] ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)] md:size-60"
          >
            <img
              src={portrait}
              alt="Munim Ahmed"
              width={560}
              height={560}
              className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
            />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[11px] font-semibold uppercase tracking-[0.32em] text-ink/65"
        >
          A FOOTSLOGGER WHO WANTS TO AID WITH HIS HAND
        </motion.p>

        <h1 className="mt-6 font-display text-7xl uppercase leading-[0.92] tracking-[0.01em] md:text-9xl">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-sun-deep drop-shadow-[0_4px_24px_rgba(245,196,0,0.55)]"
          >
            Munim
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block text-ink"
          >
            Ahmed
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-sun shadow-[0_14px_40px_-12px_rgba(0,0,0,0.55)] transition hover:bg-ink/90"
          >
            View Projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-sun px-7 py-3.5 text-sm font-semibold text-ink shadow-[0_14px_40px_-12px_rgba(245,196,0,0.8)] transition hover:bg-sun-deep"
          >
            <Mail className="size-4" /> Contact Me
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink/50"
      >
        Scroll
      </motion.div>
    </section>
  );
}
