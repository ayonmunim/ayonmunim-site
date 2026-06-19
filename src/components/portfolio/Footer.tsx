import { useState } from "react";
import { motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Send, Loader2, ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { z } from "zod";
import { sendContact } from "@/lib/api/contact.functions";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";
import daily23 from "@/assets/press/Daily_23.png.asset.json";
import daily24 from "@/assets/press/Daily_24.png.asset.json";
import kaler from "@/assets/press/Kaler_Kantho.png.asset.json";
import nasa from "@/assets/press/NASA.png.asset.json";
import observer from "@/assets/press/Observer.png.asset.json";
import samakal from "@/assets/press/Samakal.png.asset.json";
import prothom from "@/assets/press/Prothom_Alo_2023_2.png.asset.json";
import news24 from "@/assets/press/NEWS24.png.asset.json";
import nsac from "@/assets/press/NSAC_2022.png.asset.json";

// Images drift down (top→bottom) and up (bottom→top), well spaced.
const DOWN_DROPS = [
  { src: daily23.url, left: "5%",  size: 110, delay: 0.0, dur: 14 },
  { src: nasa.url,    left: "22%", size: 140, delay: 3.5, dur: 16 },
  { src: prothom.url, left: "48%", size: 120, delay: 1.5, dur: 15 },
  { src: news24.url,  left: "70%", size: 105, delay: 5.0, dur: 17 },
  { src: daily24.url, left: "90%", size: 95,  delay: 2.2, dur: 14.5 },
];
const UP_DROPS = [
  { src: kaler.url,    left: "13%", size: 100, delay: 1.8, dur: 16 },
  { src: observer.url, left: "36%", size: 115, delay: 4.0, dur: 15 },
  { src: samakal.url,  left: "60%", size: 95,  delay: 0.6, dur: 17 },
  { src: nsac.url,     left: "82%", size: 125, delay: 3.0, dur: 14.5 },
];

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Add a subject").max(200),
  message: z.string().trim().min(1, "Write a short message").max(2000),
});

type FormState = { name: string; email: string; subject: string; message: string };

const socials = [
  { href: `mailto:${resume.email}`, label: "Email", Icon: Mail, variant: "white" as const },
  { href: resume.github, label: "GitHub", Icon: Github, variant: "yellow" as const },
  { href: "https://linkedin.com/in/ayonmunim", label: "LinkedIn", Icon: Linkedin, variant: "white" as const },
  { href: "https://twitter.com/ayonmunim", label: "Twitter", Icon: Twitter, variant: "yellow" as const },
];

export function Footer() {
  const send = useServerFn(sendContact);
  const [form, setForm] = useState<FormState>({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [loading, setLoading] = useState(false);

  const update = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as keyof FormState] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setLoading(true);
    try {
      await send({ data: parsed.data });
      toast.success("Message sent — I'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Please email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer
      id="contact"
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #FFF8E0 28%, #FFE57A 58%, #FFCE00 82%, #FFCE00 100%)",
      }}
    >
      {/* Floating press images — circular, drift across the full section,
          fade in as the section enters view, soft white gradient at top/bottom. */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.05 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 14%, #000 86%, transparent 100%)",
        }}
      >
        {DOWN_DROPS.map((d, i) => (
          <motion.div
            key={`d-${i}`}
            className="absolute -translate-x-1/2 rounded-full overflow-hidden ring-2 ring-white/70 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)]"
            style={{ left: d.left, width: d.size, height: d.size, top: 0 }}
            initial={{ y: "-10%", opacity: 0 }}
            animate={{ y: ["-10%", "110%"], opacity: [0, 1, 1, 0], rotate: [-4, 4] }}
            transition={{
              duration: d.dur,
              delay: d.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.12, 0.88, 1],
            }}
          >
            <img src={d.src} alt="" className="size-full object-cover" />
          </motion.div>
        ))}
        {UP_DROPS.map((d, i) => (
          <motion.div
            key={`u-${i}`}
            className="absolute -translate-x-1/2 rounded-full overflow-hidden ring-2 ring-white/70 shadow-[0_25px_60px_-20px_rgba(0,0,0,0.25)]"
            style={{ left: d.left, width: d.size, height: d.size, bottom: 0 }}
            initial={{ y: "10%", opacity: 0 }}
            animate={{ y: ["10%", "-110%"], opacity: [0, 1, 1, 0], rotate: [4, -4] }}
            transition={{
              duration: d.dur,
              delay: d.delay,
              repeat: Infinity,
              ease: "linear",
              times: [0, 0.12, 0.88, 1],
            }}
          >
            <img src={d.src} alt="" className="size-full object-cover" />
          </motion.div>
        ))}
      </motion.div>


      {/* Contact form */}
      <section className="relative z-10 px-6 pt-28 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <AnimatedSection>
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/55">
              (07) Contact
            </p>
            <h2 className="mt-6 font-paint paint-ink text-5xl font-medium leading-[0.95] tracking-[-0.03em] md:text-7xl">
              Have a problem worth solving?
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-ink/70 md:text-lg">
              Tell me about your project or just say hi. I usually reply within 24 hours.
            </p>
            <a
              href={`mailto:${resume.email}`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink/75 transition hover:text-ink story-link"
            >
              {resume.email} <ArrowUpRight className="size-3.5" />
            </a>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <form onSubmit={onSubmit} className="mt-14 text-left">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <Field label="Name" error={errors.name}>
                  <input value={form.name} onChange={update("name")} className="input-line" placeholder="Your name" maxLength={100} />
                </Field>
                <Field label="Email" error={errors.email}>
                  <input type="email" value={form.email} onChange={update("email")} className="input-line" placeholder="you@email.com" maxLength={255} />
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Subject" error={errors.subject}>
                  <input value={form.subject} onChange={update("subject")} className="input-line" placeholder="What's this about?" maxLength={200} />
                </Field>
              </div>
              <div className="mt-6">
                <Field label="Message" error={errors.message}>
                  <textarea value={form.message} onChange={update("message")} rows={5} className="input-line resize-none" placeholder="Tell me a bit about your project or idea." maxLength={2000} />
                </Field>
              </div>
              <div className="mt-10 flex justify-center">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                  className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 text-sm font-semibold text-sun shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] transition hover:bg-ink/90 disabled:opacity-60"
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                  {loading ? "Sending..." : "Send message"}
                </motion.button>
              </div>

              <style>{`
                .input-line {
                  width: 100%;
                  background: transparent;
                  border: 0;
                  border-bottom: 1px solid rgba(0,0,0,0.18);
                  padding: 0.85rem 0.25rem;
                  color: #000;
                  font-size: 0.95rem;
                  transition: border-color .25s ease;
                  outline: none;
                }
                .input-line::placeholder { color: rgba(0,0,0,0.4); }
                .input-line:focus { border-color: #000; }
              `}</style>
            </form>
          </AnimatedSection>
        </div>
      </section>

      {/* Brand / address / socials sitting on solid yellow */}
      <section className="relative z-10 text-ink">
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-8 flex flex-col items-center text-center">
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
      </section>
    </footer>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-ink/55">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-ink/70">{error}</span>}
    </label>
  );
}
