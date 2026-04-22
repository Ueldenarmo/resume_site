import type { HomePageViewModel } from "@/lib/content/homepage";

type PreferencesFaqSectionProps = Pick<HomePageViewModel, "preferences" | "faq">;

export function PreferencesFaqSection({ preferences, faq }: PreferencesFaqSectionProps) {
  return (
    <section className="grid gap-6 px-0 md:grid-cols-2 md:px-6">
      <div className="space-y-[18px]">
        <h3 className="text-xl font-semibold text-[#123D35]">{preferences.title}</h3>
        <div className="rounded-[14px] border-[1.5px] border-[#9FCFC2] bg-[#EAF5F2] p-5">
          <ul className="space-y-3 text-sm font-medium text-[#18433A]">
            {preferences.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="space-y-[18px]">
        <h3 className="text-xl font-semibold text-[#123D35]">{faq.title}</h3>
        <div className="rounded-[14px] border-[1.5px] border-[#C7B9EF] bg-[#F1EEFF]">
          {faq.items.map((item, index) => (
            <div key={item.question}>
              <div className="space-y-2 p-5">
                <h4 className="text-[15px] font-semibold text-[#163F36]">{item.question}</h4>
                <p className="text-sm leading-[1.5] text-[#4D5E77]">{item.answer}</p>
              </div>
              {index < faq.items.length - 1 ? (
                <div className="h-0.5 w-full bg-gradient-to-r from-[#2F7A69] to-[#6A4BC7]" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
