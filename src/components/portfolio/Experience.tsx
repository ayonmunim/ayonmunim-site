import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";

export function Experience() {
  return (
    <section id="work" className="border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/50">
            (02) Experience
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            A timeline of teams, products, and problems worth solving.
          </h2>
        </AnimatedSection>

        <div className="mt-20 lg:pl-[28%]">
          <div className="relative border-l border-line pl-10">
            {resume.experience.map((exp, i) => (
              <AnimatedSection key={exp.role} delay={i * 0.1} className="relative pb-16 last:pb-0">
                <span className="absolute -left-[45px] top-2 size-2.5 rounded-full bg-ink ring-4 ring-bone" />
                <div className="text-[11px] uppercase tracking-[0.2em] text-ink/50">{exp.period}</div>
                <h3 className="mt-3 font-display text-3xl font-medium tracking-[-0.02em] md:text-4xl">
                  {exp.role}
                </h3>
                <div className="mt-2 text-sm text-ink/60">
                  {exp.company} — {exp.location}
                </div>
                <ul className="mt-6 space-y-3 text-ink/75">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
                      <span className="mt-2.5 size-1 shrink-0 rounded-full bg-ink/40" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
