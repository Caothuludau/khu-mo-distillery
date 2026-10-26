import { Suspense } from "react";
import Image from "next/image";
import { ContactForm, ContactFormFromQuery } from "@/components/sections/ContactForm";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type ContactProps = {
  locale: Locale;
};

export function Contact({ locale }: ContactProps) {
  const t = getDictionary(locale);

  return (
    <Section id="contact" eyebrow={t.contact.eyebrow} title={t.contact.title}>
      <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-base leading-7 text-mineral-white/85">{t.contact.intro}</p>
          <div className="relative mt-4 aspect-[4/3] overflow-hidden rounded border border-mineral-white/15">
            <Image
              src={siteConfig.contact.backgroundImage}
              alt={t.contact.imageAlt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <Suspense fallback={<ContactForm locale={locale} />}>
          <ContactFormFromQuery locale={locale} />
        </Suspense>
      </div>
    </Section>
  );
}
