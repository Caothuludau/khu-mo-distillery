import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionProps = Omit<React.HTMLAttributes<HTMLElement>, "title"> & {
  title?: string;
  eyebrow?: string;
  intro?: string;
  /** Rendered on the right of the heading row, e.g. a "view all" link. */
  actions?: React.ReactNode;
  headingLevel?: "h1" | "h2";
};

export function Eyebrow({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <p className={cn("flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-highlight", className)}>
      <span className="h-px w-8 bg-gold" aria-hidden />
      {children}
    </p>
  );
}

export function Section({
  className,
  title,
  eyebrow,
  intro,
  actions,
  headingLevel: Heading = "h2",
  children,
  ...props
}: SectionProps) {
  const hasHeader = title || eyebrow || actions;
  return (
    <section className={cn("py-12 md:py-16", className)} {...props}>
      <Container>
        {hasHeader ? (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
              {title ? (
                <Heading className="mt-3 text-[1.75rem] font-bold leading-tight text-heading md:text-4xl">
                  {title}
                </Heading>
              ) : null}
              {intro ? <p className="mt-4 text-base leading-7 text-muted md:text-[17px]">{intro}</p> : null}
            </div>
            {actions}
          </div>
        ) : null}
        <div className={cn(hasHeader ? "mt-8 md:mt-12" : undefined)}>{children}</div>
      </Container>
    </section>
  );
}
