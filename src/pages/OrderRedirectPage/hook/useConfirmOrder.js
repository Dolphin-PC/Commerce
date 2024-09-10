import { getPayment } from "@/features/@portOne/get-payment";
import { usePutOrderMutation } from "@/features/order/api/put-order";
import { usePutPayHistoryMutation } from "@/features/pay_history/api/put-pay_history";
import { getOrderByPaymentId } from "../api/get-orderByPaymentId";
import { usePutOrderDetail } from "@/features/order_detail/api/put-order_detail";
import { getOrderDetails } from "@/features/order_detail/api/get-order_details";
/**
 * @desc 결제 검증 후, 주문 완료처리
 */
export const useConfirmOrder = () => {
    const putPayHistoryMutation = usePutPayHistoryMutation();
    const putOrderMutation = usePutOrderMutation();
    const putOrderDetailMutation = usePutOrderDetail();
    const getOrder = async (paymentId) => {
        const order = await getOrderByPaymentId({ paymentId });
        return order;
    };
    const handleConfirmOrder = async (paymentId) => {
        const paymentRes = await getPayment(paymentId);
        if (paymentRes.status === "PAID") {
            // pay_history 금액 업데이트
            const updatedPayHistory = await putPayHistoryMutation.mutateAsync({
                paymentId,
                update: {
                    payAmount: paymentRes.amount.paid,
                },
            });
            // order: PAY_COMPLETE_CONFIRM
            await putOrderMutation.mutateAsync({
                id: updatedPayHistory.orderId,
                update: {
                    status: "PAY_COMPLETE_CONFIRM",
                },
            });
            // order_detail: ORDER_COMPLETE
            const orderDetails = await getOrderDetails({ orderId: updatedPayHistory.orderId });
            await Promise.all(orderDetails.map((orderDetail) => putOrderDetailMutation.mutateAsync({
                id: orderDetail.id,
                update: {
                    status: "ORDER_COMPLETE",
                },
            })));
        }
    };
    return {
        getOrder,
        handleConfirmOrder,
    };
};
