import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  const t = getDictionary(locale);

  return (
    <section className="relative overflow-hidden border-b border-mineral-white/10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_40%,_rgba(176,141,87,0.18),_transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-charcoal" />
      <Container className="relative grid min-h-[78dvh] items-center gap-10 py-16 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-20">
        <div className="relative mx-auto aspect-[748/325] w-full max-w-sm md:order-last md:max-w-none">
          <Image
            src={siteConfig.hero.logoImage}
            alt={t.hero.logoAlt}
            fill
            priority
            sizes="(min-width: 1152px) 520px, (min-width: 768px) 45vw, 384px"
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            {t.hero.tagline}
          </p>
          <h1 className="mt-4 max-w-xl text-4xl font-bold leading-tight tracking-tight text-mineral-white md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-mineral-white/85 md:text-xl">
            {t.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href={`/${locale}#contact`}>{t.hero.primaryCta}</ButtonLink>
            <ButtonLink href={`/${locale}#product`} variant="ghost">
              {t.hero.secondaryCta}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
