import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { initUISound, isSoundEnabled, setSoundEnabled } from "@/lib/ui-sound";

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
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-ink text-bone"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <span className="font-paint text-2xl uppercase tracking-wide">
                Munim
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-white/10"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="grid flex-1 grid-cols-1 gap-3 overflow-y-auto p-5 content-start sm:grid-cols-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  className="group relative flex h-32 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
                    0{i + 1}
                  </span>
                  <span className="font-paint text-3xl uppercase leading-tight tracking-wide">
                    {l.label}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="border-t border-white/10 p-5">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center rounded-full bg-bone px-5 py-3 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(255,255,255,0.25)]"
              >
                Get in touch
              </a>
              <div className="mt-4 text-center text-xs text-bone/55">
                ayonmunim26@gmail.com
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
