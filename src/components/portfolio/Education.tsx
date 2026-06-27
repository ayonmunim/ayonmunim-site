import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import diuDegree from "@/assets/awards/DIU_Degree.jpg.asset.json";
import ca from "@/assets/awards/CA.png.asset.json";

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
            <EduRow key={e.degree} item={e} cert={CERTS[i % CERTS.length]} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EduRow({
  item,
  cert,
}: {
  item: { degree: string; school: string; period: string; detail: string };
  cert: string;
}) {
  const [hover, setHover] = useState(false);

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="relative grid grid-cols-12 items-center gap-4 py-12 md:py-20"
    >
      <div className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
        {item.period}
      </div>
      <div className="col-span-11 md:col-span-5">
        <h3
          className={`font-display text-2xl uppercase tracking-wide transition-colors duration-500 md:text-4xl ${
            hover ? "text-white" : "text-white/35"
          }`}
        >
          {item.degree}
        </h3>
        <div
          className={`mt-2 text-sm transition-colors duration-500 ${
            hover ? "text-white/70" : "text-white/25"
          }`}
        >
          {item.school}
        </div>
        <div
          className={`mt-1 text-sm transition-colors duration-500 ${
            hover ? "text-white/60" : "text-white/20"
          }`}
        >
          {item.detail}
        </div>
      </div>

      {/* Right side: certificate appears on hover */}
      <div className="hidden md:col-span-3 md:flex md:justify-center">
        <div className="relative h-[220px] w-full max-w-sm">
          <AnimatePresence>
            {hover && (
              <motion.div
                key="cert"
                initial={{ opacity: 0, y: 24, scale: 0.92, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 16, scale: 0.95, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                {/* medal badge */}
                <div className="absolute left-1/2 -top-6 z-20 -translate-x-1/2">
                  <div className="grid size-12 place-items-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-4 ring-black">
                    <Award className="size-5" />
                  </div>
                </div>
                <div className="cert-glow relative h-full w-full overflow-hidden rounded-xl bg-white/95 p-1.5">
                  <img
                    src={cert}
                    alt={item.degree}
                    className="h-full w-full rounded-lg object-cover"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="col-span-1 flex justify-end md:col-span-1">
        <motion.div
          animate={{ opacity: hover ? 1 : 0.25, x: hover ? 0 : -4 }}
          transition={{ duration: 0.35 }}
        >
          <ArrowUpRight className="size-5 text-white/80" />
        </motion.div>
      </div>
    </div>
  );
}
