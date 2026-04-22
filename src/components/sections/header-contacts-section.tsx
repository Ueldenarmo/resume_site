import { LinkChip } from "@/components/ui/link-chip";
import type { HomePageViewModel } from "@/lib/content/homepage";

type HeaderContactsSectionProps = Pick<HomePageViewModel, "headerContacts" | "socialLinks">;

export function HeaderContactsSection({
  headerContacts,
  socialLinks
}: HeaderContactsSectionProps) {
  return (
    <header className="w-full rounded-[14px] border-[1.5px] border-border-base bg-white px-6 py-[18px]">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold text-accent-green">
          {headerContacts.map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-3">
              <span>{item}</span>
              {index < headerContacts.length - 1 ? (
                <span className="text-[#8A8883]">•</span>
              ) : null}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-2 text-xs font-semibold text-muted">Соцсети:</span>
          {socialLinks.map((item) => (
            <LinkChip
              key={`${item.label}-${item.href}`}
              href={item.href}
              label={item.label}
              iconUrl={item.iconUrl}
              iconAlt={item.iconAlt}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
