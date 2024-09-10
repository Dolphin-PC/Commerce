import { OrderDetail, OrderDetailUpdate } from "../type";
/**
 * @desc 주문 상세 update API
 */
interface Props {
    id: OrderDetail["id"];
    update: OrderDetailUpdate;
}
interface Return extends OrderDetail {
}
export declare const usePutOrderDetail: () => import("@tanstack/react-query").UseMutationResult<Return, Error, Props, unknown>;
export {};
