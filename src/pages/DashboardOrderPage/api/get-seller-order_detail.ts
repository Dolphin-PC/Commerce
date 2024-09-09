import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { PayHistory } from "@/features/pay_history/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";

/**
 * @desc 판매자 상품 주문 내역 조회
 */

interface Props {
  sellerId: User["id"];
  orderStatus: Order["status"] | null;
  orderDetailStatus: OrderDetail["status"] | null;
}

interface Return extends OrderDetail {
  product: Product;
  order: Order & { payHistory: PayHistory | null };
}

const getSellerOrderDetail = async ({ sellerId, orderDetailStatus, orderStatus }: Props): Promise<Return[]> => {
  const q = supabase
    .from("order_detail")
    .select(
      `
    *, 
    product!inner(*),
    order!inner(
      *,
      payHistory:pay_history(*)
    )
  `
    )
    .eq("product.sellerId", sellerId);

  if (orderStatus) q.eq("order.status", orderStatus);
  if (orderDetailStatus) q.eq("status", orderDetailStatus);

  const { data, error } = await q.order("id");
  if (error) throw error;

  return data;
};

export const useGetSellerOrderDetailQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.order_detail, props.orderStatus, props.orderDetailStatus, props.sellerId],
    queryFn: () => getSellerOrderDetail(props),
    staleTime: staleTime.order_detail,
  });
};
