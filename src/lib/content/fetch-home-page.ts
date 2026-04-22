import { unstable_cache } from "next/cache";
import { draftMode } from "next/headers";
import { getPayloadClient } from "@/lib/payload";
import type { Locale } from "@/lib/locales";
import { mapHomePageData } from "@/lib/content/homepage";
import { hasDatabaseUri } from "@/lib/database";

type GenericObject = Record<string, unknown>;

function normalizeLinks(
  items: GenericObject[] | null | undefined,
  key: "link" | "method"
) {
  if (!items?.length) {
    return [];
  }

  return items
    .map((item) => {
      const source = ((item?.[key] as GenericObject | undefined) ??
        item) as GenericObject;
      const iconRelation =
        item?.icon && typeof item.icon === "object"
          ? (item.icon as GenericObject)
          : undefined;

      return {
        label: String(source.label ?? ""),
        href: String(source.href ?? "#"),
        iconUrl:
          typeof iconRelation?.url === "string" ? iconRelation.url : undefined,
        iconAlt:
          typeof iconRelation?.alt === "string" ? iconRelation.alt : undefined
      };
    })
    .filter((item) => item.label);
}

function extractItems<T>(
  relationships: unknown[] | null | undefined,
  mapper: (item: GenericObject) => T
): T[] {
  if (!relationships?.length) {
    return [];
  }

  return relationships
    .map((item) =>
      item && typeof item === "object" ? mapper(item as GenericObject) : null
    )
    .filter(Boolean) as T[];
}

async function fetchFromPayload(locale: Locale) {
  if (!hasDatabaseUri()) {
    return mapHomePageData(null, locale);
  }

  try {
    const payload = await getPayloadClient();
    const { isEnabled } = await draftMode();

    const [siteSettings, homePage] = await Promise.all([
      payload.findGlobal({
        slug: "siteSettings",
        locale,
        fallbackLocale: "ru",
        depth: 2,
        draft: isEnabled
      }),
      payload.findGlobal({
        slug: "homePage",
        locale,
        fallbackLocale: "ru",
        depth: 2,
        draft: isEnabled
      })
    ]);

    return mapHomePageData(
      {
        siteName: siteSettings?.siteName,
        headerContacts:
          siteSettings?.contactItems
            ?.map((item: GenericObject) => item.value)
            .filter(Boolean) ?? [],
        socialLinks: normalizeLinks(siteSettings?.socialLinks, "link"),
        hero: {
          ...homePage?.hero
        },
        about: {
          ...homePage?.about,
          principles:
            homePage?.about?.principles
              ?.map((item: GenericObject) => item.text)
              .filter(Boolean) ?? [],
          stats: homePage?.about?.stats ?? []
        },
        skills: {
          ...homePage?.skills,
          items: extractItems(homePage?.skills?.items, (item) => ({
            title: String(item.title ?? ""),
            level: String(item.level ?? ""),
            description: String(item.description ?? ""),
            imageUrl: String(
              ((item.attachmentImage as GenericObject | undefined)
                ?.url as string | undefined) ?? ""
            )
          }))
        },
        experience: {
          ...homePage?.experience,
          items: extractItems(homePage?.experience?.items, (item) => ({
            period: String(item.period ?? ""),
            title: String(item.title ?? ""),
            description: String(item.description ?? ""),
            highlight: String(item.highlight ?? "")
          }))
        },
        projects: {
          ...homePage?.projects,
          items: extractItems(homePage?.projects?.items, (item) => ({
            title: String(item.title ?? ""),
            description: String(item.description ?? ""),
            result: String(item.result ?? "")
          }))
        },
        testimonials: {
          ...homePage?.testimonials,
          items: extractItems(homePage?.testimonials?.items, (item) => ({
            quote: String(item.quote ?? ""),
            author: String(item.author ?? "")
          }))
        },
        preferences: {
          ...homePage?.preferences,
          items:
            homePage?.preferences?.items
              ?.map((item: GenericObject) => item.text)
              .filter(Boolean) ?? []
        },
        faq: {
          ...homePage?.faq,
          items:
            homePage?.faq?.items?.map((item: GenericObject) => ({
              question: String(item.question ?? ""),
              answer: String(item.answer ?? "")
            })) ?? []
        },
        contact: {
          ...homePage?.contact,
          methods: normalizeLinks(homePage?.contact?.methods, "method")
        },
        footer: {
          ...homePage?.footer,
          links: normalizeLinks(homePage?.footer?.links, "link")
        }
      },
      locale
    );
  } catch (error) {
    console.warn("Falling back to static homepage content:", error);
    return mapHomePageData(null, locale);
  }
}

export const getHomePageData = unstable_cache(
  async (locale: Locale) => fetchFromPayload(locale),
  ["home-page-cache"],
  {
    tags: ["home-page", "site-settings", "portfolio-sections"]
  }
);
