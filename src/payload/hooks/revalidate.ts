import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from "payload";

const REVALIDATE_TAGS = ["home-page", "site-settings", "portfolio-sections"];

async function requestRevalidate(source: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const secret = process.env.REVALIDATE_SECRET;

  if (!baseUrl || !secret) {
    return;
  }

  try {
    await fetch(`${baseUrl}/api/revalidate`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        secret,
        source,
        tags: REVALIDATE_TAGS
      })
    });
  } catch (error) {
    console.error("Revalidate request failed", error);
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = async ({ collection }) => {
  await requestRevalidate(`collection:${collection.slug}:afterChange`);
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({ collection }) => {
  await requestRevalidate(`collection:${collection.slug}:afterDelete`);
};

export const revalidateGlobalAfterChange: GlobalAfterChangeHook = async ({ global }) => {
  await requestRevalidate(`global:${global.slug}:afterChange`);
};
