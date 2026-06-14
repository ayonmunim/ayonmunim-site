import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import { motion } from "motion/react";

export function Skills() {
  const groups = Object.entries(resume.skills);
  return (
    <section className="relative bg-foreground py-28 text-background md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--ember)]">02 — Stack</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl font-medium leading-tight md:text-6xl">
            Tools I reach for — chosen for <span className="italic text-gradient">precision</span>, not novelty.
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map(([group, items], gi) => (
            <AnimatedSection key={group} delay={gi * 0.05}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition hover:bg-white/[0.06]">
                <div className="absolute -right-12 -top-12 size-40 rounded-full bg-[var(--electric)]/20 blur-3xl transition-opacity group-hover:opacity-100 opacity-40" />
                <div className="text-[10px] uppercase tracking-[0.25em] text-background/60">{group}</div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {items.map((it) => (
                    <motion.span
                      key={it}
                      whileHover={{ scale: 1.06, y: -2 }}
                      className="inline-flex cursor-default items-center rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-background/90 backdrop-blur"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* marquee */}
        <div className="mt-20 overflow-hidden">
          <div className="flex w-max marquee gap-12 whitespace-nowrap font-display text-5xl text-background/30 md:text-7xl">
            {Array.from({ length: 2 }).flatMap((_, k) =>
              ["React", "TypeScript", "Django", "Python", "MySQL", "Tailwind", "Figma", "ML/AI", "Next.js"].map((w, i) => (
                <span key={`${k}-${i}`} className="flex items-center gap-12">
                  {w} <span className="text-[var(--ember)]">✦</span>
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
