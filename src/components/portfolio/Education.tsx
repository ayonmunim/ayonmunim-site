import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Award, ArrowUpRight } from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import diuDegree from "@/assets/awards/DIU_Degree.jpg.asset.json";
import ca from "@/assets/awards/CA.png.asset.json";

const CERTS = [ca.url, diuDegree.url];

export function Education() {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      rowRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const c = r.top + r.height / 2;
        const d = Math.abs(c - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setActive(best);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

        <div className="relative mt-20 grid grid-cols-12 gap-8">
          {/* Left: list of rows */}
          <div className="col-span-12 md:col-span-7">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {resume.education.map((e, i) => {
                const isActive = i === active;
                return (
                  <div
                    key={e.degree}
                    ref={(el) => { rowRefs.current[i] = el; }}
                    className="group grid grid-cols-12 items-center gap-4 py-12 md:py-20"
                  >
                    <div className="col-span-12 md:col-span-3 text-[11px] uppercase tracking-[0.25em] text-white/50">
                      {e.period}
                    </div>
                    <div className="col-span-11 md:col-span-8">
                      <h3
                        className={`font-display text-2xl uppercase tracking-wide transition-colors duration-500 md:text-4xl ${
                          isActive ? "text-white" : "text-white/30"
                        }`}
                      >
                        {e.degree}
                      </h3>
                      <div
                        className={`mt-2 text-sm transition-colors duration-500 ${
                          isActive ? "text-white/70" : "text-white/25"
                        }`}
                      >
                        {e.school}
                      </div>
                      <div
                        className={`mt-1 text-sm transition-colors duration-500 ${
                          isActive ? "text-white/60" : "text-white/20"
                        }`}
                      >
                        {e.detail}
                      </div>
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0.2, x: isActive ? 0 : -4 }}
                        transition={{ duration: 0.4 }}
                      >
                        <ArrowUpRight className="size-5 text-white/70" />
                      </motion.div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: sticky pinned certificate card */}
          <div className="hidden md:block md:col-span-5">
            <div className="sticky top-1/2 -translate-y-1/2">
              <div className="relative mx-auto w-full max-w-md">
                {/* medal icon on top */}
                <div className="absolute left-1/2 -top-7 z-20 -translate-x-1/2">
                  <div className="grid size-14 place-items-center rounded-full bg-white text-black shadow-[0_8px_30px_rgba(0,0,0,0.4)] ring-4 ring-black">
                    <Award className="size-6" />
                  </div>
                </div>

                <div className="relative h-[320px] w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 30, scale: 0.96, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
                      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0"
                    >
                      <div className="rainbow-border h-full w-full overflow-hidden rounded-2xl bg-white p-2">
                        <img
                          src={CERTS[active % CERTS.length]}
                          alt="Certificate"
                          className="h-full w-full rounded-lg object-cover"
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
