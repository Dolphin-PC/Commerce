import { getPayment } from "@/features/@portOne/get-payment";
import { usePutOrderMutation } from "@/features/order/api/put-order";
import { usePutPayHistoryMutation } from "@/features/pay_history/api/put-pay_history";
import { PayHistory } from "@/features/pay_history/type";
import { getOrderByPaymentId } from "../api/get-orderByPaymentId";
import { Order } from "@/features/order/type";

interface Props {}

interface Return {
  getOrder: (paymentId: PayHistory["paymentId"]) => Promise<Order>;
  handleConfirmOrder: (paymentId: PayHistory["paymentId"]) => Promise<void>;
}

/**
 * @desc 결제 검증 후, 주문 완료처리
 */
export const useConfirmOrder = () => {
  const putPayHistoryMutation = usePutPayHistoryMutation();
  const putOrderMutation = usePutOrderMutation();

  const getOrder = async (paymentId: PayHistory["paymentId"]): Promise<Order> => {
    const order = await getOrderByPaymentId({ paymentId });
    return order;
  };

  const handleConfirmOrder = async (paymentId: PayHistory["paymentId"]): Promise<void> => {
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
    }
  };

  return {
    getOrder,
    handleConfirmOrder,
  };
};
