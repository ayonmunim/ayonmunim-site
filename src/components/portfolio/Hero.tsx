import { motion, useAnimationControls } from "motion/react";
import { useEffect } from "react";
import { User, Briefcase, Award, Newspaper, GraduationCap, Mail, Download, type LucideIcon } from "lucide-react";
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

type Floater = { src: string; alt: string; w: number; baseAngle: number; delay: number };

// Non-sequential base angles so pieces fly out from different sides (not in order).
const RAW: { src: string; alt: string; w: number; baseAngle: number }[] = [
  { src: nsac.url, alt: "NASA Space Apps Challenge 2022", w: 360, baseAngle: -70 },
  { src: prothom.url, alt: "Prothom Alo", w: 350, baseAngle: 140 },
  { src: nasa.url, alt: "NASA Earth Data", w: 340, baseAngle: 30 },
  { src: samakal.url, alt: "Samakal", w: 360, baseAngle: -150 },
  { src: daily24.url, alt: "The Daily Star 2024", w: 380, baseAngle: 75 },
  { src: kaler.url, alt: "Kaler Kantho", w: 360, baseAngle: -20 },
  { src: observer.url, alt: "Daily Observer", w: 340, baseAngle: 165 },
  { src: daily23.url, alt: "The Daily Star 2023", w: 330, baseAngle: -110 },
  { src: news24.url, alt: "NEWS24", w: 320, baseAngle: 105 },
];

const PER_IMAGE_DURATION = 7.5; // seconds: one image travels center → fully off page (constant speed)
const STAGGER = 3.2; // ~2-3 alive at once
const LOOP_GAP = 0;

const FLOATERS: Floater[] = RAW.map((f, i) => ({ ...f, delay: i * STAGGER }));
const LOOP_DURATION = RAW.length * STAGGER + PER_IMAGE_DURATION + LOOP_GAP;

function FloatingPiece({ f }: { f: Floater }) {
  const controls = useAnimationControls();

  useEffect(() => {
    let cancelled = false;
    const dist = 78; // vmin — travel past the edge so it slides out of the page

    const run = async () => {
      await new Promise((r) => setTimeout(r, (1.2 + f.delay) * 1000));
      let cycle = 0;
      while (!cancelled) {
        // Shuffle: jitter angle each loop so order/direction varies, but style stays same
        const jitter = Math.sin((f.baseAngle + cycle * 47.3) * 0.91) * 35;
        const angle = f.baseAngle + jitter;
        const rad = (angle * Math.PI) / 180;
        const tx = `${Math.cos(rad) * dist}vmin`;
        const ty = `${Math.sin(rad) * dist * 0.95}vmin`;

        await controls.start({
          x: [`-50%`, `calc(-50% + ${tx})`],
          y: [`-50%`, `calc(-50% + ${ty})`],
          scale: [0.85, 1, 1.05],
          opacity: [0, 1, 1],
          transition: {
            duration: PER_IMAGE_DURATION,
            times: [0, 0.08, 1],
            ease: "linear", // constant speed center → off page
          },
        });
        if (cancelled) break;
        // reset to center invisibly for next cycle
        await controls.set({ x: "-50%", y: "-50%", scale: 0.2, opacity: 0 });
        cycle++;
        await new Promise((r) => setTimeout(r, (LOOP_DURATION - PER_IMAGE_DURATION) * 1000));
      }
    };

    run();
    return () => {
      cancelled = true;
      controls.stop();
    };
  }, [controls, f.baseAngle, f.delay]);

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
  { href: "#bio", label: "Bio", Icon: User },
  { href: "#projects", label: "Project", Icon: Briefcase },
  { href: "#awards", label: "Award", Icon: Award },
  { href: "#media", label: "Media", Icon: Newspaper },
  { href: "#work", label: "Experience", Icon: GraduationCap },
  { href: "#contact", label: "Contact", Icon: Mail },
];

// Static orbit nav — interactive icon buttons with tooltip on hover, no rotation
function OrbitRing({ radius = 215 }: { radius?: number }) {
  return (
    <div
      className="pointer-events-none relative"
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
              className="pointer-events-auto group relative flex size-12 items-center justify-center rounded-full bg-white text-ink shadow-[0_10px_28px_-10px_rgba(0,0,0,0.4)] ring-1 ring-ink/10 transition-all duration-300 hover:scale-110 hover:bg-ink hover:text-white md:size-14"
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
      className="relative flex h-[100svh] min-h-[640px] flex-col items-center justify-between overflow-hidden px-4 pt-16 pb-6 md:px-6 md:pt-20 md:pb-10"
      style={{
        background: "radial-gradient(130% 90% at 50% 0%, #FFFDF8 0%, #FFF7DF 55%, #FCEBB0 120%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          background: "radial-gradient(55% 45% at 50% 55%, rgba(255,206,0,0.10), rgba(255,206,0,0) 70%)",
        }}
      />

      {/* Floating press collage */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {FLOATERS.map((f, i) => (
          <FloatingPiece key={i} f={f} />
        ))}
      </div>

      {/* Blur lens */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[92%] w-[640px] max-w-[88vw] -translate-x-1/2 -translate-y-1/2 rounded-[40%]"
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage: "radial-gradient(closest-side, rgba(0,0,0,1) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "radial-gradient(closest-side, rgba(0,0,0,1) 55%, rgba(0,0,0,0.6) 75%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* Top: Name + tagline */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-montreal text-[12vw] font-black leading-[0.88] tracking-[-0.03em] text-ink sm:text-[10vw] md:text-[6.5rem]"
        >
          Munim Ahmed
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-3 max-w-3xl font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-ink/80 md:text-sm"
        >
          A footslogger who wants to aid with his hand
        </motion.p>
      </div>

      {/* Middle: portrait centered with orbit nav around it */}
      <div className="relative z-10 flex items-center justify-center">
        <div className="md:hidden">
          <OrbitRing radius={105} />
        </div>
        <div className="hidden md:block">
          <OrbitRing radius={150} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="absolute inset-0 -z-10 rounded-full bg-sun/30 blur-3xl glow-pulse"
            style={{ transform: "scale(1.9)" }}
          />
          <motion.div
            animate={{ y: [0, -8, 0], scale: [1, 1.02, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-24 overflow-hidden rounded-full bg-ink ring-[5px] ring-ink shadow-[0_30px_80px_-25px_rgba(0,0,0,0.55)] sm:size-28 md:size-44"
          >
            <img src={portrait} alt="Munim Ahmed" width={560} height={560} className="h-full w-full object-cover" />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom: Resume download */}
      <motion.a
        href="/resume.pdf"
        download
        aria-label="Download resume"
        title="Download Resume"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="group relative z-10 flex size-12 items-center justify-center rounded-full bg-sun text-ink shadow-[0_14px_40px_-10px_rgba(39,34,31,0.45)] ring-2 ring-ink/15 transition-transform hover:scale-110 md:size-14"
      >
        <span className="pointer-events-none absolute inset-0 -z-10 animate-ping rounded-full bg-sun/70" />
        <span className="pointer-events-none absolute -inset-1 -z-10 rounded-full bg-sun/40 blur-md animate-pulse" />
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded-full border-2 border-dashed border-ink"
          style={{ animation: "spin 8s linear infinite" }}
        />
        <motion.span
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-flex"
        >
          <Download className="size-4 md:size-5" strokeWidth={2.4} />
        </motion.span>
        <span className="pointer-events-none absolute right-[110%] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-ink px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          Resume
        </span>
      </motion.a>
    </section>
  );
}
