import { cn } from "@/lib/utils";

type BadgeProps = {
  tone?: "default" | "warning" | "light";
  className?: string;
  children: React.ReactNode;
};

const tones = {
  default: "border-line bg-surface-muted text-foreground",
  warning: "border-danger/40 bg-surface text-danger",
  light: "border-ivory/30 bg-navy/60 text-ivory backdrop-blur-sm",
} as const;

export function Badge({ tone = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm border px-2 py-0.5 text-[13px] font-medium leading-5",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
