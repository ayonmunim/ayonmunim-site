import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { resume } from "@/data/resume";
import { AnimatedSection } from "./AnimatedSection";

export function Achievements() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["8%", "-12%"]);

  return (
    <section id="awards" className="relative border-t border-line bg-ink py-28 text-bone md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-bone/55">
            (04) Awards & Recognition
          </p>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] md:text-7xl">
            Awarded for work that pushes the medium.
          </h2>
          <p className="mt-6 max-w-xl text-bone/60 md:text-lg">
            Selected recognitions from international and national competitions in
            engineering, data, and design.
          </p>
        </AnimatedSection>

        {/* Editorial card grid */}
        <div ref={ref} className="mt-20 space-y-4">
          {resume.achievements.map((a, i) => (
            <AchievementRow key={a.title} item={a} index={i} />
          ))}
        </div>
      </div>

      {/* Marquee — oversized typography */}
      <motion.div
        style={{ x }}
        className="mt-28 whitespace-nowrap font-display text-[18vw] font-medium leading-none tracking-[-0.05em] text-bone/[0.06]"
      >
        Recognition · Craft · Recognition · Craft ·
      </motion.div>
    </section>
  );
}

function AchievementRow({
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
      className="group grid grid-cols-12 items-center gap-6 border-t border-bone/10 py-8 transition-all hover:bg-bone/[0.02] md:py-10"
    >
      <div className="col-span-12 text-[11px] uppercase tracking-[0.25em] text-bone/45 md:col-span-2">
        {item.year}
      </div>
      <div className="col-span-12 md:col-span-6">
        <h3 className="font-display text-2xl font-medium leading-tight tracking-[-0.02em] md:text-4xl">
          <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
            {item.title}
          </span>
        </h3>
      </div>
      <div className="col-span-12 text-sm leading-relaxed text-bone/60 md:col-span-4">
        {item.detail}
      </div>
    </motion.div>
  );
}
