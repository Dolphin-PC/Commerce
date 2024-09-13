import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { PayHistory } from "@/features/pay_history/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { PaginationReq } from "@/shared/types/api";
import { useQuery } from "@tanstack/react-query";

/**
 * @desc 판매자 상품 주문 내역 조회
 */

interface Props extends PaginationReq {
  sellerId: User["id"];
  orderStatus: Order["status"] | null;
  orderDetailStatus: OrderDetail["status"] | null;
}

export interface getListSellerOrderDetailReturn extends OrderDetail {
  product: Product;
  order: Order & { payHistory: PayHistory | null };
}

const getListSellerOrderDetail = async ({ sellerId, orderDetailStatus, orderStatus, pageNumber = 0, pageSize = 10 }: Props): Promise<getListSellerOrderDetailReturn[]> => {
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

  q.range(pageNumber * pageSize, pageNumber * pageSize + pageSize - 1);

  const { data, error } = await q.order("id");
  if (error) throw error;

  return data;
};

export const useGetListSellerOrderDetailQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.order_detail, queryKey.list, props.orderStatus, props.orderDetailStatus, props.sellerId],
    queryFn: () => getListSellerOrderDetail(props),
    staleTime: staleTime.order_detail,
  });
};
