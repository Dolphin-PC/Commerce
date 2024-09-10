import { getProduct } from "@/features/product/api/get-product";
/**
 * @desc 장바구니 수량이 가능한지 체크
 */
export const isEnableCartQuantity = async ({ productId, newQuantity }) => {
    const product = await getProduct({ id: productId });
    if (product.quantity < newQuantity)
        return false;
    return true;
};
