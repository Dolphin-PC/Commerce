import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
/**
 * @desc 장바구니 추가
 */
interface Props {
    productId: Product["id"];
    userId: User["id"];
    quantity: Product["quantity"];
}
export declare const useCartPost: () => import("@tanstack/react-query").UseMutationResult<{
    createdAt: string;
    id: number;
    productId: number;
    quantity: number;
    userId: string;
}, Error, Props, unknown>;
export {};
