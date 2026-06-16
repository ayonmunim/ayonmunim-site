import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";

export function Experience() {
  return (
    <section
      id="work"
      className="relative py-28 md:py-40"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #FFFDF8 0%, #FFF7DF 60%, #FCEBB0 130%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/70">
            (02) Experience
          </p>
          <h2 className="mt-6 max-w-3xl font-paint paint-ink text-5xl uppercase leading-[0.95] tracking-[0.01em] md:text-7xl">
            A timeline of teams, products, and <span className="text-ink/70">problems worth solving.</span>
          </h2>
        </AnimatedSection>

        <div className="mt-20 lg:pl-[28%]">
          <div className="relative border-l border-ink/25 pl-10">
            {resume.experience.map((exp, i) => (
              <AnimatedSection key={exp.role} delay={i * 0.1} className="relative pb-16 last:pb-0">
                <span className="absolute -left-[45px] top-2 size-3 rounded-full bg-ink ring-4 ring-sun shadow-[0_0_0_2px_rgba(0,0,0,0.15)]" />
                <div className="text-[11px] uppercase tracking-[0.2em] text-ink/60">{exp.period}</div>
                <h3 className="mt-3 font-paint paint-ink text-3xl uppercase tracking-wide md:text-5xl">
                  {exp.role}
                </h3>
                <div className="mt-2 text-sm text-ink/70">
                  {exp.company} — {exp.location}
                </div>
                <ul className="mt-6 space-y-3 text-ink/80">
                  {exp.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-[15px] leading-relaxed">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ink" />
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
