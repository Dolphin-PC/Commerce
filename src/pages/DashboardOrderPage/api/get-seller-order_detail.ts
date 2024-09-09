import { OrderDetail } from "@/features/order_detail/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";

/**
 * @desc 판매자 상품 주문 내역 조회
 */

interface Props {
  sellerId: User["id"];
}

interface Return {
  productId: Product["id"];
  orderDetails: OrderDetail[];
}

const getSellerOrderDetail = async ({ sellerId }: Props): Promise<Return[]> => {
  const q = supabase
    .from("product")
    .select(
      `
        productId:id,
        orderDetails: order_detail!inner(*)
        `
    )
    .eq("sellerId", sellerId);

  const { data, error } = await q;
  if (error) throw error;

  return data;
};

export const useGetSellerOrderDetailQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.order_detail, props.sellerId],
    queryFn: () => getSellerOrderDetail(props),
  });
};
