import { getPayHistory } from "@/features/pay_history/api/get-pay_history";
import { usePostRefundHistoryMutation } from "../api/post-refund_history";
/**
 * @desc 환불내역 Hook
 */
export const useRefundHistoryHook = () => {
    const postRefundMutation = usePostRefundHistoryMutation();
    const addNewRefundHistory = async ({ orderId }) => {
        // pay_history에서 payHistoryId 조회
        const payHistory = await getPayHistory({ orderId });
        // 3. refund_history에 내역 추가
        const res = await postRefundMutation.mutateAsync({ inserts: [{ payHistoryId: payHistory.id }] });
        return res;
    };
    return { addNewRefundHistory };
};
