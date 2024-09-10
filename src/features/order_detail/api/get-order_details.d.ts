import { OrderDetail } from "../type";
/**
 * @desc 주문 상세 get API
 */
interface Props {
    orderId: number;
}
interface Return extends OrderDetail {
}
export declare const getOrderDetails: ({ orderId }: Props) => Promise<Return[]>;
export {};
