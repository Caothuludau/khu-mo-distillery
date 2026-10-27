"use client";

import { Button, type ButtonVariant } from "@/components/ui/Button";
import { useSiteUI, type EnquiryRequest } from "@/components/providers/SiteUIProvider";

type EnquiryButtonProps = EnquiryRequest & {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

/** Opens the shared enquiry popup; usable from server components. */
export function EnquiryButton({ interest, productSlug, variant, className, children }: EnquiryButtonProps) {
  const { openEnquiry } = useSiteUI();
  return (
    <Button
      variant={variant}
      className={className}
      aria-haspopup="dialog"
      onClick={() => openEnquiry({ interest, productSlug })}
    >
      {children}
    </Button>
  );
}
