import Link from "next/link";
import type { HomePageViewModel } from "@/lib/content/homepage";

type FooterSectionProps = Pick<HomePageViewModel, "footer">;

export function FooterSection({ footer }: FooterSectionProps) {
  return (
    <footer className="w-full rounded-[14px] border-[1.5px] border-[#B6B4E7] bg-[#ECEFFD] px-6 pb-8 pt-3">
      <div className="h-0.5 w-full bg-gradient-to-r from-[#2A7A68] to-[#6A4DC5]" />
      <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs font-medium tracking-[0.4px] text-[#59647D]">{footer.copyright}</p>
        <div className="flex flex-wrap items-center gap-6">
          {footer.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs font-semibold text-[#4B3D83] transition hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
