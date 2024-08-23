

export const discountTypes = {
  PERCENT: "PERCENT",
  COST: "COST",
} as const;

export type DISCOUNT_TYPE = (typeof discountTypes)[keyof typeof discountTypes];

