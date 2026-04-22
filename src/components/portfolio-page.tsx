import { DividerBar } from "@/components/ui/divider-bar";
import { HeaderContactsSection } from "@/components/sections/header-contacts-section";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { PreferencesFaqSection } from "@/components/sections/preferences-faq-section";
import { ContactSection } from "@/components/sections/contact-section";
import { FooterSection } from "@/components/sections/footer-section";
import type { HomePageViewModel } from "@/lib/content/homepage";

type PortfolioPageProps = {
  content: HomePageViewModel;
};

export function PortfolioPage({ content }: PortfolioPageProps) {
  return (
    <main className="bg-surface">
      <div className="mx-auto flex max-w-[2013px] items-start justify-center gap-20 px-5 py-10 md:px-20 md:py-20">
        <div className="hidden w-full max-w-[1280px] flex-col gap-12 lg:flex">
          <HeaderContactsSection
            headerContacts={content.headerContacts}
            socialLinks={content.socialLinks}
          />
          <div className="space-y-16">
            <HeroSection hero={content.hero} />
            <DividerBar variant="purple" />
            <AboutSection about={content.about} />
            <DividerBar variant="green" />
            <SkillsSection skills={content.skills} />
            <DividerBar variant="violet" />
            <ExperienceSection experience={content.experience} />
            <DividerBar variant="green" />
            <ProjectsSection projects={content.projects} />
          </div>
          <div className="space-y-[72px] rounded-none bg-[#F3F4FA] py-0">
            <section className="space-y-3">
              <DividerBar variant="gradient" className="h-0.5 rounded-none" />
              <p className="text-xs font-semibold tracking-[1.3px] text-[#4F3A86]">
                SELECTED RECOMMENDATIONS
              </p>
            </section>
            <TestimonialsSection testimonials={content.testimonials} />
            <PreferencesFaqSection preferences={content.preferences} faq={content.faq} />
            <ContactSection contact={content.contact} />
            <FooterSection footer={content.footer} />
          </div>
        </div>

        <div className="w-full space-y-5 rounded-none border border-border-base bg-surface p-5 lg:hidden">
          <HeaderContactsSection
            headerContacts={content.headerContacts}
            socialLinks={content.socialLinks.slice(0, 3)}
          />
          <HeroSection hero={content.hero} />
          <AboutSection about={content.about} />
          <SkillsSection
            skills={{ ...content.skills, items: content.skills.items.slice(0, 3) }}
          />
          <ExperienceSection
            experience={{ ...content.experience, items: content.experience.items.slice(0, 2) }}
          />
          <ProjectsSection
            projects={{ ...content.projects, items: content.projects.items.slice(0, 2) }}
          />
          <section className="space-y-2.5">
            <DividerBar variant="gradient" className="h-0.5 rounded-none" />
            <p className="text-[11px] font-semibold tracking-[1.2px] text-[#4F3A86]">
              SELECTED RECOMMENDATIONS
            </p>
          </section>
          <TestimonialsSection
            testimonials={{ ...content.testimonials, items: content.testimonials.items.slice(0, 1) }}
          />
          <PreferencesFaqSection preferences={content.preferences} faq={content.faq} />
          <section className="rounded-[14px] border-[1.5px] border-[#A996EA] bg-gradient-to-r from-[#0F3D34] to-[#532F90] p-4">
            <p className="text-[13px] font-semibold text-[#DFECE7]">
              Open to selected collaborations for 2026
            </p>
            <p className="mt-2 text-base font-bold text-white">
              {content.contact.methods[0]?.label ?? "contact@name.com"}
            </p>
          </section>
          <footer className="rounded-xl border-[1.5px] border-[#B6B4E7] bg-[#ECEFFD] px-3.5 pb-[18px] pt-3">
            <p className="text-xs font-semibold text-[#4B4A72]">© 2026 {content.siteName}</p>
          </footer>
        </div>
      </div>
    </main>
  );
}
