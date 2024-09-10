import { Cart } from "../type";
import { Product } from "@/features/product/type/type";
interface Props {
    productId: Product["id"];
    newQuantity: Cart["quantity"];
}
/**
 * @desc 장바구니 수량이 가능한지 체크
 */
export declare const isEnableCartQuantity: ({ productId, newQuantity }: Props) => Promise<boolean>;
export {};
