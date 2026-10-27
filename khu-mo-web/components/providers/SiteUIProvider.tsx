"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { ContactForm } from "@/components/sections/ContactForm";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import type { Interest } from "@/lib/contact";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { ProductKey } from "@/lib/site-config";

type Tone = "light" | "dark";

type EnquiryRequest = {
  interest: Interest;
  productKey?: ProductKey;
};

type SiteUIContextValue = {
  openEnquiry: (request: EnquiryRequest) => void;
  /** Product the carousel should bring into view; `nonce` re-triggers the same product. */
  focusedProduct: { key: ProductKey; nonce: number } | null;
  focusProduct: (key: ProductKey) => void;
  /** Tone of the hero slide behind the top bar (null when the hero is not on screen). */
  heroTone: Tone | null;
  setHeroTone: (tone: Tone | null) => void;
};

const SiteUIContext = createContext<SiteUIContextValue | null>(null);

export function useSiteUI(): SiteUIContextValue {
  const value = useContext(SiteUIContext);
  if (!value) {
    throw new Error("useSiteUI must be used inside <SiteUIProvider>");
  }
  return value;
}

type SiteUIProviderProps = {
  locale: Locale;
  children: React.ReactNode;
};

export function SiteUIProvider({ locale, children }: SiteUIProviderProps) {
  const t = getDictionary(locale);
  const [enquiry, setEnquiry] = useState<(EnquiryRequest & { id: number }) | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [focusedProduct, setFocusedProduct] = useState<SiteUIContextValue["focusedProduct"]>(null);
  const [heroTone, setHeroTone] = useState<Tone | null>(null);

  const openEnquiry = useCallback((request: EnquiryRequest) => {
    setEnquiry({ ...request, id: Date.now() });
    setEnquiryOpen(true);
  }, []);

  const focusProduct = useCallback((key: ProductKey) => {
    setFocusedProduct({ key, nonce: Date.now() });
  }, []);

  const value = useMemo(
    () => ({ openEnquiry, focusedProduct, focusProduct, heroTone, setHeroTone }),
    [openEnquiry, focusedProduct, focusProduct, heroTone],
  );

  const isVisit = enquiry?.interest === "visit";

  return (
    <SiteUIContext.Provider value={value}>
      {children}
      <Dialog
        open={enquiryOpen}
        onClose={() => setEnquiryOpen(false)}
        side="center"
        label={isVisit ? t.enquiry.visitTitle : t.enquiry.productTitle}
      >
        <DialogHeader
          title={isVisit ? t.enquiry.visitTitle : t.enquiry.productTitle}
          closeLabel={t.nav.close}
          onClose={() => setEnquiryOpen(false)}
        />
        <div className="px-5 py-6 md:px-8">
          <p className="mb-6 text-sm leading-6 text-muted">
            {isVisit ? t.enquiry.visitIntro : t.enquiry.productIntro}
          </p>
          {enquiry ? (
            <ContactForm
              key={enquiry.id}
              locale={locale}
              initialInterest={enquiry.interest}
              productKey={enquiry.productKey}
            />
          ) : null}
        </div>
      </Dialog>
    </SiteUIContext.Provider>
  );
}
