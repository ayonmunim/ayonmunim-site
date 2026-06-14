import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { AnimatedSection } from "./AnimatedSection";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.08]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const accentVar = `var(--${project.accent})`;

  return (
    <div
      ref={ref}
      className="sticky top-24 mb-8"
      style={{ zIndex: index + 1 }}
    >
      <div className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-card shadow-[var(--shadow-card)]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* image */}
          <div className="relative h-[44vh] overflow-hidden lg:col-span-7 lg:h-[70vh]">
            <div
              className="absolute inset-0 opacity-60 blur-3xl"
              style={{ background: `radial-gradient(60% 60% at 50% 40%, ${accentVar} 0%, transparent 70%)` }}
            />
            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              width={1600}
              height={1000}
              style={{ scale, y }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-between p-8 lg:col-span-5 lg:p-14"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                <span className="font-mono">0{index + 1}</span>
                <span className="h-px w-8 bg-foreground/20" />
                <span style={{ color: accentVar }}>{project.tagline}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-medium leading-tight md:text-5xl">
                {project.title}
              </h3>
              <p className="mt-5 text-base text-foreground/80 md:text-lg">
                {project.description}
              </p>
              <ul className="mt-6 space-y-2">
                {project.features.map((f) => (
                  <li key={f} className="flex gap-3 text-sm text-foreground/75">
                    <span className="mt-1.5 size-1 shrink-0 rounded-full" style={{ background: accentVar }} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-full border border-foreground/10 bg-background/60 px-3 py-1 text-xs font-medium">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90"
              >
                Live preview <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/15 px-5 py-3 text-sm font-medium transition hover:bg-foreground/5"
              >
                <Github className="size-4" /> Code
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
    <section id="projects" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <AnimatedSection className="mb-16 max-w-4xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--electric)]">04 — Selected work</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-tight md:text-6xl">
            Products built with <span className="italic text-gradient">care</span>, shipped with intent.
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
