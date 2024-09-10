import { Order } from "../type";
/**
 * @desc 주문 delete API
 */
interface Props {
    id: Order["id"];
}
export declare const useDeleteOrder: () => import("@tanstack/react-query").UseMutationResult<void, Error, Props, unknown>;
export {};
