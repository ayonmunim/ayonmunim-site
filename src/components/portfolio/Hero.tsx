import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Download, Mail } from "lucide-react";
import portrait from "@/assets/munim-hero.jpg";
import { resume } from "@/data/resume";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      {/* ambient gradient blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 size-[40rem] rounded-full bg-[var(--electric)]/20 blur-3xl blob" />
        <div className="absolute -right-40 top-40 size-[36rem] rounded-full bg-[var(--ember)]/15 blur-3xl blob" style={{ animationDelay: "-6s" }} />
        <div className="absolute left-1/3 top-[60%] size-[28rem] rounded-full bg-[var(--plasma)]/15 blur-3xl blob" style={{ animationDelay: "-12s" }} />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-foreground/10 bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wider uppercase"
          >
            <span className="size-1.5 rounded-full bg-[var(--electric)] animate-pulse" />
            Available for new opportunities — {resume.location}
          </motion.div>

          <h1 className="font-display text-5xl font-medium leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
            {"Designing Intelligent Digital Experiences ".split(" ").map((w, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block pr-[0.25em]"
              >
                {w}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="inline-block"
            >
              Through <span className="text-gradient italic">Code, Data</span> &amp; <span className="text-gradient italic">Human-Centered Design</span>.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            I'm <span className="text-foreground font-medium">Munim Ahmed</span> — a software engineer working at the intersection of full-stack development, design systems and applied data science. NASA Space Apps Global Champion '22.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background transition hover:bg-[var(--electric)]"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background/40 px-6 py-3.5 text-sm font-medium transition hover:bg-foreground/5"
            >
              <Mail className="size-4" /> Contact Me
            </a>
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-medium text-foreground/80 transition hover:text-foreground"
            >
              <Download className="size-4" /> Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-foreground/10 pt-8"
          >
            {[
              { k: "4.00", v: "Graduate CGPA" },
              { k: "1st", v: "NASA Global '22" },
              { k: "10+", v: "Shipped projects" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-3xl font-medium">{s.k}</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Hero image card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ y, scale }}
          className="lg:col-span-5"
        >
          <div className="relative mx-auto aspect-[3/4] max-w-md">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-tr from-[var(--electric)]/30 via-[var(--plasma)]/20 to-[var(--ember)]/30 blur-2xl" />
            <motion.div
              style={{ filter }}
              className="relative h-full w-full overflow-hidden rounded-[2rem] shadow-[var(--shadow-card)] ring-1 ring-foreground/10"
            >
              <img
                src={portrait}
                alt="Munim Ahmed portrait"
                width={1080}
                height={1440}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </motion.div>

            {/* glass cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -left-6 bottom-10 hidden rounded-2xl glass px-4 py-3 shadow-[var(--shadow-card)] sm:block"
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Now</div>
              <div className="text-sm font-medium">Building data-driven UIs</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="absolute -right-4 top-12 hidden rounded-2xl glass px-4 py-3 shadow-[var(--shadow-card)] sm:block"
            >
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Stack</div>
              <div className="text-sm font-medium">React · Django · ML</div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
