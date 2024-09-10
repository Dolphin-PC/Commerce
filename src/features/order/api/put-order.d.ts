import { Order, OrderUpdate } from "../type";
/**
 * @desc 주문 update API
 */
interface Props {
    id: Order["id"];
    update: OrderUpdate;
}
interface Return extends Order {
}
export declare const usePutOrderMutation: () => import("@tanstack/react-query").UseMutationResult<Return, Error, Props, unknown>;
export {};
