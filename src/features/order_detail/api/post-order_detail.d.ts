import { OrderDetail, OrderDetailInsert } from "../type";
/**
 * @desc 주문 상세 insert API
 */
interface Props {
    insert: OrderDetailInsert;
}
interface Return extends OrderDetail {
}
export declare const usePostOrderDetail: () => import("@tanstack/react-query").UseMutationResult<Return, Error, Props, unknown>;
export {};
