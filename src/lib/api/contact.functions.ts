import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(1, "Message is required").max(2000),
});

export const sendContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    // Stub: log on server. Wire this to Resend / Nodemailer / EmailJS later.
    // Recipient: ayonmunim26@gmail.com
    console.log("[contact] new message:", {
      to: "ayonmunim26@gmail.com",
      ...data,
      at: new Date().toISOString(),
    });
    return { ok: true as const };
  });
