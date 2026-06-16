import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { initUISound, isSoundEnabled, setSoundEnabled } from "@/lib/ui-sound";
import nasaAward from "@/assets/nasa-award.jpg";
import munimHero from "@/assets/munim-hero.jpg";


const links = [
  { href: "#top",      label: "Home" },
  { href: "#bio",      label: "Bio" },
  { href: "#projects", label: "Project" },
  { href: "#awards",   label: "Award" },
  { href: "#media",    label: "Media" },
  { href: "#work",     label: "Experience" },
  { href: "#contact",  label: "Contact" },
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
      {/* Vertical right-middle rail: menu + sound */}
      <motion.div
        initial={{ x: 30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-center gap-3"
      >
        <button
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-ink/15 bg-white text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-ink/40"
        >
          <span className="absolute inset-0 scale-0 rounded-full bg-sun transition-transform duration-500 ease-out group-hover:scale-100" />
          <Menu className="relative size-5" />
        </button>
        <button
          aria-label={sound ? "Mute interface sounds" : "Enable interface sounds"}
          onClick={toggleSound}
          className="group relative flex size-12 items-center justify-center overflow-hidden rounded-full border border-ink/15 bg-sun text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:border-ink/40"
        >
          <span className="absolute inset-0 scale-0 rounded-full bg-white transition-transform duration-500 ease-out group-hover:scale-100" />
          {sound ? <Volume2 className="relative size-5" /> : <VolumeX className="relative size-5" />}
        </button>
        <div className="mt-1 h-16 w-px bg-ink/20" />
        <span className="rotate-180 text-[10px] uppercase tracking-[0.3em] text-ink/50" style={{ writingMode: "vertical-rl" }}>
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
      className="fixed inset-0 z-[60] bg-ink text-bone overflow-y-auto"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="fixed right-5 top-5 z-10 flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-bone backdrop-blur-md transition hover:bg-white/[0.12]"
      >
        <X className="size-5" />
      </button>

      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1fr_1.1fr_1.4fr] md:gap-8 md:px-12 md:py-16">
        {/* Left: contact + socials */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="flex flex-col justify-end gap-8 md:pb-6"
        >
          <div className="space-y-3">
            <div className="text-[10px] uppercase tracking-[0.35em] text-bone/55">
              Get in touch
            </div>
            <a
              href="mailto:ayonmunim26@gmail.com"
              className="block font-serif text-xl text-bone/95 transition hover:text-white md:text-2xl"
            >
              ayonmunim26@gmail.com
            </a>
          </div>
          <ul className="space-y-3 text-[11px] uppercase tracking-[0.3em] text-bone/65">
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

        {/* Center: image collage */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="flex flex-col gap-4 self-center"
        >
          <div className="overflow-hidden rounded-md shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <img src={nasaAward} alt="Award ceremony" className="h-64 w-full object-cover md:h-80" />
          </div>
          <div className="overflow-hidden rounded-md shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
            <img src={munimHero} alt="Munim Ahmed" className="h-64 w-full object-cover md:h-80" />
          </div>
        </motion.div>

        {/* Right: menu items */}
        <nav className="flex flex-col justify-center gap-2 md:items-end md:text-right">
          {overlayLinks.map((l, i) => (
            <motion.a
              key={l.href}
              href={l.href}
              onClick={onClose}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative inline-block font-serif text-5xl leading-[1.05] text-bone/90 transition-colors hover:text-white md:text-[5.5rem]"
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

