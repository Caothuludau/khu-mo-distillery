"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm, type FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  buildEnquirySchema,
  CONTACT_LIMITS,
  INTEREST_VALUES,
  ORDER_INTERESTS,
  type EnquiryValues,
  type Interest,
} from "@/lib/contact";
import { getDictionary, type Locale } from "@/lib/i18n";
import { getFilterOptions, getProduct, productPackagings, products, text } from "@/lib/products";
import { cn } from "@/lib/utils";

const fieldClassName =
  "w-full rounded-sm border border-line bg-surface px-3 text-base text-foreground placeholder:text-muted/70 transition focus-visible:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 aria-[invalid=true]:border-danger disabled:opacity-60";
const inputClassName = `min-h-12 ${fieldClassName}`;

type FieldProps = {
  id: string;
  label: string;
  hint?: string;
  error?: FieldError;
  className?: string;
  children: React.ReactNode;
};

function Field({ id, label, hint, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
        {hint ? <span className="font-normal text-muted"> ({hint})</span> : null}
      </label>
      {children}
      {error?.message ? (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

type SubmitState = { status: "idle" } | { status: "success" } | { status: "error"; message: string };

type EnquiryFormProps = {
  locale: Locale;
  /** Keeps ids unique when the inline form and the popup form are on the same page. */
  idPrefix: string;
  initialInterest?: Interest;
  productSlug?: string;
  /** Hides the interest selector, e.g. on the partner page where the form has one purpose. */
  lockInterest?: boolean;
};

export function EnquiryForm({
  locale,
  idPrefix,
  initialInterest = "purchase",
  productSlug,
  lockInterest = false,
}: EnquiryFormProps) {
  const t = getDictionary(locale);
  const f = t.form;
  const schema = useMemo(() => buildEnquirySchema(f.validation), [f.validation]);
  const [state, setState] = useState<SubmitState>({ status: "idle" });

  const product = productSlug ? getProduct(productSlug) : undefined;
  const defaultValues: EnquiryValues = {
    interest: initialInterest,
    name: "",
    phone: "",
    email: "",
    product: product?.slug ?? "",
    packaging: product ? productPackagings(product)[0] : "",
    quantity: "",
    company: "",
    area: "",
    message: "",
    consent: false,
    website: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({ resolver: zodResolver(schema), defaultValues });

  const interest = watch("interest");
  const selectedProduct = getProduct(watch("product") ?? "");
  const packagingOptions = selectedProduct ? productPackagings(selectedProduct) : getFilterOptions().packaging;
  const isOrder = ORDER_INTERESTS.includes(interest);
  const isPartner = interest === "partner";
  const id = (name: string) => `${idPrefix}-${name}`;
  const a11y = (name: keyof EnquiryValues) => ({
    id: id(name),
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${id(name)}-error` : undefined,
  });

  async function onSubmit(values: EnquiryValues) {
    setState({ status: "idle" });
    let response: Response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, locale }),
      });
    } catch {
      setState({ status: "error", message: f.networkError });
      return;
    }
    if (!response.ok) {
      setState({ status: "error", message: response.status === 429 ? f.rateLimited : f.errorBody });
      return;
    }
    setState({ status: "success" });
  }

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-sm border border-success/40 bg-surface p-6">
        <CheckCircle2 className="size-7 text-success" aria-hidden />
        <h3 className="mt-3 text-lg font-semibold text-heading">{f.successTitle}</h3>
        <p className="mt-2 text-base leading-7 text-muted">{f.successBody}</p>
        <Button
          variant="secondary"
          className="mt-5"
          onClick={() => {
            reset(defaultValues);
            setState({ status: "idle" });
          }}
        >
          {f.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <fieldset disabled={isSubmitting} className="space-y-5">
        {lockInterest ? null : (
          <Field id={id("interest")} label={f.labels.interest}>
            <select className={inputClassName} {...a11y("interest")} {...register("interest")}>
              {INTEREST_VALUES.map((value) => (
                <option key={value} value={value}>
                  {f.interests[value]}
                </option>
              ))}
            </select>
          </Field>
        )}

        {isPartner ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id("company")} label={f.labels.company} error={errors.company}>
              <input
                autoComplete="organization"
                maxLength={CONTACT_LIMITS.shortTextMax}
                placeholder={f.placeholders.company}
                className={inputClassName}
                {...a11y("company")}
                {...register("company")}
              />
            </Field>
            <Field id={id("area")} label={f.labels.area} hint={f.optional} error={errors.area}>
              <input
                maxLength={CONTACT_LIMITS.shortTextMax}
                placeholder={f.placeholders.area}
                className={inputClassName}
                {...a11y("area")}
                {...register("area")}
              />
            </Field>
          </div>
        ) : null}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id={id("name")} label={f.labels.name} error={errors.name}>
            <input
              autoComplete="name"
              maxLength={CONTACT_LIMITS.nameMax}
              placeholder={f.placeholders.name}
              className={inputClassName}
              {...a11y("name")}
              {...register("name")}
            />
          </Field>
          <Field id={id("phone")} label={f.labels.phone} error={errors.phone}>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              maxLength={CONTACT_LIMITS.phoneMax}
              placeholder={f.placeholders.phone}
              className={inputClassName}
              {...a11y("phone")}
              {...register("phone")}
            />
          </Field>
        </div>

        <Field id={id("email")} label={f.labels.email} hint={f.optional} error={errors.email}>
          <input
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.emailMax}
            placeholder={f.placeholders.email}
            className={inputClassName}
            {...a11y("email")}
            {...register("email")}
          />
        </Field>

        {isOrder ? (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id={id("product")} label={f.labels.product} hint={f.optional} className="sm:col-span-2">
              <select className={inputClassName} {...a11y("product")} {...register("product")}>
                <option value="">{f.notSelected}</option>
                {products.map((item) => (
                  <option key={item.slug} value={item.slug}>
                    {text(item.name, locale)}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={id("packaging")} label={f.labels.packaging} hint={f.optional}>
              <select className={inputClassName} {...a11y("packaging")} {...register("packaging")}>
                <option value="">{f.notSelected}</option>
                {packagingOptions.map((key) => (
                  <option key={key} value={key}>
                    {t.products.packaging[key]}
                  </option>
                ))}
              </select>
            </Field>
            <Field id={id("quantity")} label={f.labels.quantity} hint={f.optional} error={errors.quantity}>
              <input
                inputMode="numeric"
                maxLength={6}
                placeholder={f.placeholders.quantity}
                className={inputClassName}
                {...a11y("quantity")}
                {...register("quantity")}
              />
            </Field>
          </div>
        ) : null}

        <Field id={id("message")} label={f.labels.message} hint={f.optional} error={errors.message}>
          <textarea
            rows={3}
            maxLength={CONTACT_LIMITS.messageMax}
            placeholder={f.placeholders.message}
            className={cn("py-2.5", fieldClassName)}
            {...a11y("message")}
            {...register("message")}
          />
        </Field>

        <div>
          <label className="flex cursor-pointer items-start gap-3 text-sm leading-6 text-foreground">
            <input
              type="checkbox"
              className="mt-1 size-5 shrink-0 accent-[var(--accent)]"
              {...a11y("consent")}
              {...register("consent")}
            />
            <span>
              {f.consentBefore}
              <Link
                href={`/${locale}/legal/privacy`}
                target="_blank"
                className="font-medium text-heading underline underline-offset-2"
              >
                {f.consentLink}
              </Link>
              {f.consentAfter}
            </span>
          </label>
          {errors.consent?.message ? (
            <p id={`${id("consent")}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
              <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
              {errors.consent.message}
            </p>
          ) : null}
        </div>

        <div className="hidden" aria-hidden="true">
          <label htmlFor={id("website")}>Website</label>
          <input id={id("website")} tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        {state.status === "error" ? (
          <div role="alert" className="flex gap-3 rounded-sm border border-danger/40 bg-surface p-4">
            <AlertCircle className="mt-0.5 size-5 shrink-0 text-danger" aria-hidden />
            <div>
              <p className="font-semibold text-danger">{f.errorTitle}</p>
              <p className="mt-1 text-sm leading-6 text-muted">{state.message}</p>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">{f.dataNote}</p>
          <Button type="submit" loading={isSubmitting} className="w-full shrink-0 sm:w-auto">
            {isSubmitting ? f.sending : state.status === "error" ? f.retry : f.submit}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
