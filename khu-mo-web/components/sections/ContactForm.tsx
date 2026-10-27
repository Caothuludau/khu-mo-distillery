"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { CONTACT_LIMITS, INTEREST_VALUES, type Interest } from "@/lib/contact";
import { getDictionary, type Locale } from "@/lib/i18n";
import type { ProductKey } from "@/lib/site-config";

type Messages = ReturnType<typeof getDictionary>["contact"]["validation"];

function buildContactSchema(messages: Messages) {
  return z.object({
    name: z
      .string()
      .trim()
      .min(CONTACT_LIMITS.nameMin, messages.name)
      .max(CONTACT_LIMITS.nameMax, messages.name),
    email: z.string().trim().max(CONTACT_LIMITS.emailMax, messages.email).email(messages.email),
    phone: z.string().trim().max(CONTACT_LIMITS.phoneMax, messages.phone).optional(),
    interest: z.enum(INTEREST_VALUES),
    message: z
      .string()
      .trim()
      .min(CONTACT_LIMITS.messageMin, messages.message)
      .max(CONTACT_LIMITS.messageMax, messages.message),
    website: z.string().optional(),
  });
}

type ContactValues = z.infer<ReturnType<typeof buildContactSchema>>;

const fieldClassName =
  "w-full rounded-sm border border-line bg-surface px-3 text-foreground placeholder:text-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
const inputClassName = `min-h-11 ${fieldClassName}`;
const labelClassName = "mb-1 block text-sm font-medium text-foreground";
const errorClassName = "mt-1 text-xs text-red-700 dark:text-red-300";

type ContactFormProps = {
  locale: Locale;
  initialInterest?: Interest;
  productKey?: ProductKey;
};

export function ContactForm({ locale, initialInterest = "visit", productKey }: ContactFormProps) {
  const t = getDictionary(locale);
  const contactSchema = useMemo(
    () => buildContactSchema(t.contact.validation),
    [t.contact.validation],
  );
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const defaultValues: ContactValues = {
    name: "",
    email: "",
    phone: "",
    interest: initialInterest,
    message: productKey
      ? t.contact.productPrefill.replace("{product}", t.discover.items[productKey].name)
      : "",
    website: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  async function onSubmit(values: ContactValues) {
    setSubmitState("idle");
    setSubmitMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setSubmitState("error");
        setSubmitMessage(response.status === 429 ? t.contact.rateLimited : t.contact.error);
        return;
      }

      reset({ ...defaultValues, message: "" });
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setSubmitMessage(t.contact.error);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="contact-name">
            {t.contact.labels.name}
          </label>
          <input
            id="contact-name"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax}
            aria-invalid={errors.name ? true : undefined}
            className={inputClassName}
            {...register("name")}
          />
          {errors.name ? <p className={errorClassName}>{errors.name.message}</p> : null}
        </div>
        <div>
          <label className={labelClassName} htmlFor="contact-email">
            {t.contact.labels.email}
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.emailMax}
            aria-invalid={errors.email ? true : undefined}
            className={inputClassName}
            {...register("email")}
          />
          {errors.email ? <p className={errorClassName}>{errors.email.message}</p> : null}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClassName} htmlFor="contact-phone">
            {t.contact.labels.phone}
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            maxLength={CONTACT_LIMITS.phoneMax}
            aria-invalid={errors.phone ? true : undefined}
            className={inputClassName}
            placeholder={t.contact.placeholders.phone}
            {...register("phone")}
          />
          {errors.phone ? <p className={errorClassName}>{errors.phone.message}</p> : null}
        </div>
        <div>
          <label className={labelClassName} htmlFor="contact-interest">
            {t.contact.labels.interest}
          </label>
          <select id="contact-interest" className={inputClassName} {...register("interest")}>
            {INTEREST_VALUES.map((option) => (
              <option key={option} value={option}>
                {t.contact.options[option]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClassName} htmlFor="contact-message">
          {t.contact.labels.message}
        </label>
        <textarea
          id="contact-message"
          rows={4}
          maxLength={CONTACT_LIMITS.messageMax}
          aria-invalid={errors.message ? true : undefined}
          className={`py-2 ${fieldClassName}`}
          {...register("message")}
        />
        {errors.message ? <p className={errorClassName}>{errors.message.message}</p> : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? t.contact.buttonSending : t.contact.buttonIdle}
      </Button>

      <div aria-live="polite">
        {submitState === "success" ? (
          <p className="text-sm text-green-700 dark:text-green-300">{t.contact.success}</p>
        ) : null}
        {submitState === "error" ? (
          <p className="text-sm text-red-700 dark:text-red-300">{submitMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
