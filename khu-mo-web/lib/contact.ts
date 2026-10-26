export const INTEREST_VALUES = ["general", "product", "events", "trade"] as const;
export type Interest = (typeof INTEREST_VALUES)[number];

export function isInterest(value: string | null | undefined): value is Interest {
  return !!value && (INTEREST_VALUES as readonly string[]).includes(value);
}

export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 100,
  emailMax: 254,
  phoneMax: 30,
  messageMin: 10,
  messageMax: 5000,
} as const;
