import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { AnimatedSection } from "./AnimatedSection";

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-white/10 bg-black text-white"
    >
      {/* ambient blurry glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[10%] size-[40rem] rounded-full bg-white/[0.06] blur-[160px]" />
        <div className="absolute right-[-10%] bottom-[10%] size-[34rem] rounded-full bg-white/[0.04] blur-[180px]" />
      </div>

      {/* Header */}
      <div className="relative mx-auto max-w-7xl px-6 pt-28 md:pt-40">
        <AnimatedSection className="mb-16 max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">
            (03) Selected Work
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Selected Work
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60">
            A curated selection of products engineered with craft — premium
            interfaces, thoughtful systems, and human-centered design.
          </p>
        </AnimatedSection>
      </div>

      {/* Pinned scroll stage — Apple-style card reveal */}
      <div
        ref={containerRef}
        className="relative"
        style={{ height: `${projects.length * 100}vh` }}
      >
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
          <div className="relative mx-auto w-full max-w-6xl">
            {projects.map((project, i) => (
              <PoppedCard
                key={project.slug}
                project={project}
                index={i}
                total={projects.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PoppedCard({
  project,
  index,
  total,
  progress,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Each card occupies a slice of total scroll
  const start = index / total;
  const end = (index + 1) / total;
  const mid = start + (end - start) * 0.5;

  // Pop in: from below, scaled down, faded → settle → push back/up and fade
  const y = useTransform(progress, [start, mid, end], ["60%", "0%", "-10%"]);
  const scale = useTransform(progress, [start, mid, end], [0.9, 1, 0.94]);
  const opacity = useTransform(
    progress,
    [start, start + 0.05, end - 0.05, end],
    [0, 1, 1, 0]
  );
  const imgScale = useTransform(progress, [start, end], [1.2, 1.02]);

  return (
    <motion.div
      style={{ y, scale, opacity, zIndex: index + 1 }}
      className="absolute inset-0 mx-auto"
    >
      <div className="group relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.04] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Image */}
          <div className="relative h-[42vh] overflow-hidden bg-neutral-900 lg:col-span-7 lg:h-[72vh]">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              style={{ scale: imgScale }}
              className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-[1200ms] ease-out group-hover:scale-[1.06] group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-black/10 to-transparent" />
            <div className="absolute left-6 top-6 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white backdrop-blur-md">
              0{index + 1} / 0{total}
            </div>
          </div>

          {/* Content */}
          <div className="relative flex flex-col justify-between gap-8 p-8 lg:col-span-5 lg:p-12">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-white/50">
                {project.tagline}
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-white/70">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80 backdrop-blur-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group/btn inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Live Link
                <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.04] px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:border-white hover:bg-white/10"
              >
                <Github className="size-4" /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
