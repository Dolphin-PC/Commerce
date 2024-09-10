import { getOrder } from "../api/get-order";
import { usePutOrderMutation } from "../api/put-order";
/**
 * @desc 주문: 환불 Hook
 */
export const useOrderRefundHook = () => {
    const putOrderMutation = usePutOrderMutation();
    const updateOrderToRefund = async ({ orderId, userId }) => {
        // 0. orderId로 Order 정보 가져오기
        const order = await getOrder({ orderId, userId });
        // 1. Order::status 확인 ("PAY_COMPLETE_CONFIRM"인 경우에만 취소 가능)
        if (order.status !== "PAY_COMPLETE_CONFIRM") {
            throw new Error("환불 요청이 불가능한 주문입니다.");
        }
        // 2. order.status 변경 ("REFUND_REQUEST")
        const updatedOrder = await putOrderMutation.mutateAsync({ id: orderId, update: { status: "REFUND_REQUEST" } });
        return updatedOrder;
    };
    return { updateOrderToRefund };
};
