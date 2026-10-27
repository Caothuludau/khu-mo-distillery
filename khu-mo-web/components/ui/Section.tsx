import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  title?: string;
  eyebrow?: string;
  /** Rendered on the right of the heading row, e.g. carousel controls. */
  actions?: React.ReactNode;
};

export function Section({
  className,
  title,
  eyebrow,
  actions,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("py-20 md:py-28", className)} {...props}>
      <Container>
        {title || eyebrow || actions ? (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              {eyebrow ? (
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                  {eyebrow}
                </p>
              ) : null}
              {title ? (
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {title}
                </h2>
              ) : null}
            </div>
            {actions}
          </div>
        ) : null}
        <div className={cn(title || eyebrow ? "mt-10" : undefined)}>{children}</div>
      </Container>
    </section>
  );
}
