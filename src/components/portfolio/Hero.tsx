import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import {
  ArrowRight,
  FileText,
  Download,
  User,
  Briefcase,
  Award,
  Newspaper,
  GraduationCap,
  Mail,
  type LucideIcon,
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

type Floater = { src: string; alt: string; w: number; angle: number; delay: number };

// Non-sequential angles so pieces fly out from different sides (not in order).
const RAW: { src: string; alt: string; w: number; angle: number }[] = [
  { src: nsac.url,     alt: "NASA Space Apps Challenge 2022", w: 360, angle: -70 },
  { src: prothom.url,  alt: "Prothom Alo",                    w: 350, angle: 140 },
  { src: nasa.url,     alt: "NASA Earth Data",                w: 340, angle: 30 },
  { src: samakal.url,  alt: "Samakal",                        w: 360, angle: -150 },
  { src: daily24.url,  alt: "The Daily Star 2024",            w: 380, angle: 75 },
  { src: kaler.url,    alt: "Kaler Kantho",                   w: 360, angle: -20 },
  { src: observer.url, alt: "Daily Observer",                 w: 340, angle: 165 },
  { src: daily23.url,  alt: "The Daily Star 2023",            w: 330, angle: -110 },
  { src: news24.url,   alt: "NEWS24",                         w: 320, angle: 105 },
];

const PER_IMAGE_DURATION = 14; // seconds for one image to travel center → edge (very slow)
const STAGGER = 2.2;           // gap between successive image starts
const LOOP_GAP = 1.5;          // pause after the last image before the loop restarts

const FLOATERS: Floater[] = RAW.map((f, i) => ({ ...f, delay: i * STAGGER }));
const LOOP_DURATION =
  RAW.length * STAGGER + PER_IMAGE_DURATION + LOOP_GAP; // total cycle length

function FloatingPiece({ f }: { f: Floater }) {
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    const rad = (f.angle * Math.PI) / 180;
    const dist = 52; // vmin — travel all the way to edge
    const tx = `${Math.cos(rad) * dist}vmin`;
    const ty = `${Math.sin(rad) * dist * 0.95}vmin`;

    const run = async () => {
      // initial offset before this piece starts in the first cycle
      await new Promise((r) => setTimeout(r, (1.2 + f.delay) * 1000));
      while (!cancelled) {
        await controls.start({
          x: [`-50%`, `calc(-50% + ${tx})`],
          y: [`-50%`, `calc(-50% + ${ty})`],
          scale: [0.18, 0.95, 1, 1],
          opacity: [0, 1, 1, 0],
          transition: {
            duration: PER_IMAGE_DURATION,
            times: [0, 0.35, 0.8, 1],
            ease: [0.22, 1, 0.36, 1],
          },
        });
        if (cancelled) break;
        // wait until next cycle's slot for this piece
        await new Promise((r) =>
          setTimeout(r, (LOOP_DURATION - PER_IMAGE_DURATION) * 1000)
        );
      }
    };

    run();
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, f.angle, f.delay]);

  return (
    <motion.div
      animate={controls}
      initial={{ opacity: 0, x: "-50%", y: "-50%", scale: 0.18 }}
      className="pointer-events-none absolute left-1/2 top-1/2"
      style={{ width: `${f.w}px` }}
    >
      <div className="overflow-hidden rounded-2xl bg-ink ring-2 ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.5)]">
        <img src={f.src} alt={f.alt} loading="lazy" className="block h-auto w-full" />
      </div>
    </motion.div>
  );
}

// Orbit nav — icon buttons with tooltip on hover, no orbit ring line, very slow rotation
const ORBIT_LINKS: { href: string; label: string; Icon: LucideIcon }[] = [
  { href: "#bio",      label: "Bio",        Icon: User },
  { href: "#projects", label: "Project",    Icon: Briefcase },
  { href: "#awards",   label: "Award",      Icon: Award },
  { href: "#media",    label: "Media",      Icon: Newspaper },
  { href: "#work",     label: "Experience", Icon: GraduationCap },
  { href: "#contact",  label: "Contact",    Icon: Mail },
];

// Static orbit nav — interactive icon buttons with tooltip on hover, no rotation
function OrbitRing({ radius = 215 }: { radius?: number }) {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: radius * 2, height: radius * 2 }}
    >
      {ORBIT_LINKS.map((l, i) => {
        const a = (i * 360) / ORBIT_LINKS.length - 90;
        const rad = (a * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        return (
          <div
            key={l.href}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))` }}
          >
            <a
              href={l.href}
              aria-label={l.label}
              className="pointer-events-auto group relative flex size-14 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_28px_-10px_rgba(0,0,0,0.4)] ring-1 ring-ink/10 transition-all duration-300 hover:scale-110 hover:bg-ink hover:text-white"
            >
              <l.Icon className="size-5" strokeWidth={2} />
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                {l.label}
              </span>
            </a>
          </div>
        );
      })}
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

      {/* Floating press collage — looped, drifts outward and fades away.
          Always blurred and sits BEHIND the text. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ filter: "blur(5px)" }}
      >
        {FLOATERS.map((f, i) => (
          <FloatingPiece key={i} f={f} />
        ))}
      </div>

      {/* Soft focal halo */}
      <div
        className="pointer-events-none absolute left-1/2 top-[58%] z-[1] size-[820px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(255,253,248,0.92) 0%, rgba(255,253,248,0.5) 45%, rgba(255,253,248,0) 80%)",
        }}
      />

      {/* Name — sharp, sans, in front of the floaters */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans text-[19vw] font-black leading-[0.88] tracking-[-0.03em] text-ink md:text-[10rem]"
        >
          Munim Ahmed
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-5 max-w-3xl font-sans text-sm font-bold uppercase tracking-[0.3em] text-ink/80 md:text-base"
        >
          A footslogger who wants to aid with his hand
        </motion.p>

        {/* Portrait with orbit nav around it */}
        <div className="relative mt-12 flex items-center justify-center">
          <OrbitRing radius={180} />

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

        {/* Resume button — white bg, modern animated */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-32 md:mt-40"
        >
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-white/70 blur-2xl animate-pulse" />
          <a
            href="/resume.pdf"
            download
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white px-9 py-4 font-sans text-sm font-semibold uppercase tracking-[0.25em] text-ink shadow-[0_18px_50px_-12px_rgba(0,0,0,0.25)] ring-1 ring-ink/10 transition-all hover:shadow-[0_22px_60px_-12px_rgba(0,0,0,0.4)]"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-sun/0 via-sun/40 to-sun/0 transition-transform duration-700 ease-out group-hover:translate-x-0" />
            <span className="pointer-events-none absolute -inset-y-1 -left-1/3 w-1/3 rotate-12 bg-ink/10 blur-md transition-transform duration-1000 ease-out group-hover:translate-x-[400%]" />
            <FileText className="relative size-4" strokeWidth={2} />
            <span className="relative">Download Resume</span>
            <motion.span
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative inline-flex"
            >
              <Download className="size-4" strokeWidth={2} />
            </motion.span>
            <ArrowRight className="relative size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/50"
      >
        Scroll
      </motion.div>
    </section>
  );
}
