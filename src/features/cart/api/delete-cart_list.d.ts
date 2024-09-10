import { Cart } from "../type";
/**
 * @desc 장바구니 목록 삭제
 */
interface Props {
    ids: Cart["id"][];
}
export declare const useDeleteCartList: () => import("@tanstack/react-query").UseMutationResult<void, Error, Props, unknown>;
export {};
