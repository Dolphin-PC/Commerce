import { PayHistory } from "@/features/pay_history/type";
import { Order } from "@/features/order/type";
interface Return {
    getOrder: (paymentId: PayHistory["paymentId"]) => Promise<Order>;
    handleConfirmOrder: (paymentId: PayHistory["paymentId"]) => Promise<void>;
}
/**
 * @desc 결제 검증 후, 주문 완료처리
 */
export declare const useConfirmOrder: () => Return;
export {};
