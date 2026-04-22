import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { Users } from "@/payload/collections/Users";
import { Media } from "@/payload/collections/Media";
import { Projects } from "@/payload/collections/Projects";
import { ExperienceItems } from "@/payload/collections/ExperienceItems";
import { SkillGroups } from "@/payload/collections/SkillGroups";
import { Testimonials } from "@/payload/collections/Testimonials";
import { Submissions } from "@/payload/collections/Submissions";
import { HomePage } from "@/payload/globals/HomePage";
import { SiteSettings } from "@/payload/globals/SiteSettings";
import { getDatabaseUri } from "@/lib/database";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname)
    }
  },
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-secret-replace-in-production",
  localization: {
    locales: ["ru", "en"],
    defaultLocale: "ru",
    fallback: true
  },
  collections: [
    Users,
    Media,
    Projects,
    ExperienceItems,
    SkillGroups,
    Testimonials,
    Submissions
  ],
  globals: [SiteSettings, HomePage],
  db: postgresAdapter({
    pool: {
      connectionString: getDatabaseUri()
    }
  }),
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(blobToken),
      token: blobToken,
      collections: {
        media: true
      },
      addRandomSuffix: true
    })
  ],
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  }
});
