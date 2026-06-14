import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import portrait from "@/assets/munim-hero.jpg";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Avatar with glow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-10"
        >
          <div className="absolute inset-0 -z-10 rounded-full bg-ink/[0.04] blur-3xl glow-pulse" style={{ transform: "scale(1.8)" }} />
          <div className="absolute inset-0 -z-10 rounded-full bg-white blur-2xl" style={{ transform: "scale(1.4)" }} />
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative size-40 overflow-hidden rounded-full ring-1 ring-line shadow-[0_20px_60px_-20px_rgba(0,0,0,0.25)] md:size-48"
          >
            <img
              src={portrait}
              alt="Munim Ahmed"
              width={480}
              height={480}
              className="h-full w-full object-cover grayscale"
            />
          </motion.div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/55"
        >
          Software Engineer · Full Stack Developer
        </motion.p>

        <h1 className="mt-6 font-display text-6xl font-medium leading-[0.95] tracking-[-0.04em] md:text-8xl">
          {"Munim Ahmed".split("").map((c, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {c === " " ? "\u00A0" : c}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-6 max-w-xl text-base text-ink/65 md:text-lg"
        >
          Building meaningful digital experiences through design, code, and data.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-bone transition hover:bg-ink/85"
          >
            View Projects
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-bone"
          >
            <Mail className="size-4" /> Contact Me
          </a>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-ink/40"
      >
        Scroll
      </motion.div>
    </section>
  );
}
