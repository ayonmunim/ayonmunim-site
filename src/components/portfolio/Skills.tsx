import { AnimatedSection } from "./AnimatedSection";
import { motion } from "motion/react";

const skillGroups: { name: string; items: string[] }[] = [
  { name: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", items: ["Django", "Node.js", "Express", "REST APIs", "GraphQL"] },
  { name: "Data Analytics", items: ["MySQL", "PostgreSQL", "pandas", "Power BI", "SQL"] },
  { name: "Machine Learning", items: ["scikit-learn", "TensorFlow", "NumPy", "Python"] },
  { name: "UI/UX Design", items: ["Figma", "Design Systems", "Prototyping", "Accessibility"] },
  { name: "Tools & Platforms", items: ["Git", "Docker", "Vercel", "Linux", "Jira"] },
];

export function Skills() {
  return (
    <section className="border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/50">
            (05) Skills
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            A toolkit chosen for precision, not novelty.
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => (
            <AnimatedSection key={group.name} delay={gi * 0.05}>
              <div className="h-full bg-bone p-8 transition-colors hover:bg-soft">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-lg font-medium tracking-tight">{group.name}</h3>
                  <span className="font-mono text-[10px] text-ink/40">
                    0{gi + 1}
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {group.items.map((it) => (
                    <motion.span
                      key={it}
                      whileHover={{ scale: 1.06, y: -2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                      className="inline-flex cursor-default items-center rounded-full border border-ink/15 bg-bone px-3 py-1.5 text-xs font-medium text-ink/80 transition-colors hover:border-ink hover:bg-ink hover:text-bone"
                    >
                      {it}
                    </motion.span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
