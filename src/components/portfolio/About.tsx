import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import {
  Code2, Database, Brain, Palette, Wrench, Server,
  GraduationCap, MapPin, Mail as MailIcon, Briefcase,
} from "lucide-react";

const skillGroups = [
  { name: "Frontend",        icon: Code2,    items: ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion"] },
  { name: "Backend",         icon: Server,   items: ["Django", "Node.js", "Express", "REST", "GraphQL"] },
  { name: "Data & Analytics",icon: Database, items: ["PostgreSQL", "MySQL", "pandas", "Power BI", "SQL"] },
  { name: "Machine Learning",icon: Brain,    items: ["scikit-learn", "TensorFlow", "NumPy", "Python"] },
  { name: "UI / UX Design",  icon: Palette,  items: ["Figma", "Design Systems", "Prototyping", "A11y"] },
  { name: "Tools",           icon: Wrench,   items: ["Git", "Docker", "Vercel", "Linux", "Jira"] },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Smooth transition from cream → full black as the section enters
  const bg = useTransform(
    scrollYProgress,
    [0, 0.18, 0.35, 1],
    ["#FFFDF8", "#1a1a1a", "#000000", "#000000"]
  );
  const fg = useTransform(scrollYProgress, [0, 0.25, 0.4, 1], ["#000000", "#ffffff", "#ffffff", "#ffffff"]);

  return (
    <motion.section
      ref={ref}
      id="about"
      style={{ backgroundColor: bg, color: fg }}
      className="relative py-28 md:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sun">
            (01) About
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-6">
            <h2 className="font-display text-5xl uppercase leading-[0.95] tracking-[0.01em] md:text-7xl">
              An engineer who treats interfaces<br />
              as ideas — and ideas <span className="text-sun">as systems.</span>
            </h2>
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
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-sun">
                    <i.icon className="size-3" /> {i.k}
                  </div>
                  <div className="mt-1.5 font-medium">{i.v}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* Skills — modern visualization (black & white) */}
        <AnimatedSection delay={0.15}>
          <div className="mt-28 flex items-baseline justify-between">
            <h3 className="font-display text-3xl uppercase tracking-[0.02em] md:text-5xl">
              <span className="text-sun">/</span> Skills
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
                className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-md transition-colors hover:border-sun/60 hover:bg-white/[0.06]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors group-hover:border-sun group-hover:text-sun">
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

        {/* Education embedded */}
        <AnimatedSection delay={0.1}>
          <div className="mt-28 flex items-baseline justify-between">
            <h3 className="font-display text-3xl uppercase tracking-[0.02em] md:text-5xl">
              <span className="text-sun">/</span> Education
            </h3>
            <span className="text-[10px] uppercase tracking-[0.25em] text-white/40">
              Academic Background
            </span>
          </div>
        </AnimatedSection>

        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {resume.education.map((e, i) => (
            <AnimatedSection key={e.degree} delay={i * 0.08}>
              <div className="group grid grid-cols-12 items-baseline gap-6 py-8 transition-colors hover:bg-white/[0.03] md:py-10">
                <div className="col-span-12 text-[11px] uppercase tracking-[0.25em] text-sun md:col-span-2">
                  {e.period}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <h4 className="font-display text-2xl uppercase tracking-wide md:text-3xl">
                    {e.degree}
                  </h4>
                  <div className="mt-2 text-sm text-white/60">{e.school}</div>
                </div>
                <div className="col-span-12 text-sm text-white/65 md:col-span-4">{e.detail}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
