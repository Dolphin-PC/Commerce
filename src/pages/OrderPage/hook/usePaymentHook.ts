import { genOrderName } from "@/features/@portOne/gen-order-name";
import { requestPayment } from "@/features/@portOne/requestPayment";
import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { usePostPayHistoryMutation } from "@/features/pay_history/api/post-pay_history";
import { Product } from "@/features/product/type/type";
import { toast } from "@/shared/components/ui/use-toast";
import { useMemo, useState } from "react";

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
  const [isConfirmOrder, setIsConfirmOrder] = useState(false);

  const [shipAddress, setShipAddress] = useState("");

  const totalPrice = useMemo(() => {
    return orderDetail.reduce((acc, cur) => {
      if (cur.product === null) return acc;
      return acc + cur.quantity * cur.product.price;
    }, 0);
  }, [orderDetail]);

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

    await requestPayment({
      orderName: genOrderName({ products }),
      totalAmount: totalPrice,
      channelType: "TOSS",
      payMethod: "CARD",
      redirectUrl: `${window.location.origin}/orders/${orderId}`,
    });
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
