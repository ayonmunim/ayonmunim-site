import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import { GraduationCap, Users } from "lucide-react";

export function Education() {
  return (
    <section className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--plasma)]">06 — Education</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
              Trained in <span className="italic text-gradient">software</span>, sharpened by <span className="italic text-gradient">data</span>.
            </h2>
          </AnimatedSection>
          <div className="space-y-4 lg:col-span-7">
            {resume.education.map((e, i) => (
              <AnimatedSection key={e.degree} delay={i * 0.1}>
                <div className="group flex items-start gap-5 rounded-3xl border border-foreground/10 bg-card p-7 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-[var(--plasma)]">
                    <GraduationCap className="size-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl font-medium">{e.degree}</h3>
                      <span className="text-xs uppercase tracking-wider text-muted-foreground">{e.period}</span>
                    </div>
                    <div className="mt-1 text-sm text-[var(--electric)]">{e.school}</div>
                    <p className="mt-3 text-sm text-foreground/75">{e.detail}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--ember)]">07 — Extra-Curricular</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-5xl">
              Community is part of the <span className="italic text-gradient">craft</span>.
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-7">
            {resume.activities.map((a, i) => (
              <AnimatedSection key={a.role} delay={i * 0.1}>
                <div className="rounded-3xl border border-foreground/10 bg-card p-7">
                  <Users className="size-5 text-[var(--ember)]" />
                  <h4 className="mt-4 font-display text-xl font-medium">{a.role}</h4>
                  <p className="mt-2 text-sm text-foreground/75">{a.detail}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
