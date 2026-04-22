import type { HomePageViewModel } from "@/lib/content/homepage";
import { SectionContainer } from "@/components/ui/section-container";

type AboutSectionProps = Pick<HomePageViewModel, "about">;

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <SectionContainer className="border-border-purple bg-[#F4F1FF] md:p-11">
      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">{about.title}</h2>
          <p className="text-base leading-[1.55] text-muted md:text-lg">{about.body}</p>
          <ul className="space-y-2 text-sm text-ink md:text-base">
            {about.principles.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2.5">
          {about.stats.map((stat) => (
            <div
              key={`${stat.value}-${stat.label}`}
              className="rounded-[14px] border-[1.5px] border-border-green bg-[#EAF2EE] p-4"
            >
              <p className="font-display text-3xl font-bold text-ink">{stat.value}</p>
              <p className="text-xs text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
