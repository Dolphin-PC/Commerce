import { Order } from "@/features/order/type";
interface Return {
    requestRefund: ({ orderId }: {
        orderId: Order["id"];
    }) => Promise<void>;
}
/**
 * @desc 결제완료 환불요청 Hook
 */
export declare const useRefundRequestHook: () => Return;
export {};
