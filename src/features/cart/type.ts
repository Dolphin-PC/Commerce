import { Tables } from "@/shared/config/@db/database-generated.type";
import { ProductCategory } from "../product/type/type";

export type Cart = Tables<"cart">;
export type CartProductCategory = Cart & {
  product: ProductCategory | null;
};
