import { OrderDetail } from "@/features/order_detail/type";
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
  status: OrderDetail["status"] | null;
}

interface Return extends OrderDetail {
  product: Product;
}

const getSellerOrderDetail = async ({ sellerId, status }: Props): Promise<Return[]> => {
  const q = supabase.from("order_detail").select("*, product!inner(*)").eq("product.sellerId", sellerId);

  if (status) {
    q.eq("status", status);
  }

  const { data, error } = await q.order("id");
  if (error) throw error;

  return data;
};

export const useGetSellerOrderDetailQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.order_detail, props.status, props.sellerId],
    queryFn: () => getSellerOrderDetail(props),
    staleTime: staleTime.order_detail,
  });
};
