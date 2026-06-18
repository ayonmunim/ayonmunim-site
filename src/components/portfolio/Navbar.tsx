import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Volume2, VolumeX, Download } from "lucide-react";
import { initUISound, isSoundEnabled, setSoundEnabled } from "@/lib/ui-sound";
import daily23 from "@/assets/press/Daily_23.png.asset.json";
import daily24 from "@/assets/press/Daily_24.png.asset.json";
import kaler from "@/assets/press/Kaler_Kantho.png.asset.json";
import nasa from "@/assets/press/NASA.png.asset.json";
import observer from "@/assets/press/Observer.png.asset.json";
import samakal from "@/assets/press/Samakal.png.asset.json";
import prothom from "@/assets/press/Prothom_Alo_2023_2.png.asset.json";

const NEWS_IMAGES = [
  { src: daily24.url, alt: "The Daily Star 2024" },
  { src: prothom.url, alt: "Prothom Alo" },
  { src: kaler.url, alt: "Kaler Kantho" },
  { src: samakal.url, alt: "Samakal" },
  { src: nasa.url, alt: "NASA" },
  { src: observer.url, alt: "Daily Observer" },
  { src: daily23.url, alt: "The Daily Star 2023" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [sound, setSound] = useState(true);

  useEffect(() => {
    initUISound();
    setSound(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const next = !sound;
    setSoundEnabled(next);
    setSound(next);
  };

  return (
    <>


      {/* Vertical right-middle rail: menu + sound (yellow theme, white content) */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3"
      >
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.4)] ring-1 ring-ink/10 transition-colors"
        >
          <span className="absolute inset-0 scale-0 rounded-full bg-ink transition-transform duration-500 ease-out group-hover:scale-100" />
          <Menu className="relative size-5 transition-colors group-hover:text-white" />
        </button>

        <button
          aria-label={sound ? "Mute interface sounds" : "Enable interface sounds"}
          onClick={toggleSound}
          className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] ring-1 ring-ink/10 transition-colors"
        >
          <span className="absolute inset-0 scale-0 rounded-full bg-sun transition-transform duration-500 ease-out group-hover:scale-100" />
          {sound ? (
            <Volume2 className="relative size-5 transition-colors group-hover:text-white" />
          ) : (
            <VolumeX className="relative size-5 transition-colors group-hover:text-white" />
          )}
        </button>
        <div className="mt-1 h-16 w-px bg-ink/30" />
        <span
          className="rotate-180 font-sans text-[10px] uppercase tracking-[0.3em] text-ink/60"
          style={{ writingMode: "vertical-rl" }}
        >
          Munim
        </span>

      </motion.div>

      {/* Full-screen overlay menu */}
      <AnimatePresence>
        {open && <MenuOverlay onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

const overlayLinks = [
  { href: "#bio",      label: "Bio" },
  { href: "#media",    label: "Media" },
  { href: "#awards",   label: "News" },
  { href: "#work",     label: "Achievement" },
  { href: "#projects", label: "Project" },
];

function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[60] overflow-y-auto bg-sun text-white"
    >
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="group fixed right-5 top-5 z-10 flex size-11 items-center justify-center overflow-hidden rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.3)] transition-colors"
      >
        <span className="absolute inset-0 scale-0 rounded-full bg-sun transition-transform duration-500 ease-out group-hover:scale-100" />
        <X className="relative size-5 transition-colors group-hover:text-white" />
      </button>

      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1fr_1.1fr_1.4fr] md:gap-8 md:px-12 md:py-16">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-col justify-end gap-8 md:pb-6"
        >
          <div className="space-y-3">
            <div className="font-montreal text-[10px] uppercase tracking-[0.35em] text-white/80">
              Get in touch
            </div>
            <a
              href="mailto:ayonmunim26@gmail.com"
              className="block font-montreal text-xl font-light text-white transition hover:text-white md:text-2xl"
            >
              ayonmunim26@gmail.com
            </a>
          </div>
          <ul className="space-y-3 font-montreal text-[11px] uppercase tracking-[0.3em] text-white/80">
            {[
              { label: "Facebook", href: "#" },
              { label: "LinkedIn", href: "#" },
              { label: "GitHub",   href: "#" },
            ].map((s) => (
              <li key={s.label}>
                <a href={s.href} className="transition hover:text-white">{s.label}</a>
              </li>
            ))}
          </ul>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="relative flex h-[70vh] items-center justify-center self-center overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 14%, #000 86%, transparent)",
          }}
        >
          <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
            className="flex w-full flex-col gap-5"
          >
            {[...NEWS_IMAGES, ...NEWS_IMAGES].map((img, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-md ring-1 ring-white/20 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.35)]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="block h-72 w-full object-cover md:h-80"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </motion.div>

        <nav className="flex flex-col justify-center gap-2 md:items-end md:text-right">
          {overlayLinks.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={onClose}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative inline-block font-montreal text-5xl font-bold leading-[1.05] tracking-[-0.02em] text-white transition-colors hover:text-white md:text-[5.5rem]"
            >
              <span className="relative">
                {l.label}
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white transition-all duration-500 group-hover:w-full" />
              </span>
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.div>
  );
}
