"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactSubmissionSchema,
  type ContactSubmissionInput
} from "@/lib/validation";

type ContactFormProps = {
  formTitle: string;
  formDescription: string;
  privacyText: string;
};

export function ContactForm({
  formTitle,
  formDescription,
  privacyText
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const form = useForm<ContactSubmissionInput>({
    resolver: zodResolver(contactSubmissionSchema),
    defaultValues: {
      name: "",
      email: "",
      preferredChannel: "",
      message: "",
      honeypot: ""
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("idle");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("success");
  });

  return (
    <div className="rounded-[14px] border border-[#CDBFF3] bg-white p-4">
      <h3 className="font-display text-[22px] font-bold text-ink">{formTitle}</h3>
      <p className="mt-2 text-sm text-muted">{formDescription}</p>
      <form className="mt-4 space-y-3" onSubmit={onSubmit}>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted">Name</span>
          <input
            {...form.register("name")}
            className="w-full rounded-[10px] border border-[#DFDDD4] bg-[#FAFAF8] px-3 py-2 text-sm focus-visible:outline-none focus-visible:shadow-focus"
            placeholder="Your name"
          />
          <span className="mt-1 block text-xs text-red-600">
            {form.formState.errors.name?.message}
          </span>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted">Email</span>
          <input
            {...form.register("email")}
            className="w-full rounded-[10px] border border-[#DFDDD4] bg-[#FAFAF8] px-3 py-2 text-sm focus-visible:outline-none focus-visible:shadow-focus"
            placeholder="you@email.com"
          />
          <span className="mt-1 block text-xs text-red-600">
            {form.formState.errors.email?.message}
          </span>
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted">
            Preferred channel
          </span>
          <input
            {...form.register("preferredChannel")}
            className="w-full rounded-[10px] border border-[#DFDDD4] bg-[#FAFAF8] px-3 py-2 text-sm focus-visible:outline-none focus-visible:shadow-focus"
            placeholder="Telegram / Email / WhatsApp / Call"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-muted">Message</span>
          <textarea
            {...form.register("message")}
            className="h-28 w-full rounded-[10px] border border-[#DFDDD4] bg-[#FAFAF8] px-3 py-2 text-sm focus-visible:outline-none focus-visible:shadow-focus"
            placeholder="Project scope, timeline, goals..."
          />
          <span className="mt-1 block text-xs text-red-600">
            {form.formState.errors.message?.message}
          </span>
        </label>

        <input
          {...form.register("honeypot")}
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
          aria-hidden
        />

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-[#7C7A72]">{privacyText}</p>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="rounded-[10px] bg-accent-green px-4 py-2 text-sm font-bold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:shadow-focus disabled:opacity-50"
          >
            {form.formState.isSubmitting ? "Sending..." : "Send Inquiry"}
          </button>
        </div>

        {status === "success" ? (
          <p className="text-sm text-green-700">Thank you. We will get back within 48h.</p>
        ) : null}
        {status === "error" ? (
          <p className="text-sm text-red-700">Failed to submit. Please try again.</p>
        ) : null}
      </form>
    </div>
  );
}
