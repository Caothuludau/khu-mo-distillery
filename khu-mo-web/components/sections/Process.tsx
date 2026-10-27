import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type ProcessProps = {
  locale: Locale;
};

export function Process({ locale }: ProcessProps) {
  const t = getDictionary(locale);

  return (
    <Section id="process" eyebrow={t.process.eyebrow} title={t.process.title}>
      <div className="relative mb-8 aspect-[16/7] overflow-hidden rounded-sm md:aspect-[16/5]">
        <Image
          src={siteConfig.process.backgroundImage}
          alt={t.process.imageAlt}
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
        {t.process.steps.map((step, index) => (
          <li key={step.title} className="rounded-sm border border-line bg-surface p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
