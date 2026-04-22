import { describe, expect, it } from "vitest";
import { getFallbackHomePage, mapHomePageData } from "@/lib/content/homepage";

describe("mapHomePageData", () => {
  it("uses fallback when payload is empty", () => {
    const result = mapHomePageData(null, "ru");
    expect(result.hero.name).toBe(getFallbackHomePage("ru").hero.name);
    expect(result.projects.items.length).toBeGreaterThan(0);
  });

  it("overrides fallback values with payload data", () => {
    const result = mapHomePageData(
      {
        siteName: "Test Name",
        hero: {
          name: "Custom Hero Name"
        },
        footer: {
          links: [{ label: "GitHub", href: "https://github.com" }]
        }
      },
      "en"
    );

    expect(result.siteName).toBe("Test Name");
    expect(result.hero.name).toBe("Custom Hero Name");
    expect(result.footer.links[0]?.label).toBe("GitHub");
  });
});
