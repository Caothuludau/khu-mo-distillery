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
      <div className="relative mb-5 aspect-[16/5] overflow-hidden rounded border border-mineral-white/15">
        <Image
          src={siteConfig.process.backgroundImage}
          alt={t.process.imageAlt}
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
      </div>
      <ol className="grid gap-4 md:grid-cols-5">
        {t.process.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded border border-mineral-white/15 bg-iron-gray/35 p-4"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-mineral-white">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-mineral-white/85">{step.detail}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
