import { Breadcrumb, type Crumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";

type PageHeroProps = {
  title: string;
  intro?: string;
  breadcrumbLabel: string;
  breadcrumb: Crumb[];
};

/** Navy title band for inner pages; sits under the sticky top bar. */
export function PageHero({ title, intro, breadcrumbLabel, breadcrumb }: PageHeroProps) {
  return (
    <div className="relative overflow-hidden bg-navy text-ivory">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] [background-image:repeating-linear-gradient(135deg,currentColor_0,currentColor_1px,transparent_1px,transparent_14px)]"
      />
      <Container className="relative py-10 md:py-14">
        <Breadcrumb label={breadcrumbLabel} items={breadcrumb} tone="light" />
        <h1 className="mt-4 max-w-3xl text-[2rem] font-bold leading-tight sm:text-[2.375rem] lg:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-base leading-7 text-ivory/80 md:text-[17px]">{intro}</p> : null}
        <span className="mt-8 block h-px w-16 bg-gold" aria-hidden />
      </Container>
    </div>
  );
}
