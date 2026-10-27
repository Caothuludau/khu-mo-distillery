import Link, { type LinkProps } from "next/link";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm px-6 text-sm font-semibold uppercase tracking-[0.14em] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover focus-visible:ring-accent",
  ghost:
    "border border-line text-foreground hover:bg-foreground/5 focus-visible:ring-accent",
  light:
    "bg-mineral-white text-charcoal hover:bg-white focus-visible:ring-mineral-white focus-visible:ring-offset-charcoal",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    />
  );
}

type ButtonLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    variant?: Variant;
  };

export function ButtonLink({
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return <Link className={cn(baseStyles, variants[variant], className)} {...props} />;
}
