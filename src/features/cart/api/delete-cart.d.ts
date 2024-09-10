import { Cart } from "../type";
/**
 * @desc 장바구니 삭제
 */
interface Props {
    id: Cart["id"];
}
export declare const useDeleteCart: () => import("@tanstack/react-query").UseMutationResult<void, Error, Props, unknown>;
export {};
