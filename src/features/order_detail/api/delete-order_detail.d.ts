import { OrderDetail } from "../type";
/**
 * @desc 주문 상세 delete API
 */
interface Props {
    id: OrderDetail["id"];
}
export declare const useDeleteOrderDetail: () => import("@tanstack/react-query").UseMutationResult<void, Error, Props, unknown>;
export {};
