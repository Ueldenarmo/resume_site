import process from "node:process";
import { getFallbackHomePage } from "@/lib/content/homepage";

try {
  process.loadEnvFile();
} catch {
  // allow environments where variables are already injected
}

async function run() {
  const [{ default: config }, { getPayload }] = await Promise.all([
    import("@payload-config"),
    import("payload")
  ]);

  const payload = await getPayload({ config });
  const locale = "ru";
  const fallback = getFallbackHomePage(locale);

  const existingAdmin = await payload.find({
    collection: "users",
    limit: 1
  });

  if (!existingAdmin.docs.length) {
    await payload.create({
      collection: "users",
      data: {
        email: "admin@example.com",
        password: "ChangeMe123!",
        displayName: "Admin"
      }
    });
  }

  await payload.updateGlobal({
    slug: "siteSettings",
    locale,
    data: {
      siteName: fallback.siteName,
      contactItems: fallback.headerContacts.map((value) => ({ value })),
      socialLinks: fallback.socialLinks.map((link) => ({ link })),
      defaultSEO: {
        title: `${fallback.siteName} — Portfolio`,
        description: fallback.hero.description
      }
    }
  });

  await payload.updateGlobal({
    slug: "homePage",
    locale,
    data: {
      hero: {
        enabled: true,
        order: 1,
        eyebrow: fallback.hero.eyebrow,
        name: fallback.hero.name,
        title: fallback.hero.title,
        description: fallback.hero.description,
        primaryCta: fallback.hero.primaryCta,
        secondaryCta: fallback.hero.secondaryCta,
        facts: fallback.hero.facts
      },
      about: {
        enabled: true,
        order: 2,
        title: fallback.about.title,
        body: fallback.about.body,
        principles: fallback.about.principles.map((text) => ({ text })),
        stats: fallback.about.stats
      },
      skills: {
        enabled: true,
        order: 3,
        title: fallback.skills.title,
        subtitle: fallback.skills.subtitle
      },
      experience: {
        enabled: true,
        order: 4,
        title: fallback.experience.title,
        subtitle: fallback.experience.subtitle
      },
      projects: {
        enabled: true,
        order: 5,
        title: fallback.projects.title
      },
      testimonials: {
        enabled: true,
        order: 6,
        title: fallback.testimonials.title,
        subtitle: fallback.testimonials.subtitle,
        signalTitle: fallback.testimonials.signalTitle,
        signalBody: fallback.testimonials.signalBody
      },
      preferences: {
        enabled: true,
        order: 7,
        title: fallback.preferences.title,
        items: fallback.preferences.items.map((text) => ({ text }))
      },
      faq: {
        enabled: true,
        order: 8,
        title: fallback.faq.title,
        items: fallback.faq.items
      },
      contact: {
        enabled: true,
        order: 9,
        title: fallback.contact.title,
        description: fallback.contact.description,
        methods: fallback.contact.methods.map((method) => ({ method })),
        formTitle: fallback.contact.formTitle,
        formDescription: fallback.contact.formDescription,
        privacyText: fallback.contact.privacyText
      },
      footer: {
        enabled: true,
        order: 10,
        copyright: fallback.footer.copyright,
        links: fallback.footer.links.map((link) => ({ link }))
      }
    }
  });

  console.log("Seed complete.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
