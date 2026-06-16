import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import {
  ArrowRight,
  FileText,
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
        const dist = 46 + Math.random() * 18;
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
          scale: [0.22, 0.9, 1.05, 1.1],
          opacity: [0, 1, 1, 0],
          filter: ["blur(10px)", "blur(2px)", "blur(0px)", "blur(0px)"],
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
        <img src={f.src} alt={f.alt} loading="lazy" className="block h-auto w-full" />
      </div>
    </motion.div>
  );
}

// Orbit positions: 1 top, 2 right, 1 bottom, 2 left
const ORBIT = [
  { href: "#bio",      label: "Bio",        icon: User,       angle: -90 },
  { href: "#projects", label: "Project",    icon: Briefcase,  angle: -30 },
  { href: "#awards",   label: "Award",      icon: Award,      angle:  30 },
  { href: "#media",    label: "Media",      icon: Newspaper,  angle:  90 },
  { href: "#work",     label: "Experience", icon: Hammer,     angle: 150 },
  { href: "#contact",  label: "Contact",    icon: Send,       angle: 210 },
];

function OrbitNav({ radius = 200 }: { radius?: number }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
      <div className="relative" style={{ width: radius * 2 + 100, height: radius * 2 + 100 }}>
        {ORBIT.map((item, i) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
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
              whileHover={{ scale: 1.1 }}
              className="pointer-events-auto group absolute left-1/2 top-1/2 flex h-[78px] w-[78px] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-1 rounded-full border border-ink/15 bg-white/85 text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-ink hover:bg-ink hover:text-sun"
              style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
            >
              <item.icon className="size-5" strokeWidth={1.8} />
              <span className="font-montreal text-[10px] font-semibold uppercase tracking-[0.14em]">
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
      className="relative flex min-h-screen flex-col items-center justify-start overflow-hidden px-6 pt-24 pb-16"
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

      {/* Floating press collage */}
      <div className="pointer-events-none absolute inset-0">
        {FLOATERS.map((f, i) => (
          <FloatingPiece key={i} f={f} index={i} total={FLOATERS.length} />
        ))}
      </div>

      {/* Soft focal halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] z-[1] size-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,253,248,0.95) 0%, rgba(255,253,248,0.55) 45%, rgba(255,253,248,0) 80%)",
        }}
      />

      {/* Name on top — Edo paint font, bigger & bolder */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <h1 className="font-paint paint-ink text-[19vw] leading-[0.88] tracking-[-0.01em] text-ink md:text-[10rem]">
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(8px)" }}
            animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="inline-block drop-shadow-[0_4px_24px_rgba(245,196,0,0.45)]"
          >
            Munim
          </motion.span>{" "}
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)", filter: "blur(8px)" }}
            animate={{ clipPath: "inset(0 0% 0 0)", filter: "blur(0px)" }}
            transition={{ delay: 0.7, duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
            className="inline-block"
          >
            Ahmed
          </motion.span>
        </h1>

        {/* Montreal-font bio line */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="font-montreal mt-5 max-w-2xl text-sm font-light uppercase tracking-[0.3em] text-ink/70 md:text-base"
        >
          A footslogger who wants to aid with his hand
        </motion.p>

        {/* Portrait with orbit nav around it */}
        <div className="relative mt-12 flex items-center justify-center">
          <OrbitNav radius={200} />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute inset-0 -z-10 rounded-full bg-sun/20 blur-3xl glow-pulse"
              style={{ transform: "scale(1.9)" }}
            />
            <motion.div
              animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative size-44 overflow-hidden rounded-full bg-ink ring-[6px] ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)] md:size-56"
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
        </div>

        {/* Resume + Contact buttons — white/yellow modern animated */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-[260px] flex flex-wrap items-center justify-center gap-4 md:mt-[280px]"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 font-montreal text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_40px_-12px_rgba(0,0,0,0.25)] ring-1 ring-ink/10 transition-all hover:ring-ink/30"
          >
            <span className="absolute inset-0 -translate-x-full bg-sun transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <FileText className="relative size-4" strokeWidth={2} />
            <span className="relative">Resume</span>
            <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-sun px-8 py-4 font-montreal text-sm font-semibold uppercase tracking-[0.2em] text-ink shadow-[0_14px_40px_-12px_rgba(245,196,0,0.6)] ring-1 ring-ink/10 transition-all hover:ring-ink/30"
          >
            <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative">Get in Touch</span>
            <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="font-montreal absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink/50"
      >
        Scroll
      </motion.div>
    </section>
  );
}
