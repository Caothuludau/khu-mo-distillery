import type { PaletteKey } from "@/lib/products";

/** Product-line palettes from the design spec (§4.3 B); used for placeholders and colour chips. */
export const PALETTES: Record<PaletteKey, { swatches: string[]; gradient: string }> = {
  navy: {
    swatches: ["#152844", "#2f5d9a", "#ffffff"],
    gradient: "linear-gradient(160deg, #2f5d9a 0%, #152844 60%, #0e1b2e 100%)",
  },
  plum: {
    swatches: ["#5b2340", "#b89452", "#c9822b"],
    gradient: "linear-gradient(160deg, #c9822b 0%, #5b2340 55%, #2e1020 100%)",
  },
};
