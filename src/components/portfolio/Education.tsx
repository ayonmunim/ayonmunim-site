import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import diuDegree from "@/assets/awards/DIU_Degree.jpg.asset.json";
import ca from "@/assets/awards/CA.png.asset.json";

// Two rows — one cert image per education entry
const CERTS = [ca.url, diuDegree.url];

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

        <div className="mt-20 divide-y divide-white/10 border-y border-white/10">
          {resume.education.map((e, i) => (
            <EducationRow key={e.degree} item={e} cert={CERTS[i % CERTS.length]} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationRow({
  item, cert, delay,
}: {
  item: { degree: string; school: string; period: string; detail: string };
  cert: string;
  delay: number;
}) {
  const [hover, setHover] = useState(false);
  return (
    <AnimatedSection delay={delay}>
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative grid grid-cols-12 items-center gap-4 py-10 transition-colors hover:bg-white/[0.03] md:py-14"
      >
        <div className="col-span-12 text-[11px] uppercase tracking-[0.25em] text-white/70 md:col-span-3">
          {item.period}
        </div>
        <div className="col-span-12 md:col-span-6">
          <h3 className="font-display text-2xl uppercase tracking-wide md:text-4xl">
            {item.degree}
          </h3>
          <div className="mt-2 text-sm text-white/60">{item.school}</div>
          <div className="mt-1 text-sm text-white/55">{item.detail}</div>
        </div>
        <div className="col-span-12 md:col-span-3 flex justify-end">
          <span className="text-[10px] uppercase tracking-[0.28em] text-white/40">
            Hover →
          </span>
        </div>

        {/* Floating certificate that appears on hover */}
        <AnimatePresence>
          {hover && (
            <motion.div
              key="cert"
              initial={{ opacity: 0, scale: 0.7, y: 50, rotate: -6, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.85, y: 30, rotate: 4, filter: "blur(6px)" }}
              transition={{ type: "spring", stiffness: 180, damping: 22, mass: 0.9 }}
              className="pointer-events-none absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 md:block"
              style={{ width: 380 }}
            >
              <div className="rainbow-border overflow-hidden rounded-2xl bg-white p-2">
                <img src={cert} alt={item.degree} className="block h-auto w-full rounded-lg" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
}
