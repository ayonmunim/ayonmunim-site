import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { AnimatedSection } from "./AnimatedSection";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.4, 0.6, 1],
    [0.92, 1, 1, 0.94]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.5]);

  return (
    <motion.div
      ref={ref}
      style={{ scale: cardScale, opacity }}
      className="sticky top-24 mb-8"
      // stack effect
      {...{ "data-idx": index }}
    >
      {/* blurry background glow */}
      <div aria-hidden className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-1/4 top-1/3 size-[28rem] rounded-full bg-black/10 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 size-[24rem] rounded-full bg-neutral-400/30 blur-[140px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-120px" }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.01 }}
        className="group relative overflow-hidden rounded-[2rem] border border-white/40 bg-white/50 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.25)] backdrop-blur-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Image */}
          <div className="relative h-[44vh] overflow-hidden bg-neutral-100 lg:col-span-7 lg:h-[68vh]">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              width={1600}
              height={1000}
              style={{ scale, y }}
              className="absolute inset-0 h-full w-full object-cover grayscale transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08] group-hover:grayscale-0"
            />
            {/* glass overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute left-6 top-6 rounded-full border border-white/40 bg-white/30 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-black backdrop-blur-md">
              0{index + 1} / 0{projects.length}
            </div>
          </div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex flex-col justify-between gap-8 p-8 lg:col-span-5 lg:p-12"
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                {project.tagline}
              </div>
              <h3 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-black md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-neutral-700">
                {project.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-xs font-medium text-neutral-700 backdrop-blur-md"
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
                className="group/btn inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Live Link
                <ArrowUpRight className="size-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-5 py-3 text-sm font-medium text-black backdrop-blur-md transition hover:border-black hover:bg-white"
              >
                <Github className="size-4" /> GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-neutral-200 bg-gradient-to-b from-white via-neutral-50 to-white py-28 md:py-40"
    >
      {/* ambient blurry glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[10%] size-[40rem] rounded-full bg-neutral-300/40 blur-[160px]" />
        <div className="absolute right-[-10%] bottom-[10%] size-[34rem] rounded-full bg-black/10 blur-[180px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-20 max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-neutral-500">
            (03) Selected Work
          </p>
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-black md:text-6xl">
            Selected Work
          </h2>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600">
            A curated selection of products engineered with craft — premium
            interfaces, thoughtful systems, and human-centered design.
          </p>
        </AnimatedSection>

        <div className="relative">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
