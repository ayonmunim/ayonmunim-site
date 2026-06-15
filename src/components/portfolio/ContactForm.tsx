import { useState } from "react";
import { motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Send, Loader2, ArrowUpRight } from "lucide-react";
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
    <section
      id="contact"
      className="relative py-28 md:py-40"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #FFFBEC 0%, #FBE9A8 50%, #F5C400 140%)",
      }}
    >
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <AnimatedSection>
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-ink/50">
            (07) Contact
          </p>
          <h2 className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-[-0.03em] md:text-7xl">
            Have a problem worth solving?
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-ink/65 md:text-lg">
            Tell me about your project or just say hi. I usually reply within 24 hours.
          </p>
          <a
            href={`mailto:${resume.email}`}
            className="mt-6 inline-flex items-center gap-1.5 text-sm text-ink/70 transition hover:text-ink story-link"
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
                className="inline-flex items-center gap-2 rounded-full bg-sun px-8 py-4 text-sm font-semibold text-ink shadow-[0_10px_30px_-10px_rgba(245,196,0,0.7)] transition hover:bg-sun-deep disabled:opacity-60"
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
                border-bottom: 1px solid #e5e5e5;
                padding: 0.85rem 0.25rem;
                color: #000;
                font-size: 0.95rem;
                transition: border-color .25s ease;
                outline: none;
              }
              .input-line::placeholder { color: rgba(0,0,0,0.35); }
              .input-line:focus { border-color: #000; }
            `}</style>
          </form>
        </AnimatedSection>
      </div>
    </section>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-left">
      <span className="mb-2 block text-[10px] uppercase tracking-[0.22em] text-ink/50">{label}</span>
      {children}
      {error && <span className="mt-2 block text-xs text-ink/70">{error}</span>}
    </label>
  );
}
