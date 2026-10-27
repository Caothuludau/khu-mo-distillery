import { notFound } from "next/navigation";
import { Discover } from "@/components/sections/Discover";
import { HeroBanner } from "@/components/sections/HeroBanner";
import { Process } from "@/components/sections/Process";
import { Story } from "@/components/sections/Story";
import { Visit } from "@/components/sections/Visit";
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
      <HeroBanner locale={locale} />
      <Discover locale={locale} />
      <Story locale={locale} />
      <Visit locale={locale} />
      <Process locale={locale} />
    </main>
  );
}
