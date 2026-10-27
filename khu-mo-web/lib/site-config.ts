import { z } from "zod";
import rawConfig from "@/content/site-config.json";

export const SLIDE_KEYS = ["brand", "distillery", "product"] as const;
export type SlideKey = (typeof SLIDE_KEYS)[number];

const optionalText = z.string().trim().min(1).nullable();

const siteConfigSchema = z.object({
  brand: z.object({
    /** Single-colour logo on a transparent background; used as a CSS mask so it can be recoloured. */
    logoImage: z.string().min(1),
    logoAspectRatio: z.number().positive(),
  }),
  company: z.object({
    name: z.string().min(1),
    address: z.string().min(1),
    phone: optionalText,
    email: optionalText,
    taxCode: optionalText,
    facebookUrl: optionalText,
  }),
  hero: z.object({
    intervalMs: z.number().int().min(2000),
    slides: z
      .array(
        z.object({
          key: z.enum(SLIDE_KEYS),
          image: z.string().min(1),
          /** Logo and caption colour that stands out on this image. */
          logoTone: z.enum(["light", "dark"]),
          /** Locale-relative link for the slide's call to action, e.g. "/story". */
          href: z.string().startsWith("/"),
        }),
      )
      .min(1),
  }),
  story: z.object({
    image: z.string().min(1),
  }),
  process: z.object({
    image: z.string().min(1),
  }),
  salesPoints: z.array(
    z.object({
      name: z.string().min(1),
      address: z.string().min(1),
      phone: optionalText,
      hours: optionalText,
      type: z.enum(["distillery", "store", "agent"]),
    }),
  ),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SalesPoint = SiteConfig["salesPoints"][number];

export const siteConfig: SiteConfig = siteConfigSchema.parse(rawConfig);

/** `tel:` link for a display phone number such as "0912 345 678". */
export function toTelHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function toMapsHref(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
