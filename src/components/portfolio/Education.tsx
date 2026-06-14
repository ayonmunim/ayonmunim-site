import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";

export function Education() {
  return (
    <section className="border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/50">
            (06) Education
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Trained in software, sharpened by data.
          </h2>
        </AnimatedSection>

        <div className="mt-16 divide-y divide-line border-y border-line">
          {resume.education.map((e, i) => (
            <AnimatedSection key={e.degree} delay={i * 0.08}>
              <div className="grid grid-cols-12 items-baseline gap-6 py-8 md:py-10">
                <div className="col-span-12 text-[11px] uppercase tracking-[0.25em] text-ink/45 md:col-span-2">
                  {e.period}
                </div>
                <div className="col-span-12 md:col-span-6">
                  <h3 className="font-display text-2xl font-medium tracking-[-0.02em] md:text-3xl">
                    {e.degree}
                  </h3>
                  <div className="mt-2 text-sm text-ink/60">{e.school}</div>
                </div>
                <div className="col-span-12 text-sm text-ink/65 md:col-span-4">{e.detail}</div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
