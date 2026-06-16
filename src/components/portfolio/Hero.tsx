import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import {
  ArrowRight,
  Mail,
  User,
  Briefcase,
  Award,
  Newspaper,
  Hammer,
  Send,
} from "lucide-react";
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

type Floater = { src: string; alt: string; w: number };

const FLOATERS: Floater[] = [
  { src: nsac.url,     alt: "NASA Space Apps Challenge 2022", w: 380 },
  { src: nasa.url,     alt: "NASA Earth Data",                w: 360 },
  { src: daily24.url,  alt: "The Daily Star 2024",            w: 400 },
  { src: prothom.url,  alt: "Prothom Alo",                    w: 370 },
  { src: daily23.url,  alt: "The Daily Star 2023",            w: 340 },
  { src: observer.url, alt: "Daily Observer",                 w: 360 },
  { src: kaler.url,    alt: "Kaler Kantho",                   w: 380 },
  { src: samakal.url,  alt: "Samakal",                        w: 390 },
  { src: news24.url,   alt: "NEWS24",                         w: 330 },
];

// One image: born at center (slightly blurred), drifts outward, gets SHARPER as it travels.
function FloatingPiece({ f, index, total }: { f: Floater; index: number; total: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    const CYCLE = 14;
    const STAGGER = CYCLE / total;

    const run = async () => {
      await new Promise((r) => setTimeout(r, (0.4 + index * STAGGER) * 1000));

      while (!cancelled) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 46 + Math.random() * 18; // vmin
        const tx = `${Math.cos(angle) * dist}vmin`;
        const ty = `${Math.sin(angle) * dist * 0.95}vmin`;

        await controls.set({
          x: "-50%",
          y: "-50%",
          scale: 0.22,
          opacity: 0,
          filter: "blur(10px)",
        });

        await controls.start({
          x: [`-50%`, `calc(-50% + ${tx})`],
          y: [`-50%`, `calc(-50% + ${ty})`],
          // Grows outward and stays large
          scale: [0.22, 0.9, 1.05, 1.1],
          opacity: [0, 1, 1, 0],
          // Blurry at center → sharp as it reaches the edges
          filter: [
            "blur(10px)",
            "blur(2px)",
            "blur(0px)",
            "blur(0px)",
          ],
          transition: {
            duration: CYCLE,
            times: [0, 0.35, 0.8, 1],
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
      initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.22 }}
      className="pointer-events-auto absolute left-1/2 top-1/2"
      style={{ width: `${f.w}px` }}
    >
      <div className="group overflow-hidden rounded-2xl bg-ink ring-2 ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:scale-105 hover:ring-sun">
        <img
          src={f.src}
          alt={f.alt}
          loading="lazy"
          className="block h-auto w-full"
        />
      </div>
    </motion.div>
  );
}

// Circular nav around the portrait
const ORBIT = [
  { href: "#bio",        label: "Bio",        icon: User },
  { href: "#projects",   label: "Project",    icon: Briefcase },
  { href: "#awards",     label: "Award",      icon: Award },
  { href: "#media",      label: "Media",      icon: Newspaper },
  { href: "#work",       label: "Experience", icon: Hammer },
  { href: "#contact",    label: "Contact",    icon: Send },
];

function OrbitNav() {
  const radius = 175; // px from center
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block">
      <div className="relative size-[460px]">
        {ORBIT.map((item, i) => {
          const angle = (i / ORBIT.length) * Math.PI * 2 - Math.PI / 2;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.a
              key={item.href}
              href={item.href}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9 + i * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="pointer-events-auto group absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-ink/15 bg-white/85 text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-ink hover:bg-ink hover:text-sun"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <item.icon className="size-5" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em]">
                {item.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
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
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 55%, rgba(245,196,0,0.10), rgba(245,196,0,0) 70%)",
        }}
      />

      {/* Floating press collage — blurry at center, sharp at the edges */}
      <div className="pointer-events-none absolute inset-0">
        {FLOATERS.map((f, i) => (
          <FloatingPiece key={i} f={f} index={i} total={FLOATERS.length} />
        ))}
      </div>

      {/* Soft focal halo — only a gentle wash, no heavy blur over text */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-[1] size-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,253,248,0.95) 0%, rgba(255,253,248,0.55) 45%, rgba(255,253,248,0) 80%)",
        }}
      />

      {/* Circular navigation around the portrait */}
      <OrbitNav />

      {/* Foreground content */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <div
            className="absolute inset-0 -z-10 rounded-full bg-sun/15 blur-3xl glow-pulse"
            style={{ transform: "scale(1.95)" }}
          />
          <motion.div
            animate={{ y: [0, -10, 0], scale: [1, 1.025, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="group relative size-44 overflow-hidden rounded-full bg-ink ring-[6px] ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)] md:size-52"
          >
            <img
              src={portrait}
              alt="Munim Ahmed"
              width={560}
              height={560}
              className="h-full w-full object-cover"
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

        {/* Brush / Edo-paint style name with sweep reveal */}
        <h1 className="mt-6 font-paint paint-ink text-7xl uppercase leading-[0.92] tracking-[0.01em] md:text-9xl">
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(8px)" }}
            animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
            transition={{ delay: 0.4, duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
            className="inline-block text-ink drop-shadow-[0_4px_24px_rgba(245,196,0,0.45)]"
          >
            Munim
          </motion.span>{" "}
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(8px)" }}
            animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
            transition={{ delay: 0.85, duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
            className="inline-block text-ink"
          >
            Ahmed
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
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
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink/50"
      >
        Scroll
      </motion.div>
    </section>
  );
}
