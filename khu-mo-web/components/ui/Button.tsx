import Link, { type LinkProps } from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const baseStyles =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-sm text-[15px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-55";

const variants = {
  primary: "bg-accent px-6 text-accent-foreground hover:bg-accent-hover focus-visible:ring-accent",
  secondary:
    "border border-heading/30 px-6 text-heading hover:border-heading hover:bg-heading/5 focus-visible:ring-accent",
  text: "px-1 text-heading underline-offset-4 hover:underline focus-visible:ring-accent",
  /** For use on photos and navy bands. */
  light: "bg-ivory px-6 text-navy hover:bg-white focus-visible:ring-ivory focus-visible:ring-offset-navy",
  outlineLight:
    "border border-ivory/50 px-6 text-ivory hover:border-ivory hover:bg-ivory/10 focus-visible:ring-ivory focus-visible:ring-offset-navy",
} as const;

export type ButtonVariant = keyof typeof variants;

export function buttonStyles(variant: ButtonVariant = "primary", className?: string) {
  return cn(baseStyles, variants[variant], className);
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  loading?: boolean;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonStyles(variant, className)}
      {...props}
    >
      {loading ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
}

type ButtonLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    variant?: ButtonVariant;
  };

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return <Link className={buttonStyles(variant, className)} {...props} />;
}
