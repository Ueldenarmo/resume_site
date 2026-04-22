import type { HomePageViewModel } from "@/lib/content/homepage";
import { SectionContainer } from "@/components/ui/section-container";

type ProjectsSectionProps = Pick<HomePageViewModel, "projects">;

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <SectionContainer className="border-border-purple bg-[#F4F1FF] md:p-11">
      <h2 className="font-display text-3xl font-bold text-ink md:text-5xl">{projects.title}</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {projects.items.map((item, index) => (
          <article
            key={item.title}
            className={`rounded-[14px] border-[1.5px] p-[18px] ${index % 2 === 0 ? "border-border-green bg-[#F8FAF9]" : "border-border-purple bg-[#F1ECFF]"}`}
          >
            <div
              className={`mb-3 h-1 w-full rounded-pill ${index % 2 === 0 ? "bg-accent-green" : "bg-accent-violet"}`}
            />
            <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm text-muted">{item.description}</p>
            <p className="mt-3 text-sm font-semibold text-accent-purple">{item.result}</p>
          </article>
        ))}
      </div>
    </SectionContainer>
  );
}
