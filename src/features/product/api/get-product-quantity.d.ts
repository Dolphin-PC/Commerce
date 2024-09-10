import { Product } from "../type/type";
/**
 * 상품 수량 조회 API
 */
interface Props {
    id: Product["id"];
    sellerId?: Product["sellerId"];
}
interface Return {
    quantity: Product["quantity"];
}
export declare const getProductQuantity: ({ id, sellerId }: Props) => Promise<Return>;
export declare const useProductQuantity: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};
