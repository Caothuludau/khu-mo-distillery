import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";

type ProductProps = {
  locale: Locale;
};

export function Product({ locale }: ProductProps) {
  const t = getDictionary(locale);

  return (
    <Section id="product" eyebrow={t.product.eyebrow} title={t.product.title}>
      <div className="grid gap-4 md:grid-cols-3">
        {siteConfig.product.items.map(({ key, image }) => {
          const product = t.product.items[key];
          return (
            <article
              key={key}
              className="flex flex-col rounded border border-mineral-white/15 bg-iron-gray/35 p-4"
            >
              <div className="relative mb-4 aspect-[16/10] overflow-hidden rounded border border-mineral-white/10">
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                {t.product.categories[product.category]}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-mineral-white">{product.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-mineral-white/85">
                {product.blurb}
              </p>
              <ButtonLink
                href={`/${locale}?interest=product&product=${key}#contact`}
                variant="ghost"
                className="mt-5 w-full"
              >
                {t.product.enquire}
              </ButtonLink>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
