import Link from "next/link";
import type { HomePageViewModel } from "@/lib/content/homepage";
import { useEffect } from "react";

type HeroSectionProps = Pick<HomePageViewModel, "hero">;

export function HeroSection({ hero }: HeroSectionProps) {

  console.log("Preloading portrait image:", hero.portrait);


  return (
    <section className="w-full rounded-[24px] border-2 border-border-green bg-[#ECF5F1] p-5 md:p-14">
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="hidden w-[10px] rounded-pill bg-accent-purple lg:block" />
        <div className="flex flex-1 flex-col gap-5">
          <p className="text-[13px] font-semibold text-muted">{hero.eyebrow}</p>
          <h1 className="font-display text-4xl font-bold text-ink md:text-[68px] md:leading-[1.06]">
            {hero.name}
          </h1>
          <p className="text-xl font-medium text-accent-purple md:text-2xl">{hero.title}</p>
          <p className="max-w-3xl text-base leading-[1.5] text-muted md:text-lg">
            {hero.description}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={hero.primaryCta.href}
              className="rounded-xl bg-accent-green px-[18px] py-3 text-sm font-semibold text-white transition hover:brightness-110 focus-visible:outline-none focus-visible:shadow-focus"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="rounded-xl border-[1.5px] border-[#BDAEEA] bg-white px-[18px] py-3 text-sm font-semibold text-ink transition hover:bg-[#F8F5FF] focus-visible:outline-none focus-visible:shadow-focus"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {hero.facts.map((fact) => (
              <span
                key={fact.text}
                className="rounded-pill border-[1.5px] border-border-green bg-[#EAF2EE] px-3 py-2 text-xs text-muted"
              >
                {fact.text}
              </span>
            ))}
          </div>
        </div>
        <div className="w-full rounded-[20px] border border-border-base bg-[#EFEDE7] p-4 lg:w-[474px]">
          <div className="flex h-[180px] items-center justify-center rounded-2xl border border-border-base bg-white text-sm text-muted md:h-[447px]">
            {hero.portrait ? (
              <img
                src={hero.portrait.url}
                alt={hero.portrait.alt}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-muted">{hero.portraitLabel || "Portrait not available"}</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
