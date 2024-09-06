import { getPayHistory } from "@/features/pay_history/api/get-pay_history";
import { PayHistory } from "@/features/pay_history/type";
import { usePostRefundHistoryMutation } from "../api/post-refund_history";
import { RefundHistory } from "../type";

interface Return {
  addNewRefundHistory: ({ orderId }: { orderId: PayHistory["orderId"] }) => Promise<RefundHistory[]>;
}

/**
 * @desc 환불내역 Hook
 */
export const useRefundHistoryHook = (): Return => {
  const postRefundMutation = usePostRefundHistoryMutation();

  const addNewRefundHistory = async ({ orderId }: { orderId: PayHistory["orderId"] }) => {
    // pay_history에서 payHistoryId 조회
    const payHistory = await getPayHistory({ orderId });

    // 3. refund_history에 내역 추가
    const res = await postRefundMutation.mutateAsync({ inserts: [{ payHistoryId: payHistory.id }] });
    return res;
  };

  return { addNewRefundHistory };
};
