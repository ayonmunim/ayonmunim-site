import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = links.map((l) => document.querySelector(l.href));
      const y = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i] as HTMLElement | null;
        if (el && el.offsetTop <= y) {
          setActive(links[i].href);
          break;
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <div
        className={`flex w-full max-w-5xl items-center justify-between gap-4 rounded-full border px-3 py-2 transition-all duration-500 ${
          scrolled
            ? "border-ink/10 bg-white/70 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.25)] backdrop-blur-xl"
            : "border-white/40 bg-white/40 backdrop-blur-md"
        }`}
      >
        <a href="#top" className="pl-3 font-display text-base uppercase tracking-[0.08em]">
          <span className="text-sun-deep">M</span>UNIM
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`group relative rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition ${
                active === l.href ? "text-ink" : "text-ink/65 hover:text-ink"
              }`}
            >
              {l.label}
              <span
                className={`pointer-events-none absolute bottom-1 left-1/2 h-[2px] -translate-x-1/2 rounded-full bg-sun-deep transition-all duration-400 ease-out ${
                  active === l.href ? "w-6 opacity-100" : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                }`}
              />
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-sun px-5 py-2 text-[13px] font-semibold text-ink shadow-[0_8px_24px_-10px_rgba(245,196,0,0.8)] transition hover:bg-sun-deep md:inline-block"
        >
          Get in touch
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-full p-2 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-ink text-bone md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <span className="font-display text-base uppercase tracking-wide">
                <span className="text-bone">M</span>UNIM
              </span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="rounded-full p-2 hover:bg-white/10">
                <X className="size-5" />
              </button>
            </div>
            <nav className="grid flex-1 grid-cols-2 gap-3 overflow-y-auto p-5 content-start">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  className="group relative flex h-32 flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.08]"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-bone/55">
                    0{i + 1}
                  </span>
                  <span className="font-display text-2xl uppercase leading-tight tracking-wide">
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
              <div className="mt-4 text-center text-xs text-bone/55">ayonmunim26@gmail.com</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
