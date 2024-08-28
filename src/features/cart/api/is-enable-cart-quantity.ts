import { getProduct } from "@/features/product/api/get-product";
import { Cart } from "../type";
import { Product } from "@/features/product/type/type";

interface Props {
  productId: Product["id"];
  newQuantity: Cart["quantity"];
}

/**
 * @desc 장바구니 수량이 가능한지 체크
 */
export const isEnableCartQuantity = async ({ productId, newQuantity }: Props): Promise<boolean> => {
  const product = await getProduct({ id: productId });
  if (product.quantity < newQuantity) return false;
  return true;
};
