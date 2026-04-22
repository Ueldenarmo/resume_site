import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Portfolio Kisik",
  description: "Personal resume landing powered by Next.js and Payload CMS."
};

export default function SiteRootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="font-sans">{children}</body>
    </html>
  );
}
