interface Return {
    /** paymentId */
    id: string;
    status: "PAID" | "CANCELED" | "FAILED" | "PAY_PENDING";
    /** 결제 건 포트원 채번 아이디 */
    transactionId: string;
    /** 결제일시 */
    paidAt: string;
    amount: {
        paid: number;
    };
}
/**
 * @desc 결제 단건 조회 API
 * @see https://developers.portone.io/api/rest-v2/payment?v=v2#get%20%2Fpayments%2F%7BpaymentId%7D
 */
export declare const getPayment: (paymentId: string) => Promise<Return>;
export {};
