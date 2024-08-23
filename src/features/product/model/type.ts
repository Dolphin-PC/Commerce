import { Tables } from "@/entities/@db/database-generated.type";
import { Category } from "@/features/category/model/type";





export type Product = Tables<"product">
export type ProductCategory = Product & {
  category : Category | null;
}






export const discountTypes = {
  PERCENT: "PERCENT",
  COST: "COST",
} as const;

export type DISCOUNT_TYPE = (typeof discountTypes)[keyof typeof discountTypes];


