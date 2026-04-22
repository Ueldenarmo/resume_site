import { describe, expect, it } from "vitest";
import { contactSubmissionSchema } from "@/lib/validation";

describe("contactSubmissionSchema", () => {
  it("accepts valid payload", () => {
    const parsed = contactSubmissionSchema.safeParse({
      name: "Alex Doe",
      email: "alex@example.com",
      preferredChannel: "telegram",
      message: "Need a project proposal for Q2 roadmap.",
      honeypot: ""
    });

    expect(parsed.success).toBe(true);
  });

  it("rejects invalid email", () => {
    const parsed = contactSubmissionSchema.safeParse({
      name: "Alex Doe",
      email: "not-an-email",
      message: "Need a project proposal for Q2 roadmap.",
      honeypot: ""
    });

    expect(parsed.success).toBe(false);
  });

  it("rejects too short message", () => {
    const parsed = contactSubmissionSchema.safeParse({
      name: "Alex Doe",
      email: "alex@example.com",
      message: "short",
      honeypot: ""
    });

    expect(parsed.success).toBe(false);
  });
});
