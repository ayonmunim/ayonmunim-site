import { motion } from "motion/react";
import { ArrowUpRight, Github, Mail, MapPin } from "lucide-react";
import { resume } from "@/data/resume";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background pt-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 h-64 bg-gradient-to-b from-foreground/5 to-transparent" />
      <div className="mx-auto max-w-7xl px-6">
        {/* Big closing headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-y border-foreground/10 py-20"
        >
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--electric)]">Let's build</p>
          <h2 className="mt-4 font-display text-5xl font-medium leading-[0.95] tracking-tight md:text-[8rem]">
            Have an idea?<br />
            <a href={`mailto:${resume.email}`} className="group inline-flex items-baseline gap-3 text-gradient italic">
              Say hello
              <ArrowUpRight className="size-10 text-foreground transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 md:size-20" />
            </a>
          </h2>
        </motion.div>

        {/* Footer grid */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-display text-xl">
              <span className="inline-block size-2 rounded-full bg-[var(--electric)]" />
              Munim Ahmed
            </div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Aspiring software engineer building intelligent, human-centered digital experiences.
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="size-4" /> {resume.location}
            </div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Navigate</div>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="story-link text-sm transition hover:text-[var(--electric)]">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Elsewhere</div>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={resume.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-[var(--electric)]">
                  <Github className="size-4" /> GitHub
                </a>
              </li>
              <li>
                <a href={`mailto:${resume.email}`} className="inline-flex items-center gap-2 transition hover:text-[var(--electric)]">
                  <Mail className="size-4" /> Email
                </a>
              </li>
              <li>
                <a href="/resume.pdf" download className="inline-flex items-center gap-2 transition hover:text-[var(--electric)]">
                  Resume ↓
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-foreground/10 py-8 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Munim Ahmed. Crafted with care.</div>
          <div>Built with React, TypeScript, Tailwind & Framer Motion.</div>
        </div>
      </div>
    </footer>
  );
}
