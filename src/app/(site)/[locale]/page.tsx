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
  params,
}: LocalePageProps): Promise<Metadata> {
  const resolvedParams = await params;

  if (!isLocale(resolvedParams.locale)) {
    return {};
  }

  const content = await getHomePageData(resolvedParams.locale);
  const seoTitle = content.defaultSEO?.title || content.siteName;
  const seoDescription = content.defaultSEO?.description || "";
  const ogImage = content.defaultSEO?.ogImage?.url;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImage
        ? [
            {
              url: ogImage,
              alt: content.defaultSEO?.ogImage?.alt || seoTitle
            }
          ]
        : undefined
    },
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
