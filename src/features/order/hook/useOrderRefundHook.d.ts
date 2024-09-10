import { User } from "@/features/user/model/type";
import { Order } from "../type";
interface Return {
    updateOrderToRefund: ({ orderId, userId }: {
        orderId: Order["id"];
        userId: User["id"];
    }) => Promise<Order>;
}
/**
 * @desc 주문: 환불 Hook
 */
export declare const useOrderRefundHook: () => Return;
export {};
