import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { resume } from "@/data/resume";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#awards", label: "Awards" },
  { href: "#contact", label: "Contact" },
];

const elsewhere = [
  { href: `mailto:${resume.email}`, label: "Email" },
  { href: resume.github, label: "GitHub" },
  { href: "https://linkedin.com/in/ayonmunim", label: "LinkedIn" },
  { href: "/resume.pdf", label: "Resume ↓" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink pt-24 text-bone">
      {/* Soft white accent bar at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-bone/30" />
      <div className="pointer-events-none absolute -top-32 right-10 size-[420px] rounded-full bg-bone/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="border-b border-bone/10 pb-20"
        >
          <h2 className="font-display text-[11vw] uppercase leading-[0.92] tracking-[0.01em] md:text-[8rem]">
            Let's build<br />something<br />
            <a href={`mailto:${resume.email}`} className="group inline-flex items-baseline gap-3 text-bone">
              meaningful.
              <ArrowUpRight className="size-10 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2 md:size-20" />
            </a>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <div className="font-display text-lg uppercase tracking-wide">
              <span className="text-sun">M</span>UNIM AHMED
            </div>
            <p className="mt-4 max-w-xs text-sm text-bone/60">
              Software engineer building intelligent, human-centered digital experiences.
            </p>
            <div className="mt-6 text-sm text-bone/60">{resume.location}</div>
            <a
              href={`mailto:${resume.email}`}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2.5 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(245,196,0,0.8)] transition hover:bg-sun-deep"
            >
              Get in touch <ArrowUpRight className="size-4" />
            </a>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <div className="text-[10px] uppercase tracking-[0.25em] text-sun">Navigate</div>
            <ul className="mt-5 space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="story-link text-sm text-bone/85 transition hover:text-bone">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.25em] text-sun">Elsewhere</div>
            <ul className="mt-5 space-y-3 text-sm">
              {elsewhere.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="story-link text-bone/85 transition hover:text-bone"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-bone/10 py-8 text-xs text-bone/55 md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} <span className="text-sun">Munim Ahmed</span>. All rights reserved.</div>
          <div>Built with React, TypeScript, Tailwind & Framer Motion.</div>
        </div>
      </div>
    </footer>
  );
}
