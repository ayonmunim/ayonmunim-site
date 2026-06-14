import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";

export function About() {
  return (
    <section id="about" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/50">
            (01) About
          </p>
        </AnimatedSection>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <AnimatedSection className="lg:col-span-6">
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
              An engineer who treats interfaces as ideas — and ideas as systems.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-ink/70">{resume.summary}</p>
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 text-sm">
              {[
                { k: "Role", v: "Software Engineer" },
                { k: "Based", v: resume.location },
                { k: "Email", v: resume.email },
                { k: "Focus", v: "Full-stack · UI · ML" },
                { k: "Status", v: "Open to work" },
                { k: "Years", v: "3+" },
              ].map((i) => (
                <div key={i.k}>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-ink/45">{i.k}</div>
                  <div className="mt-1.5 font-medium text-ink">{i.v}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
