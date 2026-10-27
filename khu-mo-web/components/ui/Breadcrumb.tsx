import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

type BreadcrumbProps = {
  label: string;
  items: Crumb[];
  className?: string;
  tone?: "default" | "light";
};

export function Breadcrumb({ label, items, className, tone = "default" }: BreadcrumbProps) {
  return (
    <nav aria-label={label} className={className}>
      <ol className={cn("flex flex-wrap items-center gap-1 text-sm", tone === "light" ? "text-ivory/75" : "text-muted")}>
        {items.map((item, index) => {
          const last = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    "inline-flex min-h-8 items-center rounded-sm underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2",
                    tone === "light" ? "hover:text-ivory focus-visible:ring-ivory" : "hover:text-heading focus-visible:ring-accent",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={cn(last && (tone === "light" ? "text-ivory" : "text-foreground"))}>
                  {item.label}
                </span>
              )}
              {last ? null : <ChevronRight className="size-3.5 opacity-60" aria-hidden />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
