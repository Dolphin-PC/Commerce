import { getProductQuantity } from "../api/get-product-quantity";
import { useProductPut } from "../api/put-product";
/**
 * @desc 상품 재고 수량 관리 hooks
 */
export const useProductQuantityHooks = () => {
    const { mutateAsync } = useProductPut();
    const handleDecrease = async ({ productId, quantity }) => {
        return new Promise(async (resolve, reject) => {
            // 재고 수량 확인
            const { quantity: productQuantity } = await getProductQuantity({ id: productId });
            const newQuantity = productQuantity - quantity;
            if (newQuantity < 0) {
                reject("재고 수량이 부족합니다.");
                return;
            }
            // 상품 재고 감소
            const updatedProduct = await mutateAsync({ id: productId, update: { quantity: newQuantity } });
            resolve(updatedProduct);
        });
    };
    const handleIncrease = async ({ productId, quantity }) => {
        return new Promise(async (resolve) => {
            // 재고 수량 확인
            const { quantity: productQuantity } = await getProductQuantity({ id: productId });
            const newQuantity = productQuantity + quantity;
            // 상품 재고 증가
            const updatedProduct = await mutateAsync({ id: productId, update: { quantity: newQuantity } });
            resolve(updatedProduct);
        });
    };
    return {
        handleDecrease,
        handleIncrease,
    };
};
