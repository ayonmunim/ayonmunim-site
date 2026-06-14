import { useState } from "react";
import { motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { sendContact } from "@/lib/api/contact.functions";
import { AnimatedSection } from "./AnimatedSection";
import { resume } from "@/data/resume";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  subject: z.string().trim().min(1, "Add a subject").max(200),
  message: z.string().trim().min(1, "Write a short message").max(2000),
});

type FormState = { name: string; email: string; subject: string; message: string };

export function ContactForm() {
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
    <section id="contact" className="relative bg-foreground py-28 text-background md:py-40">
      <div className="pointer-events-none absolute inset-0 -z-0 opacity-40">
        <div className="absolute -left-40 top-20 size-[36rem] rounded-full bg-[var(--electric)]/30 blur-3xl blob" />
        <div className="absolute -right-40 bottom-10 size-[32rem] rounded-full bg-[var(--ember)]/25 blur-3xl blob" style={{ animationDelay: "-8s" }} />
      </div>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-12">
        <AnimatedSection className="lg:col-span-5">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--ember)]">08 — Contact</p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] md:text-6xl">
            Have a problem worth <span className="italic text-gradient">solving</span>?
          </h2>
          <p className="mt-6 max-w-md text-background/70 md:text-lg">
            Tell me about your project, your team or just say hi. I usually reply within 24 hours.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <a href={`mailto:${resume.email}`} className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]">
              <div className="text-xs uppercase tracking-wider text-background/50">Email</div>
              <div className="mt-1 font-display text-xl">{resume.email}</div>
            </a>
            <a href={resume.github} target="_blank" rel="noreferrer" className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:bg-white/[0.08]">
              <div className="text-xs uppercase tracking-wider text-background/50">GitHub</div>
              <div className="mt-1 font-display text-xl">{resume.handle}</div>
            </a>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs uppercase tracking-wider text-background/50">Location</div>
              <div className="mt-1 font-display text-xl">{resume.location}</div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="lg:col-span-7">
          <form onSubmit={onSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl md:p-10">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <Field label="Name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={update("name")}
                  className="input-base"
                  placeholder="Jane Doe"
                  maxLength={100}
                />
              </Field>
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  className="input-base"
                  placeholder="jane@studio.com"
                  maxLength={255}
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Subject" error={errors.subject}>
                <input
                  value={form.subject}
                  onChange={update("subject")}
                  className="input-base"
                  placeholder="A short headline"
                  maxLength={200}
                />
              </Field>
            </div>
            <div className="mt-5">
              <Field label="Message" error={errors.message}>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={6}
                  className="input-base resize-none"
                  placeholder="Tell me about your project, timeline and goals."
                  maxLength={2000}
                />
              </Field>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-bone px-6 py-4 text-sm font-medium text-ink transition hover:bg-[var(--electric)] hover:text-bone disabled:opacity-60 sm:w-auto"
            >
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              {loading ? "Sending..." : "Send message"}
            </motion.button>
            <style>{`
              .input-base {
                width: 100%;
                border-radius: 1rem;
                background: rgba(255,255,255,0.04);
                border: 1px solid rgba(255,255,255,0.1);
                padding: 0.85rem 1rem;
                color: inherit;
                font-size: 0.95rem;
                transition: all .2s ease;
                outline: none;
              }
              .input-base::placeholder { color: rgba(255,255,255,0.35); }
              .input-base:focus {
                border-color: var(--electric);
                background: rgba(255,255,255,0.06);
                box-shadow: 0 0 0 4px color-mix(in oklab, var(--electric) 25%, transparent);
              }
            `}</style>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs uppercase tracking-wider text-background/60">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-[var(--ember)]">{error}</span>}
    </label>
  );
}
