import Link from "next/link";
import { cn } from "@/lib/cn";

type LinkChipProps = {
  href: string;
  label: string;
  iconUrl?: string;
  iconAlt?: string;
  className?: string;
};

export function LinkChip({
  href,
  label,
  iconUrl,
  iconAlt,
  className
}: LinkChipProps) {
  return (
    <Link
      href={href || "#"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-pill border border-border-base bg-white px-3 py-2 text-xs font-semibold text-ink transition hover:-translate-y-px hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
        className
      )}
    >
      {iconUrl ? (
        <img
          src={iconUrl}
          alt={iconAlt || ""}
          aria-hidden={iconAlt ? undefined : true}
          className="h-3.5 w-3.5 shrink-0 object-contain"
          loading="lazy"
        />
      ) : null}
      {label}
    </Link>
  );
}
