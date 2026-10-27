"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogHeader } from "@/components/ui/Dialog";
import { getDictionary, type Locale } from "@/lib/i18n";

const inputClassName =
  "min-h-11 w-full rounded-sm border border-line bg-surface px-3 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

type AccountDialogProps = {
  locale: Locale;
  open: boolean;
  onClose: () => void;
};

/** Sign-in / register UI. There is no account backend yet, so submitting only shows a notice. */
export function AccountDialog({ locale, open, onClose }: AccountDialogProps) {
  const t = getDictionary(locale);
  const [mode, setMode] = useState<"signIn" | "register">("signIn");
  const [submitted, setSubmitted] = useState(false);
  const title = mode === "signIn" ? t.account.signInTitle : t.account.registerTitle;

  return (
    <Dialog open={open} onClose={onClose} side="center" label={title}>
      <DialogHeader title={title} closeLabel={t.nav.close} onClose={onClose} />
      <form
        className="space-y-4 px-5 py-6 md:px-8"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(true);
        }}
      >
        {mode === "register" ? (
          <div>
            <label htmlFor="account-name" className="mb-1 block text-sm font-medium">
              {t.account.name}
            </label>
            <input id="account-name" autoComplete="name" required className={inputClassName} />
          </div>
        ) : null}
        <div>
          <label htmlFor="account-email" className="mb-1 block text-sm font-medium">
            {t.account.email}
          </label>
          <input
            id="account-email"
            type="email"
            autoComplete="email"
            required
            className={inputClassName}
          />
        </div>
        <div>
          <label htmlFor="account-password" className="mb-1 block text-sm font-medium">
            {t.account.password}
          </label>
          <input
            id="account-password"
            type="password"
            autoComplete={mode === "signIn" ? "current-password" : "new-password"}
            required
            className={inputClassName}
          />
        </div>

        <Button type="submit" className="w-full">
          {mode === "signIn" ? t.account.signIn : t.account.register}
        </Button>

        <div aria-live="polite">
          {submitted ? (
            <p className="rounded-sm bg-surface-muted px-3 py-2 text-sm text-muted">
              {t.account.comingSoon}
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "signIn" ? "register" : "signIn");
            setSubmitted(false);
          }}
          className="w-full text-center text-sm font-medium text-accent underline-offset-4 hover:underline"
        >
          {mode === "signIn" ? t.account.toRegister : t.account.toSignIn}
        </button>
      </form>
    </Dialog>
  );
}
