import { Order, OrderStatus } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { PayHistory } from "@/features/pay_history/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

/**
 * @desc 주문 > [주문상세 > 상품 정보] 단건 조회
 *  - order > order_detail > product
 */

interface Props {
  orderId: Order["id"];
  userId: User["id"];
  status?: OrderStatus;
}

interface Return extends Order {
  orderDetails: (OrderDetail & {
    product: Product & {
      seller: User;
    };
  })[];
  payHistory: PayHistory | null;
}

const getOrderDetailProduct = async ({ orderId, userId, status }: Props): Promise<Return> => {
  const q = supabase
    .from("order")
    .select(
      `
          *,
          orderDetails: order_detail(*, 
            product: product!inner(*,
              seller: user!inner(*)
            )
          ),
          payHistory: pay_history(*)
          `
    )
    .eq("id", orderId)
    .eq("userId", userId);

  if (status) q.eq("status", status);

  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("주문 상품을 찾을 수 없습니다.");

  return data;
};

export const useGetOrderDetailProductSuspenseQuery = (props: Props) => {
  return useSuspenseQuery({
    queryKey: [queryKey.order, queryKey.order_detail, queryKey.product, props.orderId, props.userId],
    queryFn: () => getOrderDetailProduct(props),
  });
};
