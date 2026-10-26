import { notFound } from "next/navigation";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/Gallery";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Product } from "@/components/sections/Product";
import { Story } from "@/components/sections/Story";
import { isLocale } from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleHomePage({ params }: LocalePageProps) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }

  return (
    <main>
      <Hero locale={locale} />
      <Story locale={locale} />
      <Product locale={locale} />
      <Process locale={locale} />
      <Gallery locale={locale} />
      <Contact locale={locale} />
    </main>
  );
}
