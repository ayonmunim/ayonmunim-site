import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import aboutBg from "@/assets/about-bg.jpg";

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <AnimatedSection className="lg:col-span-5">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--electric)]">01 — About</p>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
              An engineer who treats <span className="italic text-gradient">interfaces</span> as ideas.
            </h2>
          </AnimatedSection>

          <AnimatedSection delay={0.1} className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-foreground/80 md:text-xl">
              {resume.summary}
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
              {[
                { k: "Role", v: resume.role },
                { k: "Based", v: resume.location },
                { k: "Email", v: resume.email },
                { k: "GitHub", v: resume.handle },
                { k: "Focus", v: "Full-stack, UI/UX, ML" },
                { k: "Status", v: "Open to work" },
              ].map((i) => (
                <div key={i.k} className="rounded-2xl border border-foreground/10 bg-background/50 p-4">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{i.k}</div>
                  <div className="mt-1 text-sm font-medium truncate">{i.v}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* image strip */}
        <AnimatedSection delay={0.2} className="mt-20">
          <div className="relative overflow-hidden rounded-[2rem] ring-1 ring-foreground/10">
            <img src={aboutBg} alt="" loading="lazy" width={1600} height={1000} className="h-[42vh] w-full object-cover transition-transform duration-1000 hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <p className="max-w-3xl font-display text-2xl text-bone md:text-4xl">
                "Good software is invisible. Good design is inevitable. I try to build at the seam."
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
