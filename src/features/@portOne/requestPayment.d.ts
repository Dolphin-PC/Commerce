import { PaymentRequest } from "@portone/browser-sdk/v2";
import { type PaymentResponse } from "@portone/browser-sdk/v2";
import { ChannelType, PayMethod } from "../pay_history/type";
interface Props {
    orderName: string;
    totalAmount: PaymentRequest["totalAmount"];
    payMethod: PayMethod;
    channelType: ChannelType;
    redirectUrl: PaymentRequest["redirectUrl"];
}
/**
 * @see https://developers.portone.io/opi/ko/integration/v2-sdk/payment-response?v=v2
 */
interface Return extends PaymentResponse {
    paymentId: string;
    orderName: string;
    totalAmount: number;
    currency: "CURRENCY_KRW";
    /** 결제 방법 */
    payMethod: PayMethod;
    /** 결제 PG사 */
    channelType: ChannelType;
}
/**
 * @desc 아임포트 결제 요청
 */
export declare const requestPayment: ({ orderName, totalAmount, payMethod, channelType, redirectUrl }: Props) => Promise<Return>;
export {};
