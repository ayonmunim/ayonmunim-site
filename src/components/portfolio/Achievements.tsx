import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { resume } from "@/data/resume";
import nasa from "@/assets/nasa-award.jpg";
import { AnimatedSection } from "./AnimatedSection";

export function Achievements() {
  const featured = resume.achievements.find((a) => "featured" in a && (a as { featured?: boolean }).featured);
  const rest = resume.achievements.filter((a) => a !== featured);

  return (
    <section id="awards" className="relative bg-secondary py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--ember)]">05 — Awards</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
            Recognition that <span className="italic text-gradient">pushed</span> the work forward.
          </h2>
        </AnimatedSection>

        {/* Featured NASA */}
        {featured && (
          <AnimatedSection delay={0.1} className="mt-16">
            <div className="group relative overflow-hidden rounded-[2rem] bg-ink text-bone shadow-[var(--shadow-card)]">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="relative h-72 overflow-hidden lg:h-full">
                  <motion.img
                    src={nasa}
                    alt="NASA Space Apps"
                    loading="lazy"
                    width={1600}
                    height={1000}
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/40 to-transparent lg:bg-gradient-to-l" />
                </div>
                <div className="relative p-10 lg:p-14">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[var(--ember)] backdrop-blur">
                    <Trophy className="size-3.5" /> Global Champion · 2022
                  </div>
                  <h3 className="mt-5 font-display text-3xl font-medium leading-tight md:text-5xl">
                    NASA Space Apps Challenge — <span className="text-gradient italic">Global Winner</span>
                  </h3>
                  <p className="mt-5 max-w-xl text-bone/75 md:text-lg">{featured.detail}</p>
                  <div className="mt-8 grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
                    <div>
                      <div className="font-display text-3xl">162</div>
                      <div className="text-xs uppercase tracking-wider text-bone/60">Countries</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl">25K+</div>
                      <div className="text-xs uppercase tracking-wider text-bone/60">Participants</div>
                    </div>
                    <div>
                      <div className="font-display text-3xl">#1</div>
                      <div className="text-xs uppercase tracking-wider text-bone/60">Worldwide</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {/* Other achievements */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
          {rest.map((a, i) => (
            <AnimatedSection key={a.title} delay={i * 0.05}>
              <div className="group flex h-full items-start gap-5 rounded-2xl border border-foreground/10 bg-background p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-card)]">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-foreground text-background transition group-hover:bg-[var(--electric)]">
                  <Trophy className="size-5" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{a.year}</div>
                  <h4 className="mt-1 font-display text-xl font-medium">{a.title}</h4>
                  <p className="mt-2 text-sm text-foreground/75">{a.detail}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
