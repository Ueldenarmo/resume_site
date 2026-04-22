import type { HomePageViewModel } from "@/lib/content/homepage";
import { SectionContainer } from "@/components/ui/section-container";

type ExperienceSectionProps = Pick<HomePageViewModel, "experience">;

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <SectionContainer className="border-border-green bg-[#EEF5F2] md:p-11">
      <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">
        {experience.title}
      </h2>
      <p className="mt-4 text-base text-muted md:text-lg">{experience.subtitle}</p>
      <div className="mt-6 space-y-3.5">
        {experience.items.map((item, index) => (
          <div key={item.title} className="flex flex-col gap-3 md:flex-row">
            <div
              className={`w-1.5 shrink-0 rounded-pill ${index % 2 === 0 ? "bg-accent-purple" : "bg-accent-violet"}`}
            />
            <div className="w-full rounded-xl border border-border-base bg-[#EFEDE7] px-3 py-2 text-sm font-semibold text-ink md:w-[190px]">
              {item.period}
            </div>
            <article className="flex-1 rounded-[14px] border-[1.5px] border-border-green bg-[#F8FAF9] p-[18px]">
              <div className="mb-3 h-0.5 w-full rounded-pill bg-accent-green" />
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
              <p className="mt-3 text-sm text-ink">• {item.highlight}</p>
            </article>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}
