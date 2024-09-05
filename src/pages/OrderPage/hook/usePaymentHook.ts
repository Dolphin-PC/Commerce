import { genOrderName } from "@/features/@portOne/gen-order-name";
import { requestPayment } from "@/features/@portOne/requestPayment";
import { usePutOrder } from "@/features/order/api/put-order";
import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { usePostPayHistoryMutation } from "@/features/pay_history/api/post-pay_history";
import { Product } from "@/features/product/type/type";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  orderId: Order["id"];
  orderDetail: (OrderDetail & { product: Product })[];
}

interface Return {
  handlePayment: () => Promise<void>;

  shipAddress: string;
  setShipAddress: React.Dispatch<React.SetStateAction<string>>;

  totalPrice: number;

  isConfirmOrder: boolean;
  setIsConfirmOrder: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 * @desc 결제 Hook
 */
export const usePaymentHook = ({ orderId, orderDetail }: Props): Return => {
  const navigate = useNavigate();

  const [isConfirmOrder, setIsConfirmOrder] = useState(false);
  const [shipAddress, setShipAddress] = useState("");

  const totalPrice = useMemo(() => {
    return orderDetail.reduce((acc, cur) => {
      if (cur.product === null) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);
  }, [orderDetail]);

  const putOrderMutation = usePutOrder();

  const handlePayment = async () => {
    if (!isConfirmOrder) {
      alert("주문 내용을 확인해주세요.");
      return;
    }
    if (shipAddress === "") {
      alert("배송지를 입력해주세요.");
      return;
    }
    const products: Product[] = orderDetail.map((orderDetail) => orderDetail.product);

    // 결제 요청
    const res = await requestPayment({
      orderName: genOrderName({ products }),
      totalAmount: totalPrice,
      channelType: "TOSS",
      payMethod: "CARD",
      redirectUrl: `${window.location.origin}${ROUTES.ORDERS_REDIRECT}`,
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

    navigate(ROUTES.ORDERS_REDIRECT_({ paymentId: res.paymentId }));
  };

  return {
    handlePayment,
    shipAddress,
    isConfirmOrder,
    setIsConfirmOrder,
    setShipAddress,
    totalPrice,
  };
};
