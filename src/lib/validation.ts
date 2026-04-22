import { z } from "zod";

export const contactSubmissionSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  preferredChannel: z.string().max(80).optional().default("email"),
  message: z.string().min(10).max(3000),
  honeypot: z.string().max(0).optional().default("")
});

export type ContactSubmissionInput = z.infer<typeof contactSubmissionSchema>;
