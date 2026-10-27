import { z } from "zod";
import { PACKAGING_KEYS } from "@/lib/products";

export const INTEREST_VALUES = ["purchase", "bulk", "partner", "visit", "general"] as const;
export type Interest = (typeof INTEREST_VALUES)[number];

export function isInterest(value: string | null | undefined): value is Interest {
  return !!value && (INTEREST_VALUES as readonly string[]).includes(value);
}

/** Interests that are about specific products, so the form asks for product, packaging and quantity. */
export const ORDER_INTERESTS: readonly Interest[] = ["purchase", "bulk"];

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  phoneMin: 8,
  phoneMax: 20,
  shortTextMax: 120,
  quantityMax: 100000,
  messageMax: 2000,
} as const;

export type EnquiryMessages = {
  name: string;
  phone: string;
  email: string;
  quantity: string;
  company: string;
  consent: string;
  tooLong: string;
};

const PHONE_PATTERN = /^\+?[\d\s.()-]+$/;

const optionalText = (max: number, message: string) =>
  z.string().trim().max(max, message).optional().or(z.literal(""));

/** Shared by the browser form and the API route so both validate the same rules. */
export function buildEnquirySchema(messages: EnquiryMessages) {
  return z
    .object({
      interest: z.enum(INTEREST_VALUES),
      name: z
        .string()
        .trim()
        .min(CONTACT_LIMITS.nameMin, messages.name)
        .max(CONTACT_LIMITS.nameMax, messages.name),
      phone: z
        .string()
        .trim()
        .min(CONTACT_LIMITS.phoneMin, messages.phone)
        .max(CONTACT_LIMITS.phoneMax, messages.phone)
        .regex(PHONE_PATTERN, messages.phone),
      email: z
        .string()
        .trim()
        .max(CONTACT_LIMITS.emailMax, messages.email)
        .email(messages.email)
        .optional()
        .or(z.literal("")),
      product: optionalText(CONTACT_LIMITS.shortTextMax, messages.tooLong),
      packaging: z.enum(PACKAGING_KEYS).optional().or(z.literal("")),
      quantity: z
        .string()
        .trim()
        .regex(/^\d*$/, messages.quantity)
        .refine((value) => value === "" || Number(value) <= CONTACT_LIMITS.quantityMax, messages.quantity)
        .optional(),
      company: optionalText(CONTACT_LIMITS.shortTextMax, messages.tooLong),
      area: optionalText(CONTACT_LIMITS.shortTextMax, messages.tooLong),
      message: optionalText(CONTACT_LIMITS.messageMax, messages.tooLong),
      consent: z.boolean().refine((value) => value, messages.consent),
      website: z.string().optional(),
    })
    .refine((values) => values.interest !== "partner" || !!values.company?.trim(), {
      path: ["company"],
      message: messages.company,
    });
}

export type EnquiryValues = z.infer<ReturnType<typeof buildEnquirySchema>>;
