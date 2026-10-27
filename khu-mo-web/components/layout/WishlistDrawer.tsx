"use client";

import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useSiteUI } from "@/components/providers/SiteUIProvider";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import { getDictionary, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site-config";
import { removeFromWishlist, useWishlist } from "@/lib/wishlist";

type WishlistDrawerProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

export function WishlistDrawer({ locale, open, onClose }: WishlistDrawerProps) {
  const t = getDictionary(locale);
  const wishlist = useWishlist();
  const { openEnquiry } = useSiteUI();
  const items = siteConfig.product.items.filter(({ key }) => wishlist.includes(key));

  return (
    <Dialog open={open} onClose={onClose} side="right" label={t.wishlist.title}>
      <DialogHeader title={t.wishlist.title} closeLabel={t.nav.close} onClose={onClose} />
      <div className="px-5 py-6">
        {items.length === 0 ? (
          <p className="text-sm leading-6 text-muted">{t.wishlist.empty}</p>
        ) : (
          <>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-muted">
              {t.wishlist.count.replace("{n}", String(items.length))}
            </p>
            <ul className="space-y-4">
              {items.map(({ key, image }) => {
                const item = t.discover.items[key];
                return (
                  <li key={key} className="flex gap-4 border-b border-line pb-4">
                    <span className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden rounded-sm bg-surface-muted">
                      <Image src={image} alt={item.name} fill sizes="80px" className="object-cover" />
                    </span>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                        {t.discover.categories[item.category]}
                      </p>
                      <p className="mt-1 font-semibold">{item.name}</p>
                      <div className="mt-auto flex items-center gap-2 pt-3">
                        <Button
                          variant="ghost"
                          className="min-h-9 px-4 text-xs"
                          onClick={() => {
                            onClose();
                            openEnquiry({ interest: "product", productKey: key });
                          }}
                        >
                          {t.wishlist.enquire}
                        </Button>
                        <button
                          type="button"
                          aria-label={`${t.wishlist.remove}: ${item.name}`}
                          title={t.wishlist.remove}
                          onClick={() => removeFromWishlist(key)}
                          className="inline-flex size-9 items-center justify-center rounded-full text-muted transition hover:bg-foreground/10 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          <Trash2 className="size-4" aria-hidden />
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </Dialog>
  );
}
