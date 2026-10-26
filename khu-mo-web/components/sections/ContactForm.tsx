"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { CONTACT_LIMITS, INTEREST_VALUES, isInterest, type Interest } from "@/lib/contact";
import { getDictionary, type Locale } from "@/lib/i18n";
import { isProductKey, type ProductKey } from "@/lib/site-config";

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

const inputClassName =
  "min-h-11 w-full rounded border border-mineral-white/20 bg-charcoal px-3 text-mineral-white placeholder:text-mineral-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold";

type ContactFormProps = {
  locale: Locale;
  initialInterest?: Interest;
  productKey?: ProductKey;
};

export function ContactForm({ locale, initialInterest = "general", productKey }: ContactFormProps) {
  const t = getDictionary(locale);
  const contactSchema = useMemo(
    () => buildContactSchema(t.contact.validation),
    [t.contact.validation],
  );
  const [submitState, setSubmitState] = useState<"idle" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      interest: initialInterest,
      message: "",
      website: "",
    },
  });

  useEffect(() => {
    setValue("interest", initialInterest);
    if (productKey && !getValues("message").trim()) {
      setValue(
        "message",
        t.contact.productPrefill.replace("{product}", t.product.items[productKey].name),
      );
    }
  }, [initialInterest, productKey, getValues, setValue, t]);

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

      reset({
        name: "",
        email: "",
        phone: "",
        interest: initialInterest,
        message: "",
        website: "",
      });
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setSubmitMessage(t.contact.error);
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label className="mb-1 block text-sm font-medium text-mineral-white" htmlFor="name">
            {t.contact.labels.name}
          </label>
          <input
            id="name"
            autoComplete="name"
            maxLength={CONTACT_LIMITS.nameMax}
            aria-invalid={errors.name ? true : undefined}
            className={inputClassName}
            {...register("name")}
          />
          {errors.name ? <p className="mt-1 text-xs text-red-300">{errors.name.message}</p> : null}
        </div>
        <div className="sm:col-span-1">
          <label className="mb-1 block text-sm font-medium text-mineral-white" htmlFor="email">
            {t.contact.labels.email}
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.emailMax}
            aria-invalid={errors.email ? true : undefined}
            className={inputClassName}
            {...register("email")}
          />
          {errors.email ? (
            <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>
          ) : null}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-mineral-white" htmlFor="phone">
          {t.contact.labels.phone}
        </label>
        <input
          id="phone"
          type="tel"
          autoComplete="tel"
          maxLength={CONTACT_LIMITS.phoneMax}
          aria-invalid={errors.phone ? true : undefined}
          className={inputClassName}
          placeholder={t.contact.placeholders.phone}
          {...register("phone")}
        />
        {errors.phone ? <p className="mt-1 text-xs text-red-300">{errors.phone.message}</p> : null}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-mineral-white" htmlFor="interest">
          {t.contact.labels.interest}
        </label>
        <select id="interest" className={inputClassName} {...register("interest")}>
          {INTEREST_VALUES.map((option) => (
            <option key={option} value={option}>
              {t.contact.options[option]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-mineral-white" htmlFor="message">
          {t.contact.labels.message}
        </label>
        <textarea
          id="message"
          rows={5}
          maxLength={CONTACT_LIMITS.messageMax}
          aria-invalid={errors.message ? true : undefined}
          className="w-full rounded border border-mineral-white/20 bg-charcoal px-3 py-2 text-mineral-white placeholder:text-mineral-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1 text-xs text-red-300">{errors.message.message}</p>
        ) : null}
      </div>

      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t.contact.buttonSending : t.contact.buttonIdle}
      </Button>

      <div aria-live="polite">
        {submitState === "success" ? (
          <p className="text-sm text-green-300">{t.contact.success}</p>
        ) : null}
        {submitState === "error" ? <p className="text-sm text-red-300">{submitMessage}</p> : null}
      </div>
    </form>
  );
}

export function ContactFormFromQuery({ locale }: { locale: Locale }) {
  const searchParams = useSearchParams();
  const interestParam = searchParams.get("interest");
  const productParam = searchParams.get("product");
  const productKey = productParam && isProductKey(productParam) ? productParam : undefined;
  const initialInterest: Interest = isInterest(interestParam)
    ? interestParam
    : productKey
      ? "product"
      : "general";

  return (
    <ContactForm locale={locale} initialInterest={initialInterest} productKey={productKey} />
  );
}
