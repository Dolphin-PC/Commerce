const SECRET_KEY = import.meta.env.VITE_PORTONE_SECRET_KEY;
/**
 * @desc 결제 단건 조회 API
 * @see https://developers.portone.io/api/rest-v2/payment?v=v2#get%20%2Fpayments%2F%7BpaymentId%7D
 */
export const getPayment = async (paymentId) => {
    const res = await fetch(`https://api.portone.io/payments/${paymentId}`, {
        method: "GET",
        headers: {
            Authorization: `PortOne ${SECRET_KEY}`,
        },
    });
    if (!res.ok)
        throw new Error("결제 조회에 실패했습니다.");
    const data = await res.json();
    return data;
};
