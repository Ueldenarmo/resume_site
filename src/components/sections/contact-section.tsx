import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import type { HomePageViewModel } from "@/lib/content/homepage";

type ContactSectionProps = Pick<HomePageViewModel, "contact">;

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section
      id="contact"
      className="w-full rounded-[18px] border-2 border-[#A996EA] bg-gradient-to-r from-[#0F3D34] to-[#532F90] p-4 md:p-7"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
        <div className="rounded-xl border border-[#D7E3F4] bg-[#F8FAFC] p-4">
          <div className="space-y-1.5">
            <span className="inline-flex rounded-pill bg-[#EAF2FF] px-2.5 py-1 text-xs font-semibold text-[#2357C6]">
              Способы связи
            </span>
            <h3 className="text-2xl font-bold text-[#0F172A]">{contact.title}</h3>
            <p className="text-sm text-[#475569]">{contact.description}</p>
          </div>
          <div className="mt-4 grid gap-2">
            {contact.methods.map((method) => (
              <Link
                key={method.label}
                href={method.href}
                className="rounded-lg bg-white px-3 py-2 text-sm font-medium text-[#0F172A] transition hover:bg-[#F1F5F9] focus-visible:outline-none focus-visible:shadow-focus"
              >
                {method.label}
              </Link>
            ))}
          </div>
        </div>
        <ContactForm
          formTitle={contact.formTitle}
          formDescription={contact.formDescription}
          privacyText={contact.privacyText}
        />
      </div>
    </section>
  );
}
