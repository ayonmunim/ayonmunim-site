import { motion } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import certificate from "@/assets/diu-certificate.jpg.asset.json";

export function Education() {
  return (
    <section id="education" className="relative bg-black py-28 text-white md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
            (02) Education
          </p>
          <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Trained in software, sharpened by data.
          </h2>
        </AnimatedSection>

        <div className="mt-20 grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Left — education list */}
          <div className="divide-y divide-white/10 border-y border-white/10">
            {resume.education.map((e, i) => (
              <AnimatedSection key={e.degree} delay={i * 0.08}>
                <div className="group grid grid-cols-12 items-baseline gap-4 py-8 transition-colors hover:bg-white/[0.03] md:py-10">
                  <div className="col-span-12 text-[11px] uppercase tracking-[0.25em] text-white/70 md:col-span-3">
                    {e.period}
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <h3 className="font-display text-2xl uppercase tracking-wide md:text-3xl">
                      {e.degree}
                    </h3>
                    <div className="mt-2 text-sm text-white/60">{e.school}</div>
                    <div className="mt-1 text-sm text-white/55">{e.detail}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Right — sticky certificate with animated silver/black border */}
          <div className="relative">
            <div className="lg:sticky lg:top-24">
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, margin: "-120px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Animated silver-black conic border */}
                <div
                  aria-hidden
                  className="cert-border absolute -inset-[3px] rounded-2xl"
                />
                <div className="relative overflow-hidden rounded-2xl bg-black p-2 shadow-[0_40px_120px_-30px_rgba(255,255,255,0.25)]">
                  <img
                    src={certificate.url}
                    alt="Bachelor of Science in Software Engineering — Daffodil International University"
                    className="block h-auto w-full rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className="mt-5 text-center text-[11px] uppercase tracking-[0.3em] text-white/50">
                  Daffodil International University · 2024
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .cert-border {
          background: conic-gradient(
            from 0deg,
            #1a1a1a 0%,
            #c0c0c0 20%,
            #ffffff 30%,
            #c0c0c0 40%,
            #1a1a1a 50%,
            #c0c0c0 70%,
            #ffffff 80%,
            #c0c0c0 90%,
            #1a1a1a 100%
          );
          animation: cert-spin 6s linear infinite;
          border-radius: 1rem;
        }
        @keyframes cert-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}
