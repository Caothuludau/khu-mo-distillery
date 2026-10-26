import { z } from "zod";
import rawConfig from "@/content/site-config.json";

export const PRODUCT_KEYS = ["highland-reserve", "copper-bloom", "river-stone"] as const;
export type ProductKey = (typeof PRODUCT_KEYS)[number];

export const GALLERY_KEYS = [
  "distillery",
  "highland-dusk",
  "copper-blossom",
  "river-frost",
  "brand",
] as const;
export type GalleryKey = (typeof GALLERY_KEYS)[number];

export function isProductKey(value: string): value is ProductKey {
  return (PRODUCT_KEYS as readonly string[]).includes(value);
}

const siteConfigSchema = z.object({
  hero: z.object({
    logoImage: z.string().min(1),
  }),
  story: z.object({
    image: z.string().min(1),
  }),
  product: z.object({
    items: z.array(
      z.object({
        key: z.enum(PRODUCT_KEYS),
        image: z.string().min(1),
      }),
    ),
  }),
  process: z.object({
    backgroundImage: z.string().min(1),
  }),
  gallery: z.object({
    items: z
      .array(
        z.object({
          key: z.enum(GALLERY_KEYS),
          image: z.string().min(1),
          fit: z.enum(["cover", "contain"]).default("cover"),
        }),
      )
      .min(1),
  }),
  contact: z.object({
    backgroundImage: z.string().min(1),
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;

export const siteConfig: SiteConfig = siteConfigSchema.parse(rawConfig);
