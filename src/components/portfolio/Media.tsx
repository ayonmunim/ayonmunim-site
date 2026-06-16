import { motion } from "motion/react";
import { Newspaper, Radio, Tv } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { PaintTitle } from "./PaintTitle";

const placeholders = [
  {
    icon: Newspaper,
    outlet: "Press features",
    title: "Coverage across national & international press",
    note: "Content coming soon",
  },
  {
    icon: Tv,
    outlet: "Television",
    title: "Interviews & broadcast appearances",
    note: "Content coming soon",
  },
  {
    icon: Radio,
    outlet: "Podcasts & talks",
    title: "Conversations on tech, design & data",
    note: "Content coming soon",
  },
];

export function Media() {
  return (
    <section
      id="media"
      className="relative py-28 md:py-40"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #FFFDF8 0%, #FFF7DF 60%, #FCEBB0 130%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/70">
            (05) Media
          </p>
          <PaintTitle className="mt-6 text-5xl uppercase md:text-7xl">
            Media
          </PaintTitle>
          <p className="mt-6 max-w-xl text-ink/65 md:text-lg">
            Selected appearances and features. Detailed content is on its way —
            this section will list press, broadcast and podcast coverage.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-3">
          {placeholders.map((m, i) => (
            <motion.div
              key={m.outlet}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl border border-ink/10 bg-white/60 p-7 backdrop-blur-xl transition-all duration-500 hover:border-ink/30 hover:bg-white/80 hover:shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]"
            >
              <div className="flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-xl border border-ink/15 bg-white text-ink">
                  <m.icon className="size-5" />
                </span>
                <span className="text-[11px] uppercase tracking-[0.25em] text-ink/50">
                  0{i + 1}
                </span>
              </div>
              <div className="mt-6 text-[11px] uppercase tracking-[0.25em] text-ink/55">
                {m.outlet}
              </div>
              <h3 className="mt-2 font-paint text-2xl uppercase leading-tight md:text-3xl">
                {m.title}
              </h3>
              <p className="mt-4 text-sm text-ink/55">{m.note}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
