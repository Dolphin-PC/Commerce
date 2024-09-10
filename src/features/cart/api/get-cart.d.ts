import { Cart } from "../type";
/**
 * @desc 장바구니 단건 조회
 */
interface Props {
    id: Cart["id"];
}
export declare const useCartQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<{
    createdAt: string;
    id: number;
    productId: number;
    quantity: number;
    userId: string;
}, Error>;
export {};
