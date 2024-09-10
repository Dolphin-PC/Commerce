import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useOrderRefundHook } from "@/features/order/hook/useOrderRefundHook";
import { useRefundHistoryHook } from "@/features/refund_history/hook/useRefundHistoryHook";
/**
 * @desc 결제완료 환불요청 Hook
 */
export const useRefundRequestHook = () => {
    /**
     * props
     *  - orderId
     */
    // 0. orderId로 Order 정보 가져오기
    // 1. Order::status 확인 ("PAY_COMPLETE_CONFIRM"인 경우에만 취소 가능)
    // 2. order.status 변경 ("REFUND_REQUEST")
    // 3. refund_history에 내역 추가
    // 4. orderDetail의 수량으로 product재고 복구
    const user = useAuthStore((state) => state.getUser());
    const { updateOrderToRefund } = useOrderRefundHook();
    const { addNewRefundHistory } = useRefundHistoryHook();
    const requestRefund = async ({ orderId }) => {
        // 0 ~ 2. 주문 상태 변경
        await updateOrderToRefund({ orderId, userId: user.id });
        // 3. refund_history에 내역 추가
        await addNewRefundHistory({ orderId });
        // 4. orderDetail의 수량으로 product재고 복구 --> 환불신청 처리 시, 재고 복구는 관리자가 수동으로 처리해야 함
        // const { data: orderDetails } = await getOrderDetails({ orderId });
        // await Promise.all(orderDetails.map((orderDetail) => handleIncrease({ productId: orderDetail.productId, quantity: orderDetail.quantity })));
    };
    return { requestRefund };
};
