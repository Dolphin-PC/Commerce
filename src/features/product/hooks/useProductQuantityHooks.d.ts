import { Product } from "../type/type";
interface Props {
    productId: Product["id"];
    quantity: number;
}
interface Return {
    /** 상품 재고 수량 감소 */
    handleDecrease: (props: Props) => Promise<Product>;
    /** 상품 재고 수량 증가 */
    handleIncrease: (props: Props) => Promise<Product>;
}
/**
 * @desc 상품 재고 수량 관리 hooks
 */
export declare const useProductQuantityHooks: () => Return;
export {};
