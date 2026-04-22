import type { HomePageViewModel } from "@/lib/content/homepage";
import { SectionContainer } from "@/components/ui/section-container";

type SkillsSectionProps = Pick<HomePageViewModel, "skills">;

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <SectionContainer className="border-border-purple bg-[#F1EDFF] md:p-11">
      <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">{skills.title}</h2>
      <p className="mt-4 text-base text-muted md:text-lg">{skills.subtitle}</p>
      <div className="mt-6 grid gap-4 lg:grid-cols-[505px_1fr]">
        <div className="space-y-2 rounded-xl border border-border-base bg-white p-2.5">
          {skills.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col justify-between gap-3 rounded-[10px] border border-[#E4E2DA] bg-[#FAFAF8] p-3 md:flex-row"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{item.title}</p>
                <p className="text-xs text-muted">{item.description}</p>
              </div>
              <span className="text-xs font-semibold text-accent-purple">{item.level}</span>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex min-h-[220px] items-center justify-center rounded-lg border border-border-base bg-[#F3F3EF] text-xs text-[#6D6C66] md:min-h-[571px]">
            Image Placeholder
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted">
            <span className="size-2.5 rounded-full bg-accent-purple" /> Текущий уровень по
            направлениям
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-muted">
            <span className="size-2.5 rounded-full bg-accent-green" /> Текущий уровень по
            направлениям
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
