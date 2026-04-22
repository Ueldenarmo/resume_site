import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  PAYLOAD_SECRET: z.string().min(16),
  DATABASE_URI: z.string().min(1).optional(),
  SUPABASE_DATABASE_URI: z.string().min(1).optional(),
  REVALIDATE_SECRET: z.string().min(16),
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  ENABLE_DRAFT_PREVIEW: z
    .string()
    .optional()
    .transform((value) => value !== "false")
})
  .refine(
    (value) => Boolean(value.DATABASE_URI || value.SUPABASE_DATABASE_URI),
    {
      message: "Set DATABASE_URI or SUPABASE_DATABASE_URI for DB features."
    }
  );

export type AppEnv = z.infer<typeof envSchema>;

let cachedEnv: AppEnv | null = null;

export function getEnv(): AppEnv {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    throw new Error(
      `Invalid environment variables: ${JSON.stringify(parsed.error.format())}`
    );
  }

  cachedEnv = parsed.data;
  return parsed.data;
}
