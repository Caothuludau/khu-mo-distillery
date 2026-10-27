import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: LucideIcon;
  title?: string;
  body: string;
  action?: React.ReactNode;
  className?: string;
};

export function EmptyState({ icon: Icon, title, body, action, className }: EmptyStateProps) {
  return (
    <div className={cn("rounded-sm border border-dashed border-line bg-surface px-6 py-10 text-center", className)}>
      <Icon className="mx-auto size-8 text-highlight" aria-hidden />
      {title ? <h3 className="mt-4 text-xl font-semibold text-heading">{title}</h3> : null}
      <p className="mx-auto mt-2 max-w-md text-base leading-7 text-muted">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}
