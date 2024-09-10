import PortOne from "@portone/browser-sdk/v2";
const STORE_ID = import.meta.env.VITE_STORE_ID;
const CHANNEL_KEY = {
    TOSS: import.meta.env.VITE_CHANNEL_KEY_TOSS,
};
/**
 * @desc 아임포트 결제 요청
 */
export const requestPayment = async ({ orderName, totalAmount, payMethod, channelType, redirectUrl }) => {
    if (totalAmount <= 0)
        throw new Error("결제 금액은 0원 이상이어야 합니다.");
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
        redirectUrl,
    });
    if (response === undefined)
        throw new Error("결제 응답처리에 실패했습니다.");
    if (response.code)
        throw new Error(response.message);
    if (response.paymentId !== reqPaymentId)
        throw new Error("결제 ID 불일치");
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
