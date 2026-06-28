import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award as AwardIcon, ArrowUpRight } from "lucide-react";
import nsacbd from "@/assets/awards/NSACBD.png.asset.json";
import nationalChamp from "@/assets/awards/National_Champion.png.asset.json";
import nrb from "@/assets/awards/NRB_Award.png.asset.json";
import junior from "@/assets/awards/Junior_Pilot.png.asset.json";
import aamra from "@/assets/awards/Aamra_Ekattor.png.asset.json";

type Achievement = {
  title: string;
  subtitle: string;
  year: string;
  detail: string;
  image: string;
};

const ACHIEVEMENTS: Achievement[] = [
  {
    title: "GLOBAL CHAMPION",
    subtitle: "NASA Space Apps Challenge 2022",
    year: "2022",
    detail:
      "Global winner among 25,000+ participants from 162 countries — recognized for a space-data driven product built with Team Diamonds.",
    image: nsacbd.url,
  },
  {
    title: "NATIONAL CHAMPION",
    subtitle: "NASA Space Apps Challenge 2022 Bangladesh",
    year: "2022",
    detail: "Top national team in Bangladesh, representing the country in the global finals.",
    image: nationalChamp.url,
  },
  {
    title: "NRB BUSINESS AMERICA",
    subtitle: "Excellence Award",
    year: "2024",
    detail: "Recognized by NRB Business America for outstanding contribution as Team Leader.",
    image: nrb.url,
  },
  {
    title: "SPACE INNOVATION CAMP",
    subtitle: "Team Diamonds",
    year: "2022",
    detail: "Pilot achievement at the Space Innovation Camp — Junior Pilot recognition.",
    image: junior.url,
  },
  {
    title: "AAMRA EKATTOR HONOR",
    subtitle: "Bangladesh Gourobomoy 2022",
    year: "2022",
    detail: "Honored at the Bangladesh Gourobomoy 2022 celebration for inspiring contribution in tech.",
    image: aamra.url,
  },
];

export function Achievements() {
  return (
    <section id="awards" className="relative overflow-hidden bg-black text-white">


      <div className="relative mx-auto max-w-7xl px-6 pt-28 md:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
          (04) Awards & Recognition
        </p>
        <h2 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-[0.01em] md:text-7xl">
          Key <span className="text-white/30">Achievements</span>
        </h2>
        <p className="mt-6 max-w-xl text-sm uppercase tracking-[0.22em] text-white/40">
          Visual archive documenting international milestones and tech innovation.
        </p>
      </div>

      {/* Rows — hover reveals crest, scroll triggers large pop-in from right */}
      <div className="relative mt-16 md:mt-24">
        {ACHIEVEMENTS.map((a, i) => (
          <AchievementRow key={a.title} item={a} index={i} total={ACHIEVEMENTS.length} />
        ))}
      </div>

      <div className="h-28 md:h-40" />
    </section>
  );
}

function AchievementRow({
  item, index, total,
}: {
  item: Achievement;
  index: number;
  total: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative border-t border-white/10"
    >
      <div className="mx-auto grid min-h-[55vh] max-w-7xl grid-cols-12 items-center gap-6 px-6 py-16 md:min-h-[80vh] md:py-24">
        {/* Left — title block, transitions to dim when hovered */}
        <div className="col-span-12 md:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h3
              className={`font-display text-4xl uppercase leading-[0.95] tracking-tight transition-colors duration-500 md:text-7xl ${
                hover ? "text-white" : "text-white/25"
              }`}
            >
              {item.title}
            </h3>
            <p className="mt-4 text-[11px] uppercase tracking-[0.28em] text-white/55">
              {item.subtitle}
            </p>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/65 md:text-base">
              {item.detail}
            </p>
            <div className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-white/50">
              <AwardIcon className="size-3.5" /> {item.year} · 0{index + 1}/0{total}
              <ArrowUpRight className="size-4" />
            </div>
          </motion.div>
        </div>

        {/* Right — scroll-triggered big crest */}
        <div className="col-span-12 md:col-span-5 relative h-[280px] md:h-[520px]">
          <motion.div
            initial={{ opacity: 0, x: 120, scale: 0.7, rotate: 6 }}
            whileInView={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
            viewport={{ once: false, margin: "-150px" }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="max-h-full w-auto object-contain drop-shadow-[0_30px_80px_rgba(255,206,0,0.25)]"
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>

      {/* Hover small crest overlay (centered) — appears on hover only */}
      <AnimatePresence>
        {hover && (
          <motion.div
            key="hover-crest"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.18, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4 }}
            className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center md:hidden"
          >
            <img src={item.image} alt="" className="max-h-[80%] w-auto object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
