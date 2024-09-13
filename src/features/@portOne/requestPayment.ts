import PortOne, { PaymentRequest } from "@portone/browser-sdk/v2";
import { type PaymentResponse } from "@portone/browser-sdk/v2";
import { ChannelType, PayMethod } from "../pay_history/type";

const STORE_ID = import.meta.env.VITE_STORE_ID as string;
const CHANNEL_KEY = {
  TOSS: import.meta.env.VITE_CHANNEL_KEY_TOSS as string,
};

interface Props {
  orderName: string;
  totalAmount: PaymentRequest["totalAmount"];
  payMethod: PayMethod;
  channelType: ChannelType;
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
export const requestPayment = async ({ orderName, totalAmount, payMethod, channelType }: Props): Promise<Return> => {
  if (totalAmount <= 0) throw new Error("결제 금액은 0원 이상이어야 합니다.");
  const reqPaymentId = `payment-${crypto.randomUUID()}`;

  const response = await PortOne.requestPayment({
    // Store ID 설정
    storeId: STORE_ID,
    // 채널 키 설정
    channelKey: CHANNEL_KEY[channelType],
    paymentId: reqPaymentId,
    orderName,
    totalAmount,
    currency: "CURRENCY_KRW",
    payMethod,
  });

  if (response === undefined) throw new Error("결제 응답처리에 실패했습니다.");
  if (response.code) throw new Error(response.message);
  if (response.paymentId !== reqPaymentId) throw new Error("결제 ID 불일치");

  return {
    ...response,
    paymentId: response.paymentId,
    orderName,
    totalAmount,
    currency: "CURRENCY_KRW",
    payMethod,
    channelType,
  };
};
