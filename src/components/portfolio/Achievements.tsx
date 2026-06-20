import { motion } from "motion/react";
import { Award as AwardIcon, ArrowUpRight } from "lucide-react";
import { resume } from "@/data/resume";
import nsac from "@/assets/press/NSAC_2022.png.asset.json";
import nasa from "@/assets/press/NASA.png.asset.json";
import prothom from "@/assets/press/Prothom_Alo_2023_2.png.asset.json";
import samakal from "@/assets/press/Samakal.png.asset.json";
import daily24 from "@/assets/press/Daily_24.png.asset.json";

const IMAGE_FOR: string[] = [nsac.url, nasa.url, prothom.url, samakal.url, daily24.url];

export function Achievements() {
  return (
    <section
      id="awards"
      className="relative overflow-hidden bg-black text-white"
    >
      {/* Star field */}
      <div className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 60% 70%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 80% 20%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 35% 85%, #fff 50%, transparent 51%), radial-gradient(1px 1px at 10% 60%, #fff 50%, transparent 51%)",
          backgroundSize: "400px 400px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 pt-28 md:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
          (04) Awards & Recognition
        </p>
        <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-[0.01em] md:text-7xl">
          Key <span className="text-white/30">Achievements</span>
        </h2>
      </div>

      {/* Each achievement = one tall section, image left (sticky), details right */}
      <div className="relative mt-12">
        {resume.achievements.map((a, i) => (
          <AchievementRow
            key={a.title}
            item={a}
            index={i}
            image={IMAGE_FOR[i % IMAGE_FOR.length]}
          />
        ))}
      </div>

      <div className="h-28 md:h-40" />
    </section>
  );
}

function AchievementRow({
  item, index, image,
}: {
  item: { title: string; year: string; detail: string };
  index: number;
  image: string;
}) {
  return (
    <section className="relative border-t border-white/10">
      <div className="mx-auto grid min-h-[80vh] max-w-7xl grid-cols-1 items-center gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16">
        {/* Big award image — sticky on desktop */}
        <div className="order-2 lg:order-1">
          <div className="lg:sticky lg:top-24">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -40 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: false, margin: "-150px" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_50px_140px_-30px_rgba(255,255,255,0.18)]"
            >
              <img
                src={image}
                alt={item.title}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/60 via-black/10 to-transparent" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] backdrop-blur-md">
                <AwardIcon className="size-3" /> {item.year}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Details */}
        <div className="order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-150px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
              0{index + 1} / 0{5}
            </div>
            <h3 className="mt-6 font-display text-4xl uppercase leading-[1] tracking-tight md:text-6xl">
              {item.title}
            </h3>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {item.detail}
            </p>
            <div className="mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/60">
              View detail <ArrowUpRight className="size-4" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
