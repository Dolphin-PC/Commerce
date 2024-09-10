import { Order, OrderInsert } from "../type";
/**
 * @desc 주문 insert API
 */
interface Props {
    insert: OrderInsert;
}
interface Return extends Order {
}
export declare const usePostOrder: () => import("@tanstack/react-query").UseMutationResult<Return, Error, Props, unknown>;
export {};
