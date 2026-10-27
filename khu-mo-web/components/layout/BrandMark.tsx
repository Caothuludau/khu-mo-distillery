import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
};

/** The Khu Mo logo painted in `currentColor`, so text colour classes recolour it. */
export function BrandMark({ className }: BrandMarkProps) {
  const mask = `url(${siteConfig.brand.logoImage}) center / contain no-repeat`;

  return (
    <span
      aria-hidden
      className={cn("block bg-current", className)}
      style={{
        aspectRatio: siteConfig.brand.logoAspectRatio,
        mask,
        WebkitMask: mask,
      }}
    />
  );
}
