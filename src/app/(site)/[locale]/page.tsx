import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortfolioPage } from "@/components/portfolio-page";
import { getHomePageData } from "@/lib/content/fetch-home-page";
import { isLocale, type Locale } from "@/lib/locales";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export async function generateMetadata({
  params
}: LocalePageProps): Promise<Metadata> {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    return {};
  }

  const content = await getHomePageData(resolvedParams.locale);

  return {
    title: `${content.siteName} — ${content.hero.title}`,
    description: content.hero.description,
    openGraph: {
      title: `${content.siteName} — ${content.hero.title}`,
      description: content.hero.description
    }
  };
}

export default async function LocalePage({ params }: LocalePageProps) {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    notFound();
  }

  const content = await getHomePageData(resolvedParams.locale as Locale);
  return <PortfolioPage content={content} />;
}
