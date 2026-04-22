import type { Locale } from "@/lib/locales";

export interface PayloadImage {
  id: number;
  alt: string;
  caption: string | null;
  updatedAt: string;
  createdAt: string;
  url: string;
  thumbnailURL: string | null;
  filename: string;
  mimeType: string;
  filesize: number;
  width: number;
  height: number;
  focalX: number;
  focalY: number
}

// id: 2,
//   alt: 'Портфолио Валерия',
//   caption: null,
//   updatedAt: '2026-03-18T20:20:12.645Z',
//   createdAt: '2026-03-18T20:20:09.747Z',
//   url: '/api/media/file/photo_2026-03-18%2023.11.24-7JxkcZfQnOqT2vdezaL4SkWeE5kf4W.jpeg',
//   thumbnailURL: null,
//   filename: 'photo_2026-03-18 23.11.24-7JxkcZfQnOqT2vdezaL4SkWeE5kf4W.jpeg',
//   mimeType: 'image/jpeg',
//   filesize: 143543,
//   width: 1280,
//   height: 960,
//   focalX: 50,
//   focalY: 50

export type LinkItem = {
  label: string;
  href: string;
  iconUrl?: string;
  iconAlt?: string;
};

export type HeroFact = {
  text: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type SkillItem = {
  title: string;
  level: string;
  description?: string;
  imageUrl?: string;
};

export type ExperienceItem = {
  period: string;
  title: string;
  description: string;
  highlight: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  result: string;
};

export type TestimonialItem = {
  quote: string;
  author: string;
};

export type HomePageViewModel = {
  locale: Locale;
  siteName: string;
  headerContacts: string[];
  socialLinks: LinkItem[];
  hero: {
    eyebrow: string;
    name: string;
    title: string;
    description: string;
    primaryCta: LinkItem;
    secondaryCta: LinkItem;
    facts: HeroFact[];
    portrait: PayloadImage;
    portraitLabel: string;
  };
  about: {
    title: string;
    body: string;
    principles: string[];
    stats: StatItem[];
  };
  skills: {
    title: string;
    subtitle: string;
    items: SkillItem[];
  };
  experience: {
    title: string;
    subtitle: string;
    items: ExperienceItem[];
  };
  projects: {
    title: string;
    items: ProjectItem[];
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
    signalTitle: string;
    signalBody: string;
  };
  preferences: {
    title: string;
    items: string[];
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  contact: {
    title: string;
    description: string;
    methods: LinkItem[];
    formTitle: string;
    formDescription: string;
    privacyText: string;
  };
  footer: {
    copyright: string;
    links: LinkItem[];
  };
};

const fallbackByLocale: Record<Locale, HomePageViewModel> = {
  ru: {
    locale: "ru",
    siteName: "Ваше имя",
    headerContacts: [
      "Email: contact@name.com",
      "Тел: +1 (555) 123-45-67",
      "Telegram: @yourname"
    ],
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "WhatsApp", href: "https://wa.me/15551234567" },
      { label: "Telegram", href: "https://t.me/yourname" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "X / Twitter", href: "https://x.com" }
    ],
    hero: {
      eyebrow: "Personal Website",
      name: "Your Name",
      title: "Professional Title",
      description:
        "I help teams and organizations create meaningful outcomes through strategic thinking, execution quality, and long-term collaboration.",
      primaryCta: { label: "Get in touch", href: "#contact" },
      secondaryCta: { label: "Download CV", href: "/cv.pdf" },
      facts: [
        { text: "Location: Flexible" },
        { text: "Availability: Open" },
        { text: "Experience: 8+ years" }
      ],
      portrait: {
        id: 2,
        alt: 'Портфолио Валерия',
        caption: null,
        updatedAt: '2026-03-18T20:20:12.645Z',
        createdAt: '2026-03-18T20:20:09.747Z',
        url: '/api/media/file/photo_2026-03-18%2023.11.24-7JxkcZfQnOqT2vdezaL4SkWeE5kf4W.jpeg',
        thumbnailURL: null,
        filename: 'photo_2026-03-18 23.11.24-7JxkcZfQnOqT2vdezaL4SkWeE5kf4W.jpeg',
        mimeType: 'image/jpeg',
        filesize: 143543,
        width: 1280,
        height: 960,
        focalX: 50,
        focalY: 50
      },
      portraitLabel: "Portrait / Visual",
    },
    about: {
      title: "About me",
      body: "I build clear, high-quality work with a focus on outcomes, communication, and sustainable execution.",
      principles: [
        "Clarity over complexity",
        "Measurable impact and accountability",
        "Collaboration with structured communication"
      ],
      stats: [
        { value: "24+", label: "Completed engagements" },
        { value: "95%", label: "Long-term collaboration rate" },
        { value: "Global", label: "Remote and hybrid friendly" }
      ]
    },
    skills: {
      title: "Skills matrix",
      subtitle:
        "Матрица навыков показывает текущий профиль компетенций по ключевым направлениям.",
      items: [
        {
          title: "Strategy",
          level: "Advanced",
          description: "Продуктовая и организационная стратегия"
        },
        {
          title: "Delivery",
          level: "Advanced",
          description: "Построение предсказуемого процесса поставки"
        },
        {
          title: "Collaboration",
          level: "Strong",
          description: "Коммуникация и кросс-функциональное взаимодействие"
        }
      ]
    },
    experience: {
      title: "Experience timeline",
      subtitle:
        "Modular timeline cards for periods, role scope, and achievements.",
      items: [
        {
          period: "2022 — Present",
          title: "Company / Project • Senior Role",
          description:
            "Led strategic and delivery initiatives with measurable operational and business impact.",
          highlight: "Increased key performance metric by 32%"
        },
        {
          period: "2019 — 2022",
          title: "Organization • Mid-Level Role",
          description:
            "Managed cross-functional workstreams and improved delivery quality across teams.",
          highlight: "Reduced turnaround time by 40%"
        }
      ]
    },
    projects: {
      title: "Selected projects",
      items: [
        {
          title: "Transformation Initiative",
          description:
            "Modernized core workflow and improved delivery reliability across stakeholders.",
          result: "Result: +28% efficiency"
        },
        {
          title: "Operational Redesign",
          description:
            "Designed a scalable execution model supporting higher quality and speed.",
          result: "Result: -35% cycle time"
        },
        {
          title: "Cross-Functional Program",
          description:
            "Aligned teams around shared outcomes with transparent planning and reporting.",
          result: "Result: +42% predictability"
        }
      ]
    },
    testimonials: {
      title: "Testimonials & Recommendations",
      subtitle:
        "A few notes from collaborators across different industries and project styles.",
      items: [
        {
          quote:
            "Clear thinker, dependable under pressure, and unusually strong at turning ambiguity into action.",
          author: "Taylor Chen · Product Director"
        },
        {
          quote:
            "Brings structure without rigidity. Teams move faster because priorities become obvious.",
          author: "Jordan Rivera · Studio Lead"
        },
        {
          quote:
            "Communicates tradeoffs honestly, protects quality, and still ships on time.",
          author: "Sam Patel · Operations Partner"
        }
      ],
      signalTitle: "Cross-functional and industry-agnostic collaboration model.",
      signalBody:
        "Designed for CMS-managed updates: hide, reorder, or replace blocks without breaking layout."
    },
    preferences: {
      title: "Working Preferences",
      items: [
        "Project Types: Product strategy, UX systems, delivery leadership",
        "Collaboration: Async-first, documented decisions, weekly sync",
        "Timezone & Availability: UTC-5 to UTC+2 overlap preferred"
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "Do you take short advisory projects?",
          answer:
            "Yes. Scope can start at one focused week if goals are clearly defined."
        },
        {
          question: "Can references be provided privately?",
          answer:
            "Absolutely. Full references are shared during active conversations."
        }
      ]
    },
    contact: {
      title: "Свяжитесь удобным способом",
      description:
        "Отвечаем в рабочие часы и стараемся быстро вернуться с конкретным следующим шагом.",
      methods: [
        { label: "hello@company.com", href: "mailto:hello@company.com" },
        { label: "+1 (415) 555-0189", href: "tel:+14155550189" },
        { label: "@company_support", href: "https://t.me/company_support" },
        { label: "linkedin.com/in/company", href: "https://linkedin.com" }
      ],
      formTitle: "Send a message",
      formDescription:
        "Опишите задачу и удобный канал связи — отвечу в течение 48 часов.",
      privacyText: "By sending, you agree to contact processing."
    },
    footer: {
      copyright: "© 2026 · Available globally · Remote / Hybrid",
      links: [
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Email", href: "mailto:contact@name.com" },
        { label: "Download CV", href: "/cv.pdf" }
      ]
    }
  },
  en: {
    locale: "en",
    siteName: "Your Name",
    headerContacts: [
      "Email: contact@name.com",
      "Phone: +1 (555) 123-45-67",
      "Telegram: @yourname"
    ],
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com" },
      { label: "WhatsApp", href: "https://wa.me/15551234567" },
      { label: "Telegram", href: "https://t.me/yourname" },
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "X / Twitter", href: "https://x.com" }
    ],
    hero: {
      eyebrow: "Personal Website",
      name: "Your Name",
      title: "Professional Title",
      description:
        "I help teams and organizations create meaningful outcomes through strategic thinking, execution quality, and long-term collaboration.",
      primaryCta: { label: "Get in touch", href: "#contact" },
      secondaryCta: { label: "Download CV", href: "/cv.pdf" },
      facts: [
        { text: "Location: Flexible" },
        { text: "Availability: Open" },
        { text: "Experience: 8+ years" }
      ],
      portrait: {
        id: 2,
        alt: 'Портфолио Валерия',
        caption: null,
        updatedAt: '2026-03-18T20:20:12.645Z',
        createdAt: '2026-03-18T20:20:09.747Z',
        url: '/api/media/file/photo_2026-03-18%2023.11.24-7JxkcZfQnOqT2vdezaL4SkWeE5kf4W.jpeg',
        thumbnailURL: null,
        filename: 'photo_2026-03-18 23.11.24-7JxkcZfQnOqT2vdezaL4SkWeE5kf4W.jpeg',
        mimeType: 'image/jpeg',
        filesize: 143543,
        width: 1280,
        height: 960,
        focalX: 50,
        focalY: 50
      },
      portraitLabel: "Portrait / Visual"
    },
    about: {
      title: "About me",
      body: "I build clear, high-quality work with a focus on outcomes, communication, and sustainable execution.",
      principles: [
        "Clarity over complexity",
        "Measurable impact and accountability",
        "Collaboration with structured communication"
      ],
      stats: [
        { value: "24+", label: "Completed engagements" },
        { value: "95%", label: "Long-term collaboration rate" },
        { value: "Global", label: "Remote and hybrid friendly" }
      ]
    },
    skills: {
      title: "Skills matrix",
      subtitle:
        "The skills matrix outlines the current competency profile across core areas.",
      items: [
        {
          title: "Strategy",
          level: "Advanced",
          description: "Product and organizational strategy"
        },
        {
          title: "Delivery",
          level: "Advanced",
          description: "Predictable delivery and execution quality"
        },
        {
          title: "Collaboration",
          level: "Strong",
          description: "Structured communication across teams"
        }
      ]
    },
    experience: {
      title: "Experience timeline",
      subtitle:
        "Modular timeline cards for periods, role scope, and achievements.",
      items: [
        {
          period: "2022 — Present",
          title: "Company / Project • Senior Role",
          description:
            "Led strategic and delivery initiatives with measurable operational and business impact.",
          highlight: "Increased key performance metric by 32%"
        },
        {
          period: "2019 — 2022",
          title: "Organization • Mid-Level Role",
          description:
            "Managed cross-functional workstreams and improved delivery quality across teams.",
          highlight: "Reduced turnaround time by 40%"
        }
      ]
    },
    projects: {
      title: "Selected projects",
      items: [
        {
          title: "Transformation Initiative",
          description:
            "Modernized core workflow and improved delivery reliability across stakeholders.",
          result: "Result: +28% efficiency"
        },
        {
          title: "Operational Redesign",
          description:
            "Designed a scalable execution model supporting higher quality and speed.",
          result: "Result: -35% cycle time"
        },
        {
          title: "Cross-Functional Program",
          description:
            "Aligned teams around shared outcomes with transparent planning and reporting.",
          result: "Result: +42% predictability"
        }
      ]
    },
    testimonials: {
      title: "Testimonials & Recommendations",
      subtitle:
        "A few notes from collaborators across different industries and project styles.",
      items: [
        {
          quote:
            "Clear thinker, dependable under pressure, and unusually strong at turning ambiguity into action.",
          author: "Taylor Chen · Product Director"
        },
        {
          quote:
            "Brings structure without rigidity. Teams move faster because priorities become obvious.",
          author: "Jordan Rivera · Studio Lead"
        },
        {
          quote:
            "Communicates tradeoffs honestly, protects quality, and still ships on time.",
          author: "Sam Patel · Operations Partner"
        }
      ],
      signalTitle: "Cross-functional and industry-agnostic collaboration model.",
      signalBody:
        "Designed for CMS-managed updates: hide, reorder, or replace blocks without breaking layout."
    },
    preferences: {
      title: "Working Preferences",
      items: [
        "Project Types: Product strategy, UX systems, delivery leadership",
        "Collaboration: Async-first, documented decisions, weekly sync",
        "Timezone & Availability: UTC-5 to UTC+2 overlap preferred"
      ]
    },
    faq: {
      title: "FAQ",
      items: [
        {
          question: "Do you take short advisory projects?",
          answer:
            "Yes. Scope can start at one focused week if goals are clearly defined."
        },
        {
          question: "Can references be provided privately?",
          answer:
            "Absolutely. Full references are shared during active conversations."
        }
      ]
    },
    contact: {
      title: "Get in touch in the channel you prefer",
      description:
        "We usually reply during working hours and return with a concrete next step.",
      methods: [
        { label: "hello@company.com", href: "mailto:hello@company.com" },
        { label: "+1 (415) 555-0189", href: "tel:+14155550189" },
        { label: "@company_support", href: "https://t.me/company_support" },
        { label: "linkedin.com/in/company", href: "https://linkedin.com" }
      ],
      formTitle: "Send a message",
      formDescription:
        "Describe your scope and preferred channel — I will reply within 48 hours.",
      privacyText: "By sending, you agree to contact processing."
    },
    footer: {
      copyright: "© 2026 · Available globally · Remote / Hybrid",
      links: [
        { label: "LinkedIn", href: "https://linkedin.com" },
        { label: "Email", href: "mailto:contact@name.com" },
        { label: "Download CV", href: "/cv.pdf" }
      ]
    }
  }
};

type MaybeArray<T> = T[] | null | undefined;

function coerceLinks(items: MaybeArray<Record<string, unknown>>, fallback: LinkItem[]) {
  if (!items?.length) {
    return fallback;
  }

  return items
    .map((item) => ({
      label: String(item.label ?? ""),
      href: String(item.href ?? "#"),
      iconUrl: item.iconUrl ? String(item.iconUrl) : undefined,
      iconAlt: item.iconAlt ? String(item.iconAlt) : undefined
    }))
    .filter((item) => item.label.length > 0);
}

export function getFallbackHomePage(locale: Locale) {
  return fallbackByLocale[locale];
}

export function mapHomePageData(raw: unknown, locale: Locale): HomePageViewModel {
  const fallback = getFallbackHomePage(locale);

  if (!raw || typeof raw !== "object") {
    return fallback;
  }

  const data = raw as Record<string, unknown>;
  const hero = (data.hero as Record<string, unknown> | undefined) ?? {};
  const about = (data.about as Record<string, unknown> | undefined) ?? {};
  const skills = (data.skills as Record<string, unknown> | undefined) ?? {};
  const experience = (data.experience as Record<string, unknown> | undefined) ?? {};
  const projects = (data.projects as Record<string, unknown> | undefined) ?? {};
  const testimonials =
    (data.testimonials as Record<string, unknown> | undefined) ?? {};
  const preferences =
    (data.preferences as Record<string, unknown> | undefined) ?? {};
  const faq = (data.faq as Record<string, unknown> | undefined) ?? {};
  const contact = (data.contact as Record<string, unknown> | undefined) ?? {};
  const footer = (data.footer as Record<string, unknown> | undefined) ?? {};

  return {
    ...fallback,
    siteName: String(data.siteName ?? fallback.siteName),
    headerContacts: (data.headerContacts ?? fallback.headerContacts) as string[],
    socialLinks: coerceLinks(data.socialLinks as MaybeArray<Record<string, unknown>>, fallback.socialLinks),
    hero: {
      ...fallback.hero,
      ...hero,
      primaryCta: {
        label: String(
          (hero.primaryCta as Record<string, unknown> | undefined)?.label ??
            fallback.hero.primaryCta.label
        ),
        href: String(
          (hero.primaryCta as Record<string, unknown> | undefined)?.href ??
            fallback.hero.primaryCta.href
        )
      },
      secondaryCta: {
        label: String(
          (hero.secondaryCta as Record<string, unknown> | undefined)?.label ??
            fallback.hero.secondaryCta.label
        ),
        href: String(
          (hero.secondaryCta as Record<string, unknown> | undefined)?.href ??
            fallback.hero.secondaryCta.href
        )
      },
      facts: (hero.facts as HeroFact[] | undefined) ?? fallback.hero.facts
    },
    about: {
      ...fallback.about,
      ...about,
      principles: (about.principles as string[] | undefined) ?? fallback.about.principles,
      stats: (about.stats as StatItem[] | undefined) ?? fallback.about.stats
    },
    skills: {
      ...fallback.skills,
      ...skills,
      items: (skills.items as SkillItem[] | undefined) ?? fallback.skills.items
    },
    experience: {
      ...fallback.experience,
      ...experience,
      items: (experience.items as ExperienceItem[] | undefined) ?? fallback.experience.items
    },
    projects: {
      ...fallback.projects,
      ...projects,
      items: (projects.items as ProjectItem[] | undefined) ?? fallback.projects.items
    },
    testimonials: {
      ...fallback.testimonials,
      ...testimonials,
      items:
        (testimonials.items as TestimonialItem[] | undefined) ??
        fallback.testimonials.items
    },
    preferences: {
      ...fallback.preferences,
      ...preferences,
      items: (preferences.items as string[] | undefined) ?? fallback.preferences.items
    },
    faq: {
      ...fallback.faq,
      ...faq,
      items:
        (faq.items as { question: string; answer: string }[] | undefined) ??
        fallback.faq.items
    },
    contact: {
      ...fallback.contact,
      ...contact,
      methods: coerceLinks(
        contact.methods as MaybeArray<Record<string, unknown>>,
        fallback.contact.methods
      )
    },
    footer: {
      ...fallback.footer,
      ...footer,
      links: coerceLinks(
        footer.links as MaybeArray<Record<string, unknown>>,
        fallback.footer.links
      )
    }
  };
}
