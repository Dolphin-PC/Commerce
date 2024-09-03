import { Category } from "@/features/category/model/type";
import { Enums, Tables, TablesInsert, TablesUpdate } from "@/shared/config/@db/database-generated.type";

export type Product = Tables<"product">;
export type ProductInsert = TablesInsert<"product">;
export type ProductUpdate = TablesUpdate<"product">;

export type ProductCategory = Product & {
  category: Category | null;
};

export type Product_Quantity = Omit<Product, "quantity">;
export type ProductCategory_Quantity = Omit<ProductCategory, "quantity">;

export const discountTypes: Record<Enums<"DISCOUNT_TYPE">, Enums<"DISCOUNT_TYPE">> = {
  NONE: "NONE",
  PERCENT: "PERCENT",
  COST: "COST",
} as const;
