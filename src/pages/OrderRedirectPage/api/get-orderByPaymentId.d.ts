import { Order } from "@/features/order/type";
import { PayHistory } from "@/features/pay_history/type";
/**
 * @desc paymentId로 주문 조회
 */
interface Props {
    paymentId: PayHistory["paymentId"];
}
interface Return extends Order {
}
export declare const getOrderByPaymentId: ({ paymentId }: Props) => Promise<Return>;
export {};
