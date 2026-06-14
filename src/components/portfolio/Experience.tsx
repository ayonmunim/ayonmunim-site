import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";

export function Experience() {
  return (
    <section id="work" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--plasma)]">03 — Work</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
              Where I've <span className="italic text-gradient">built</span>.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              A small sample of recent collaborations across product, engineering and design teams.
            </p>
          </AnimatedSection>

          <div className="lg:col-span-8">
            <div className="relative border-l border-foreground/10 pl-8">
              {resume.experience.map((exp, i) => (
                <AnimatedSection key={exp.role} delay={i * 0.1} className="relative pb-14 last:pb-0">
                  <span className="absolute -left-[37px] top-2 size-3 rounded-full bg-foreground ring-4 ring-background" />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-medium md:text-3xl">{exp.role}</h3>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <div className="mt-1 text-sm uppercase tracking-wider text-[var(--electric)]">
                    {exp.company} · {exp.location}
                  </div>
                  <ul className="mt-5 space-y-3">
                    {exp.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-foreground/80">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-foreground/40" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
