"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type Side = "left" | "right" | "top" | "center";

const sideStyles: Record<Side, string> = {
  left: "m-0 mr-auto h-dvh max-h-dvh w-[min(22rem,88vw)]",
  right: "m-0 ml-auto h-dvh max-h-dvh w-[min(26rem,92vw)]",
  top: "mx-auto mb-auto mt-0 w-full",
  center: "m-auto max-h-[92dvh] w-[min(36rem,94vw)]",
};

type DialogProps = {
  open: boolean;
  onClose: () => void;
  side: Side;
  label: string;
  className?: string;
  children: React.ReactNode;
};

export function Dialog({ open, onClose, side, label, className, children }: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) {
      return;
    }
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      data-side={side}
      className={cn("site-dialog", sideStyles[side])}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) {
          onClose();
        }
      }}
    >
      <div
        className={cn(
          "h-full overflow-y-auto bg-background text-foreground shadow-2xl",
          side === "center" && "rounded-sm",
          className,
        )}
      >
        {children}
      </div>
    </dialog>
  );
}

type DialogHeaderProps = {
  title: string;
  closeLabel: string;
  onClose: () => void;
};

export function DialogHeader({ title, closeLabel, onClose }: DialogHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</h2>
      <button
        type="button"
        aria-label={closeLabel}
        onClick={onClose}
        className="inline-flex size-10 items-center justify-center rounded-full transition hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <X className="size-5" aria-hidden />
      </button>
    </div>
  );
}
