import { z } from "zod";
import rawConfig from "@/content/site-config.json";

export const PRODUCT_KEYS = ["highland-reserve", "copper-bloom", "river-stone"] as const;
export type ProductKey = (typeof PRODUCT_KEYS)[number];

export const SLIDE_KEYS = ["highland", "craft", "bloom", "frost"] as const;
export type SlideKey = (typeof SLIDE_KEYS)[number];

export function isProductKey(value: string): value is ProductKey {
  return (PRODUCT_KEYS as readonly string[]).includes(value);
}

const siteConfigSchema = z.object({
  brand: z.object({
    /** Single-colour logo on a transparent background; used as a CSS mask so it can be recoloured. */
    logoImage: z.string().min(1),
    logoAspectRatio: z.number().positive(),
  }),
  hero: z.object({
    intervalMs: z.number().int().min(2000),
    slides: z
      .array(
        z.object({
          key: z.enum(SLIDE_KEYS),
          image: z.string().min(1),
          /** Logo colour that stands out on this image. */
          logoTone: z.enum(["light", "dark"]),
        }),
      )
      .min(1),
  }),
  product: z.object({
    items: z
      .array(
        z.object({
          key: z.enum(PRODUCT_KEYS),
          image: z.string().min(1),
        }),
      )
      .min(1),
  }),
  story: z.object({
    image: z.string().min(1),
  }),
  visit: z.object({
    poster: z.string().min(1),
    videoSrc: z.string().min(1).nullable(),
  }),
  process: z.object({
    backgroundImage: z.string().min(1),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse(rawConfig);
