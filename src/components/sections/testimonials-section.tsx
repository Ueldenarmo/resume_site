import type { HomePageViewModel } from "@/lib/content/homepage";

type TestimonialsSectionProps = Pick<HomePageViewModel, "testimonials">;

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="space-y-6 px-0 md:px-6">
      <div className="space-y-2">
        <h2 className="text-[28px] font-semibold tracking-[-0.5px] text-[#123D35]">
          {testimonials.title}
        </h2>
        <p className="text-[15px] text-[#4C5E73]">{testimonials.subtitle}</p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.items.slice(0, 2).map((item, index) => (
          <article
            key={item.author}
            className={`rounded-xl border-[1.5px] p-4 ${
              index === 0
                ? "border-[#C6B8EE] bg-[#F1EEFF]"
                : "border-[#A9D5C9] bg-[#E8F5F1]"
            }`}
          >
            <p className="text-[15px] leading-[1.5] text-[#1B2F46]">“{item.quote}”</p>
            <p className="mt-3 text-[13px] font-medium text-[#5F5A86]">{item.author}</p>
          </article>
        ))}
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-[#2F7A69] to-[#6A4BC7]" />
      <div className="grid gap-5 md:grid-cols-2">
        {testimonials.items.slice(2, 3).map((item) => (
          <article key={item.author} className="rounded-xl border-[1.5px] border-[#B8C4EC] bg-[#EEF3FF] p-4">
            <p className="text-[15px] leading-[1.5] text-[#1D3455]">“{item.quote}”</p>
            <p className="mt-3 text-[13px] font-medium text-[#5A648A]">{item.author}</p>
          </article>
        ))}
        <article className="rounded-[14px] border-[1.5px] border-[#876ED9] bg-gradient-to-br from-[#113D35] to-[#4E2F8A] p-4">
          <h3 className="text-sm font-semibold text-[#EEF7F4]">{testimonials.signalTitle}</h3>
          <p className="mt-2 text-[13px] leading-[1.5] text-[#CFC4F2]">
            {testimonials.signalBody}
          </p>
        </article>
      </div>
    </section>
  );
}
