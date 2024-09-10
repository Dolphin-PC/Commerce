import { PayHistory } from "@/features/pay_history/type";
import { RefundHistory } from "../type";
interface Return {
    addNewRefundHistory: ({ orderId }: {
        orderId: PayHistory["orderId"];
    }) => Promise<RefundHistory[]>;
}
/**
 * @desc 환불내역 Hook
 */
export declare const useRefundHistoryHook: () => Return;
export {};
