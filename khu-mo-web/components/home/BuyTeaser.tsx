import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { EnquiryButton } from "@/components/forms/EnquiryButton";
import { buttonStyles } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig, toTelHref } from "@/lib/site-config";

type BuyTeaserProps = {
  locale: Locale;
};

export function BuyTeaser({ locale }: BuyTeaserProps) {
  const t = getDictionary(locale);
  const { company } = siteConfig;

  return (
    <Section id="buy" eyebrow={t.home.buyEyebrow} title={t.home.buyTitle} intro={t.home.buyBody}>
      <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <div className="rounded-sm border border-line bg-surface p-6 md:p-8">
          <p className="text-sm font-semibold text-heading">{company.name}</p>
          <p className="mt-3 flex gap-3 text-base leading-7">
            <MapPin className="mt-1 size-5 shrink-0 text-highlight" aria-hidden />
            {company.address}
          </p>
          {company.phone ? (
            <p className="mt-2 flex gap-3 text-base">
              <Phone className="mt-1 size-5 shrink-0 text-highlight" aria-hidden />
              <a href={toTelHref(company.phone)} className="font-semibold text-heading underline-offset-4 hover:underline">
                {company.phone}
              </a>
            </p>
          ) : null}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href={`/${locale}/where-to-buy`} className={buttonStyles("primary")}>
              {t.home.buyPointsCta}
            </Link>
            <EnquiryButton interest="purchase" variant="secondary">
              {t.home.buyEnquiryCta}
            </EnquiryButton>
          </div>
        </div>
        <div className="flex flex-col justify-center rounded-sm bg-surface-muted p-6 md:p-8">
          <p className="text-lg font-semibold text-heading">{t.home.partnerPrompt}</p>
          <Link
            href={`/${locale}/partners`}
            className="mt-3 inline-flex min-h-11 items-center gap-2 text-[15px] font-semibold text-heading underline-offset-4 hover:underline"
          >
            {t.home.partnerCta}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </Section>
  );
}
