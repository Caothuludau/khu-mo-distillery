"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import type { Interest } from "@/lib/contact";
import { getDictionary, type Locale } from "@/lib/i18n";

type Tone = "light" | "dark";

export type EnquiryRequest = {
  interest: Interest;
  productSlug?: string;
};

type SiteUIContextValue = {
  openEnquiry: (request: EnquiryRequest) => void;
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
  const [heroTone, setHeroTone] = useState<Tone | null>(null);

  const openEnquiry = useCallback((request: EnquiryRequest) => {
    setEnquiry({ ...request, id: Date.now() });
    setEnquiryOpen(true);
  }, []);

  const value = useMemo(() => ({ openEnquiry, heroTone, setHeroTone }), [openEnquiry, heroTone]);
  const title = t.enquiry.titles[enquiry?.interest ?? "general"];

  return (
    <SiteUIContext.Provider value={value}>
      {children}
      <Dialog open={enquiryOpen} onClose={() => setEnquiryOpen(false)} side="center" label={title}>
        <DialogHeader title={title} closeLabel={t.common.close} onClose={() => setEnquiryOpen(false)} />
        <div className="px-5 py-6 md:px-8">
          {enquiry ? (
            <>
              <p className="mb-6 text-sm leading-6 text-muted">{t.enquiry.intros[enquiry.interest]}</p>
              <EnquiryForm
                key={enquiry.id}
                locale={locale}
                idPrefix="dialog"
                initialInterest={enquiry.interest}
                productSlug={enquiry.productSlug}
              />
            </>
          ) : null}
        </div>
      </Dialog>
    </SiteUIContext.Provider>
  );
}
