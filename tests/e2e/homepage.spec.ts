import { test, expect } from "@playwright/test";

test("renders desktop homepage and key sections", async ({ page }) => {
  test.skip(page.viewportSize()?.width ? page.viewportSize()!.width < 1024 : false);
  await page.goto("/ru");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Your Name");
  await expect(page.getByRole("heading", { name: "Skills matrix" }).first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected projects" }).first()).toBeVisible();
  await expect(page.getByText("Testimonials").first()).toBeVisible();
});

test("submits contact form", async ({ page }) => {
  test.skip(page.viewportSize()?.width ? page.viewportSize()!.width < 1024 : false);
  await page.goto("/ru");

  await page.getByLabel("Name").fill("QA User");
  await page.getByLabel("Email").fill("qa@example.com");
  await page.getByLabel("Preferred channel").fill("Email");
  await page.getByLabel("Message").fill("Need help building a CMS-driven portfolio.");
  await page.getByRole("button", { name: "Send Inquiry" }).click();

  await expect(page.getByText("Thank you. We will get back within 48h.")).toBeVisible();
});

test("renders mobile layout", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/en");

  await expect(page.getByText("SELECTED RECOMMENDATIONS").last()).toBeVisible();
  await expect(page.getByText("Open to selected collaborations for 2026")).toBeVisible();
});
