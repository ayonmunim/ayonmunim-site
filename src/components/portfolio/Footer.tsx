import { motion } from "motion/react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import daily23 from "@/assets/press/Daily_23.png.asset.json";
import daily24 from "@/assets/press/Daily_24.png.asset.json";
import kaler from "@/assets/press/Kaler_Kantho.png.asset.json";
import nasa from "@/assets/press/NASA.png.asset.json";
import observer from "@/assets/press/Observer.png.asset.json";
import samakal from "@/assets/press/Samakal.png.asset.json";
import prothom from "@/assets/press/Prothom_Alo_2023_2.png.asset.json";
import news24 from "@/assets/press/NEWS24.png.asset.json";
import nsac from "@/assets/press/NSAC_2022.png.asset.json";
import { resume } from "@/data/resume";

const DROPS = [
  { src: daily23.url, left: "6%",  size: 120, delay: 0.0, dur: 6.5 },
  { src: kaler.url,   left: "16%", size: 90,  delay: 1.2, dur: 7.5 },
  { src: nasa.url,    left: "26%", size: 140, delay: 0.6, dur: 6.0 },
  { src: observer.url,left: "38%", size: 100, delay: 2.0, dur: 7.0 },
  { src: prothom.url, left: "50%", size: 130, delay: 0.3, dur: 6.8 },
  { src: samakal.url, left: "62%", size: 95,  delay: 1.6, dur: 7.2 },
  { src: news24.url,  left: "72%", size: 120, delay: 0.9, dur: 6.4 },
  { src: nsac.url,    left: "82%", size: 110, delay: 2.4, dur: 7.6 },
  { src: daily24.url, left: "92%", size: 90,  delay: 1.4, dur: 6.6 },
];

const socials = [
  { href: `mailto:${resume.email}`, label: "Email", Icon: Mail, variant: "white" as const },
  { href: resume.github, label: "GitHub", Icon: Github, variant: "yellow" as const },
  { href: "https://linkedin.com/in/ayonmunim", label: "LinkedIn", Icon: Linkedin, variant: "white" as const },
  { href: "https://twitter.com/ayonmunim", label: "Twitter", Icon: Twitter, variant: "yellow" as const },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-white">
      {/* Drop zone: images fall from top to bottom */}
      <div className="relative h-[420px] overflow-hidden">
        {DROPS.map((d, i) => (
          <motion.div
            key={i}
            className="absolute top-0 -translate-x-1/2 rounded-full overflow-hidden ring-4 ring-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)]"
            style={{ left: d.left, width: d.size, height: d.size }}
            initial={{ y: -200, opacity: 0, rotate: -8 }}
            animate={{ y: ["-15%", "110%"], opacity: [0, 1, 1, 0], rotate: [-8, 8] }}
            transition={{
              duration: d.dur,
              delay: d.delay,
              repeat: Infinity,
              ease: "easeIn",
              times: [0, 0.15, 0.85, 1],
            }}
          >
            <img src={d.src} alt="" className="size-full object-cover" />
          </motion.div>
        ))}
        {/* Soft fade into yellow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-sun" />
      </div>

      {/* Yellow base section */}
      <div className="bg-sun text-ink">
        <div className="mx-auto max-w-5xl px-6 py-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-paint text-5xl md:text-7xl uppercase tracking-tight"
          >
            AyonMunim
          </motion.div>

          <div className="mt-5 text-sm md:text-base font-medium tracking-wide">
            Address: Washington DC, USA
          </div>

          <div className="mt-8 flex items-center gap-4">
            {socials.map(({ href, label, Icon, variant }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={label}
                className={
                  "group inline-flex size-12 items-center justify-center rounded-full ring-2 ring-ink/15 transition-all hover:scale-110 hover:ring-ink/40 " +
                  (variant === "white"
                    ? "bg-white text-ink hover:bg-ink hover:text-sun"
                    : "bg-sun-deep text-ink hover:bg-ink hover:text-sun")
                }
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>

          <div className="mt-10 text-xs tracking-[0.2em] uppercase opacity-80">
            © Ayon Munim 2026
          </div>
        </div>
      </div>
    </footer>
  );
}
