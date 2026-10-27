import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { BrandMark } from "@/components/layout/BrandMark";
import { Container } from "@/components/ui/Container";
import { format, getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig, toTelHref } from "@/lib/site-config";

type SiteFooterProps = {
  locale: Locale;
};

const linkClassName =
  "inline-flex min-h-10 items-center rounded-sm text-[15px] text-ivory/80 transition hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

export function SiteFooter({ locale }: SiteFooterProps) {
  const t = getDictionary(locale);
  const { company } = siteConfig;
  const base = `/${locale}`;

  const groups = [
    {
      title: t.footer.explore,
      links: [
        { href: `${base}/products`, label: t.nav.products },
        { href: `${base}/story`, label: t.nav.story },
        { href: `${base}/story#process`, label: t.footer.process },
        { href: `${base}/story#news`, label: t.footer.news },
      ],
    },
    {
      title: t.footer.buy,
      links: [
        { href: `${base}/where-to-buy`, label: t.nav.whereToBuy },
        { href: `${base}/where-to-buy#delivery`, label: t.footer.delivery },
        { href: `${base}/where-to-buy#order`, label: t.footer.order },
        { href: `${base}/partners`, label: t.nav.partners },
        { href: `${base}/partners#partner-form`, label: t.footer.partnerForm },
      ],
    },
    {
      title: t.footer.legal,
      links: [
        { href: `${base}/legal/terms`, label: t.legal.docs.terms.title },
        { href: `${base}/legal/privacy`, label: t.legal.docs.privacy.title },
        { href: `${base}/legal/cookies`, label: t.legal.docs.cookies.title },
        { href: `${base}/legal/shipping`, label: t.legal.docs.shipping.title },
      ],
    },
  ];

  return (
    <footer className="bg-navy text-ivory">
      <span className="block h-px bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden />
      <Container className="grid gap-10 py-12 md:grid-cols-2 md:py-16 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <BrandMark className="h-12 text-ivory" />
          <p className="mt-5 max-w-xs text-[15px] leading-7 text-ivory/80">{t.footer.tagline}</p>
          <address className="mt-6 space-y-3 text-[15px] not-italic leading-6 text-ivory/80">
            <p className="font-semibold text-ivory">{company.name}</p>
            <p className="flex gap-2">
              <MapPin className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
              {company.address}
            </p>
            {company.phone ? (
              <p className="flex gap-2">
                <Phone className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <a href={toTelHref(company.phone)} className="hover:text-ivory">
                  {company.phone}
                </a>
              </p>
            ) : null}
            {company.email ? (
              <p className="flex gap-2">
                <Mail className="mt-1 size-4 shrink-0 text-gold" aria-hidden />
                <a href={`mailto:${company.email}`} className="hover:text-ivory">
                  {company.email}
                </a>
              </p>
            ) : null}
          </address>
        </div>

        {groups.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-gold">{group.title}</h2>
            <ul className="mt-4 space-y-1">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClassName}>
                    {link.label}
                  </Link>
                </li>
              ))}
              {group.title === t.footer.legal ? (
                <li>
                  <CookieSettingsButton label={t.cookies.settings} className={linkClassName} />
                </li>
              ) : null}
            </ul>
          </nav>
        ))}
      </Container>

      <div className="border-t border-ivory/15">
        <Container className="flex flex-col gap-2 py-5 text-sm text-ivory/70 md:flex-row md:items-center md:justify-between">
          <p>{format(t.footer.rights, { year: new Date().getFullYear() })}</p>
          <p className="font-medium text-ivory/85">{t.footer.ageNotice}</p>
        </Container>
      </div>
    </footer>
  );
}
