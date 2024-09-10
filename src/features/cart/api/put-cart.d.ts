import { Cart } from "../type";
/**
 * @desc 장바구니 상품 수량 업데이트
 */
interface Props {
    cart: Cart;
    newQuantity: number;
}
export declare const usePutCart: () => import("@tanstack/react-query").UseMutationResult<{
    createdAt: string;
    id: number;
    productId: number;
    quantity: number;
    userId: string;
}, Error, Props, unknown>;
export {};
