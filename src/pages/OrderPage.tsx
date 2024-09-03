import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useGetOrderSuspenseQuery } from "@/features/order/api/get-order";
import { useParams } from "react-router-dom";

/**
 * @desc 주문 화면
 *  - /orders/:id
 */
const OrderPage = () => {
  const { id } = useParams();
  const orderId = Number(id);
  const { id: userId } = useAuthStore((state) => state.getUser());

  const { data } = useGetOrderSuspenseQuery({ orderId, userId });

  console.log({ data });

  return <p>{id}</p>;
};

export default OrderPage;
