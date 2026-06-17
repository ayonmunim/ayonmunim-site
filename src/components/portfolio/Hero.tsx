import { motion, useAnimationControls } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, FileText, Download } from "lucide-react";
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

type Floater = { src: string; alt: string; w: number; angle: number };

// Pre-distributed angles around the portrait so the final spread lands evenly
// at the edges of the hero section.
const RAW: { src: string; alt: string; w: number }[] = [
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

const FLOATERS: Floater[] = RAW.map((f, i) => ({
  ...f,
  // evenly distribute around full circle, offset so first piece starts top-right
  angle: -90 + (360 / RAW.length) * i + 20,
}));

const PER_IMAGE_DURATION = 6; // seconds for one image to travel center → edge
const STAGGER = 1.2;          // delay between successive images starting

function FloatingPiece({ f, index }: { f: Floater; index: number }) {
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      await new Promise((r) => setTimeout(r, (1.4 + index * STAGGER) * 1000));
      if (cancelled) return;

      const rad = (f.angle * Math.PI) / 180;
      const dist = 44 + (index % 3) * 4; // vmin
      const tx = `${Math.cos(rad) * dist}vmin`;
      const ty = `${Math.sin(rad) * dist * 0.95}vmin`;

      await controls.start({
        x: [`-50%`, `calc(-50% + ${tx})`],
        y: [`-50%`, `calc(-50% + ${ty})`],
        scale: [0.18, 0.9, 1.05, 1.05],
        opacity: [0, 1, 1, 1],
        // sharp during travel; final 1s blur lock-in
        filter: ["blur(14px)", "blur(0px)", "blur(0px)", "blur(6px)"],
        transition: {
          duration: PER_IMAGE_DURATION,
          times: [0, 0.55, 0.85, 1],
          ease: [0.22, 1, 0.36, 1],
        },
      });
    };

    run();
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, index, f.angle]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.18, filter: "blur(14px)" }}
      className="pointer-events-auto absolute left-1/2 top-1/2"
      style={{ width: `${f.w}px` }}
    >
      <div className="group overflow-hidden rounded-2xl bg-ink ring-2 ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.5)] transition-transform duration-500 hover:scale-105 hover:ring-sun">
        <img src={f.src} alt={f.alt} loading="lazy" className="block h-auto w-full" />
      </div>
    </motion.div>
  );
}

// Orbiting nav badges removed per spec — orbit is now a continuous rotating
// decorative ring around the portrait (no menu items inside the orbit).
function OrbitRing({ radius = 170 }: { radius?: number }) {
  const dots = Array.from({ length: 12 });
  return (
    <motion.div
      aria-hidden
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      <div className="absolute inset-0 rounded-full border border-dashed border-ink/30" />
      {dots.map((_, i) => {
        const a = (i * 360) / dots.length;
        const rad = (a * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 size-2 rounded-full bg-ink"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          />
        );
      })}
    </motion.div>
  );
}

export function Hero() {
  // Lock the final blur on the floaters area after the last image lands
  const [finalBlur, setFinalBlur] = useState(false);
  useEffect(() => {
    const totalMs = (1.4 + (FLOATERS.length - 1) * STAGGER + PER_IMAGE_DURATION) * 1000;
    const t = setTimeout(() => setFinalBlur(true), totalMs);
    return () => clearTimeout(t);
  }, []);

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

      {/* Floating press collage — sequential, sharp during travel, blurred when settled */}
      <motion.div
        animate={{ filter: finalBlur ? "blur(6px)" : "blur(0px)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0"
      >
        {FLOATERS.map((f, i) => (
          <FloatingPiece key={i} f={f} index={i} />
        ))}
      </motion.div>

      {/* Soft focal halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] z-[1] size-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,253,248,0.92) 0%, rgba(255,253,248,0.5) 45%, rgba(255,253,248,0) 80%)",
        }}
      />

      {/* Name — bold, slightly blurry */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-paint paint-ink text-[19vw] font-black leading-[0.88] tracking-[-0.01em] text-ink md:text-[10rem]"
          style={{ filter: "blur(1.2px)", textShadow: "0 4px 24px rgba(245,196,0,0.45)" }}
        >
          Munim Ahmed
        </motion.h1>

        {/* Bio line — bold, slightly blurry */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="font-montreal mt-5 max-w-3xl text-sm font-bold uppercase tracking-[0.3em] text-ink/80 md:text-base"
          style={{ filter: "blur(0.8px)" }}
        >
          A footslogger who wants to aid with his hand
        </motion.p>

        {/* Portrait with decorative orbit ring around it */}
        <div className="relative mt-12 flex items-center justify-center">
          <OrbitRing radius={170} />

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div
              className="absolute inset-0 -z-10 rounded-full bg-sun/30 blur-3xl glow-pulse"
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

        {/* Modern animated Resume button — single CTA under the orbit */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-24 md:mt-28"
        >
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-sun/50 blur-2xl animate-pulse" />
          <a
            href="/resume.pdf"
            download
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-ink px-9 py-4 font-montreal text-sm font-semibold uppercase tracking-[0.25em] text-white shadow-[0_18px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-ink/20 transition-all hover:shadow-[0_22px_60px_-12px_rgba(245,196,0,0.55)]"
          >
            {/* sweeping gradient highlight */}
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-sun via-white to-sun transition-transform duration-700 ease-out group-hover:translate-x-0" />
            {/* shimmer */}
            <span className="pointer-events-none absolute -inset-y-1 -left-1/3 w-1/3 rotate-12 bg-white/30 blur-md transition-transform duration-1000 ease-out group-hover:translate-x-[400%]" />
            <FileText className="relative size-4 transition-colors group-hover:text-ink" strokeWidth={2} />
            <span className="relative transition-colors group-hover:text-ink">Download Resume</span>
            <motion.span
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative inline-flex"
            >
              <Download className="size-4 transition-colors group-hover:text-ink" strokeWidth={2} />
            </motion.span>
            <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1 group-hover:text-ink" />
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
