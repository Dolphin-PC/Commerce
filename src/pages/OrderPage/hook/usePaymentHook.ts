import { genOrderName } from "@/features/@portOne/gen-order-name";
import { requestPayment } from "@/features/@portOne/requestPayment";
import { useDeleteOrder } from "@/features/order/api/delete-order";
import { usePutOrder } from "@/features/order/api/put-order";
import { Order } from "@/features/order/type";
import { useDeleteOrderDetail } from "@/features/order_detail/api/delete-order_detail";
import { OrderDetail } from "@/features/order_detail/type";
import { usePostPayHistoryMutation } from "@/features/pay_history/api/post-pay_history";
import { useProductQuantityHooks } from "@/features/product/hooks/useProductQuantityHooks";
import { Product } from "@/features/product/type/type";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  orderId: Order["id"];
  orderDetails: (OrderDetail & { product: Product })[];
}

interface Return {
  handlePayment: () => Promise<void>;
  cancelPayment: () => Promise<void>;

  shipAddress: string;
  setShipAddress: React.Dispatch<React.SetStateAction<string>>;

  totalPrice: number;

  isConfirmOrder: boolean;
  setIsConfirmOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @desc 결제 Hook
 */
export const usePaymentHook = ({ orderId, orderDetails }: Props): Return => {
  const navigate = useNavigate();

  const [isConfirmOrder, setIsConfirmOrder] = useState(false);
  const [shipAddress, setShipAddress] = useState("");

  const totalPrice = useMemo(() => {
    return orderDetails.reduce((acc, cur) => {
      if (cur.product === null) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);
  }, [orderDetails]);

  const putOrderMutation = usePutOrder();
  const postPayHisttoryMutation = usePostPayHistoryMutation();
  const { handleIncrease } = useProductQuantityHooks();
  const deleteOrderMutation = useDeleteOrder();
  const deleteOrderDetailMutation = useDeleteOrderDetail();

  const handlePayment = async () => {
    if (!isConfirmOrder) {
      alert("주문 내용을 확인해주세요.");
      return;
    }
    if (shipAddress === "") {
      alert("배송지를 입력해주세요.");
      return;
    }
    const products: Product[] = orderDetails.map((orderDetail) => orderDetail.product);

    // 결제 요청
    const res = await requestPayment({
      orderName: genOrderName({ products }),
      totalAmount: totalPrice,
      channelType: "TOSS",
      payMethod: "CARD",
      redirectUrl: `${window.location.origin}${ROUTES.ORDERS_REDIRECT}`,
    }).catch((e) => {
      throw e;
    });

    // 결제 오류 응답시
    if (res.code) {
      toast({ title: "결제 오류", description: res.message });
      console.error(res);
      navigate(ROUTES.ORDERS_REDIRECT_({ paymentId: res.paymentId, code: res.code, message: res.message }));
      return;
    }

    // 결제 완료시, order 테이블 업데이트
    await putOrderMutation.mutateAsync({
      id: orderId,
      update: {
        shipAddress,
        status: "PAY_COMPLETE",
        orderName: res.orderName,
      },
    });

    // pay_history insert
    await postPayHisttoryMutation.mutateAsync({
      insert: {
        orderId,
        paymentId: res.paymentId,
      },
    });

    navigate(ROUTES.ORDERS_REDIRECT_({ paymentId: res.paymentId }));
  };

  const cancelPayment = async () => {
    // order status: PAY_CANCEL로 변경 (status를 변경해두면, quantity 복구되고, order삭제 오류가 발생해도 order를 사용못하게 할 수 있음)
    await putOrderMutation.mutateAsync({ id: orderId, update: { status: "PAY_CANCEL" } });

    // product quantity 복구
    await Promise.all(orderDetails.map((orderDetail) => handleIncrease({ productId: orderDetail.productId, quantity: orderDetail.quantity })));

    // order_detail 삭제
    await Promise.all(orderDetails.map((orderDetail) => deleteOrderDetailMutation.mutateAsync({ id: orderDetail.id })));

    // order 삭제
    await deleteOrderMutation.mutateAsync({ id: orderId });
  };

  return {
    handlePayment,
    cancelPayment,
    shipAddress,
    isConfirmOrder,
    setIsConfirmOrder,
    setShipAddress,
    totalPrice,
  };
};
