import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { AnimatedSection } from "./AnimatedSection";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 1.06]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <div ref={ref} className="sticky top-24 mb-6" style={{ zIndex: index + 1 }}>
      <div className="overflow-hidden rounded-3xl border border-line bg-bone">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="relative h-[44vh] overflow-hidden bg-soft lg:col-span-7 lg:h-[68vh]">
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              width={1600}
              height={1000}
              style={{ scale, y }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
            />
            <div className="absolute left-6 top-6 text-[11px] font-mono uppercase tracking-[0.2em] text-bone mix-blend-difference">
              0{index + 1} / 0{projects.length}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-between p-8 lg:col-span-5 lg:p-12"
          >
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-ink/50">
                {project.tagline}
              </div>
              <h3 className="mt-4 font-display text-3xl font-medium tracking-[-0.02em] md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-5 text-[15px] leading-relaxed text-ink/70">
                {project.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-ink/75">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-ink/40" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-line bg-soft px-3 py-1 text-xs font-medium text-ink/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex gap-2">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-bone transition hover:bg-ink/85"
              >
                View Project
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-3 text-sm font-medium text-ink transition hover:border-ink"
              >
                <Github className="size-4" /> GitHub
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-line py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-20 max-w-4xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/50">
            (03) Selected Work
          </p>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-[-0.03em] md:text-6xl">
            Products built with care, shipped with intent.
          </h2>
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
