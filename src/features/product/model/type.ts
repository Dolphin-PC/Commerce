import { Category } from "@/features/category/model/type";
import { Tables } from "@/shared/config/@db/database-generated.type";





export type Product = Tables<"product">
export type ProductCategory = Product & {
  category : Category | null;
}






export const discountTypes = {
  PERCENT: "PERCENT",
  COST: "COST",
} as const;

export type DISCOUNT_TYPE = (typeof discountTypes)[keyof typeof discountTypes];


