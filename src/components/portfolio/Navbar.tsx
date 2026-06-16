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
          className="group flex size-12 items-center justify-center rounded-full border border-ink/15 bg-white/85 text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-ink hover:text-sun"
        >
          <Menu className="size-5" />
        </button>
        <button
          aria-label={sound ? "Mute interface sounds" : "Enable interface sounds"}
          onClick={toggleSound}
          className="flex size-12 items-center justify-center rounded-full border border-ink/15 bg-white/85 text-ink shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] backdrop-blur-xl transition hover:bg-ink hover:text-sun"
        >
          {sound ? <Volume2 className="size-5" /> : <VolumeX className="size-5" />}
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
