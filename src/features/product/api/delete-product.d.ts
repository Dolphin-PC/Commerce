/**
 * 제품 삭제
 */
import { Product } from "../type/type";
interface Props {
    productId: Product["id"];
}
export declare const useDeleteProduct: () => import("@tanstack/react-query").UseMutationResult<number, Error, Props, unknown>;
export {};
