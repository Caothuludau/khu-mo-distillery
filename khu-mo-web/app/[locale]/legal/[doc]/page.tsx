import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FileWarning } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import {
  getDictionary,
  getLocaleAlternates,
  isLocale,
  LEGAL_DOCS,
  LOCALES,
  type LegalDocKey,
} from "@/lib/i18n";

type LegalPageProps = {
  params: Promise<{ locale: string; doc: string }>;
};

function isLegalDoc(value: string): value is LegalDocKey {
  return (LEGAL_DOCS as readonly string[]).includes(value);
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => LEGAL_DOCS.map((doc) => ({ locale, doc })));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) {
    return {};
  }
  const content = getDictionary(locale).legal.docs[doc];
  return {
    title: content.title,
    description: content.description,
    alternates: getLocaleAlternates(locale, `/legal/${doc}`),
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { locale, doc } = await params;
  if (!isLocale(locale) || !isLegalDoc(doc)) {
    notFound();
  }
  const t = getDictionary(locale);
  const content = t.legal.docs[doc];

  return (
    <main>
      <PageHero
        title={content.title}
        intro={content.description}
        breadcrumbLabel={t.common.breadcrumb}
        breadcrumb={[{ label: t.common.home, href: `/${locale}` }, { label: content.title }]}
      />
      <Container className="grid gap-10 py-10 md:py-14 lg:grid-cols-[1fr_16rem]">
        <article className="max-w-prose">
          <p className="flex gap-3 rounded-sm border border-gold/50 bg-surface p-4 text-[15px] leading-6">
            <FileWarning className="mt-0.5 size-5 shrink-0 text-highlight" aria-hidden />
            {t.legal.draftNotice}
          </p>
          {content.sections.map((section) => (
            <section key={section.heading} className="mt-8">
              <h2 className="text-xl font-semibold text-heading md:text-2xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="mt-3 text-base leading-7 md:text-[17px]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </article>
        <nav aria-label={t.footer.legal} className="lg:pt-2">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-highlight">{t.footer.legal}</h2>
          <ul className="mt-3 space-y-1">
            {LEGAL_DOCS.map((key) => (
              <li key={key}>
                <Link
                  href={`/${locale}/legal/${key}`}
                  aria-current={key === doc ? "page" : undefined}
                  className="inline-flex min-h-10 items-center text-[15px] text-muted hover:text-heading aria-[current=page]:font-semibold aria-[current=page]:text-heading"
                >
                  {t.legal.docs[key].title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </main>
  );
}
