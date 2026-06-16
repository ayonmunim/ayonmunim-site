import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Award } from "lucide-react";
import { resume } from "@/data/resume";
import { AnimatedSection } from "./AnimatedSection";

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <section id="awards" className="relative overflow-hidden border-t border-line bg-ink py-28 text-bone md:py-40">
      {/* Decorative gold blobs for glassmorphism context */}
      <div className="pointer-events-none absolute -top-32 left-1/4 size-[460px] rounded-full bg-bone/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-[520px] rounded-full bg-bone/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <AnimatedSection className="max-w-4xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bone/70">
            (04) Awards & Recognition
          </p>
          <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-[0.01em] md:text-7xl">
            Awarded for work that <span className="text-bone/60">pushes the medium.</span>
          </h2>
          <p className="mt-6 max-w-xl text-bone/65 md:text-lg">
            Selected recognitions from international and national competitions in
            engineering, data, and design.
          </p>
        </AnimatedSection>

        {/* Glassmorphism card grid */}
        <div ref={ref} className="mt-20 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {resume.achievements.map((a, i) => (
            <AchievementCard key={a.title} item={a} index={i} />
          ))}
        </div>
      </div>

      <motion.div
        style={{ x }}
        className="relative mt-28 whitespace-nowrap font-display text-[18vw] uppercase leading-none tracking-[-0.04em] text-bone/[0.06]"
      >
        Recognition · Craft · Recognition · Craft ·
      </motion.div>
    </section>
  );
}

function AchievementCard({
  item,
  index,
}: {
  item: { title: string; year: string; detail: string };
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:bg-white/[0.09] hover:shadow-[0_30px_80px_-30px_rgba(255,255,255,0.25)]"
    >
      {/* Hover shine */}
      <div className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 45%)",
        }}
      />
      <div className="relative flex items-start justify-between">
        <span className="grid size-11 place-items-center rounded-xl border border-white/15 bg-white/5 text-bone transition-colors group-hover:border-white/40 group-hover:bg-white/10">
          <Award className="size-5" />
        </span>
        <span className="text-[11px] uppercase tracking-[0.25em] text-bone/50">{item.year}</span>
      </div>
      <h3 className="relative mt-6 font-display text-2xl uppercase leading-tight tracking-wide md:text-3xl">
        {item.title}
      </h3>
      <p className="relative mt-4 text-sm leading-relaxed text-bone/65">{item.detail}</p>
    </motion.div>
  );
}
