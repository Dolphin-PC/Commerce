import PortOne from "@portone/browser-sdk/v2";
import { type PaymentResponse } from "@portone/browser-sdk/v2";

const STORE_ID = import.meta.env.VITE_STORE_ID as string;
const CHANNEL_KEY = {
  TOSS: import.meta.env.VITE_CHANNEL_KEY_TOSS as string,
};

interface Props {
  orderName: string;
  totalAmount: number;
}

/**
 * @see https://developers.portone.io/opi/ko/integration/v2-sdk/payment-response?v=v2
 */
interface Return extends PaymentResponse {}

/**
 * @desc 아임포트 결제 요청
 */
export const requestPayment = async ({ orderName, totalAmount }: Props): Promise<Return> => {
  if (totalAmount <= 0) throw new Error("결제 금액은 0원 이상이어야 합니다.");

  const response = await PortOne.requestPayment({
    // Store ID 설정
    storeId: STORE_ID,
    // 채널 키 설정
    channelKey: CHANNEL_KEY.TOSS,
    paymentId: `payment-${crypto.randomUUID()}`,
    orderName: orderName,
    totalAmount: totalAmount,
    currency: "CURRENCY_KRW",
    payMethod: "CARD",
  });

  if (response === undefined) throw new Error("결제 응답처리에 실패했습니다.");
  if (response.code) throw new Error(response.message);

  return response;
};
