import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import portraitAsset from "@/assets/munim-portrait.jpg.asset.json";
import {
  Code2, Database, Brain, Palette, Wrench, Server,
  GraduationCap, MapPin, Mail as MailIcon, Briefcase,
} from "lucide-react";

// UI/UX Design first, then the rest in clean order.
const skillGroups = [
  { name: "UI / UX Design",   icon: Palette,  items: ["Figma", "Design Systems", "Prototyping", "A11y"] },
  { name: "Frontend",         icon: Code2,    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { name: "Backend",          icon: Server,   items: ["Django", "Node.js", "Express", "REST", "GraphQL"] },
  { name: "Data & Analytics", icon: Database, items: ["PostgreSQL", "MySQL", "pandas", "Power BI", "SQL"] },
  { name: "Machine Learning", icon: Brain,    items: ["scikit-learn", "TensorFlow", "NumPy", "Python"] },
  { name: "Tools",            icon: Wrench,   items: ["Git", "Docker", "Vercel", "Linux", "Jira"] },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bg = useTransform(
    scrollYProgress,
    [0, 0.18, 0.35, 1],
    ["#FFFDF8", "#1a1a1a", "#000000", "#000000"]
  );
  const fg = useTransform(scrollYProgress, [0, 0.25, 0.4, 1], ["#000000", "#ffffff", "#ffffff", "#ffffff"]);

  return (
    <motion.section
      ref={ref}
      id="bio"
      style={{ backgroundColor: bg, color: fg }}
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
            (01) Bio
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Black & white portrait replaces the headline */}
          <AnimatedSection className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[3/4] w-full max-w-md overflow-hidden rounded-2xl ring-1 ring-white/15 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.6)]"
            >
              <img
                src={portraitAsset.url}
                alt="Munim Ahmed"
                className="h-full w-full object-cover"
                style={{ filter: "grayscale(100%) contrast(1.05)" }}
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-white/75">{resume.summary}</p>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-white/15 pt-8 text-sm">
              {[
                { k: "Role", v: "Software Engineer", icon: Briefcase },
                { k: "Based", v: resume.location, icon: MapPin },
                { k: "Email", v: resume.email, icon: MailIcon },
                { k: "Focus", v: "Full-stack · UI · ML", icon: Code2 },
                { k: "Status", v: "Open to work", icon: Brain },
                { k: "Years", v: "3+", icon: GraduationCap },
              ].map((i) => (
                <div key={i.k}>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70">
                    <i.icon className="size-3" /> {i.k}
                  </div>
                  <div className="mt-1.5 font-medium">{i.v}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Skills */}
        <AnimatedSection delay={0.15}>
          <div className="mt-28 flex items-baseline justify-between">
            <h3 className="font-display text-3xl uppercase tracking-[0.02em] md:text-5xl">
              <span className="text-white/70">/</span> Skills
            </h3>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Toolkit · 2026
            </span>
          </div>
        </AnimatedSection>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, gi) => (
            <AnimatedSection key={g.name} delay={gi * 0.05}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-colors hover:border-white/30 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors group-hover:border-white/40 group-hover:text-white/70">
                      <g.icon className="size-5" />
                    </span>
                    <h4 className="font-display text-lg uppercase tracking-wide">{g.name}</h4>
                  </div>
                  <span className="font-mono text-[10px] text-white/30">0{gi + 1}</span>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/80 transition-colors group-hover:border-white/30"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
