import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { PayHistory } from "@/features/pay_history/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

/**
 * @desc 사용자 > 주문 > [주문상세 > 상품 정보] 목록 조회
 *  - user > order > order_detail > product
 */

interface Props {
  userId: User["id"];
}

interface Return extends Order {
  orderDetails: (OrderDetail & {
    product: { name: Product["name"]; sellerId: Product["sellerId"] } & {
      seller: { nickname: User["nickname"] };
    };
  })[];
  payHistory: PayHistory | null;
}

const getUserOrderProduct = async ({ userId }: Props): Promise<Return[]> => {
  const q = supabase
    .from("order")
    .select(
      `
        *, 
        orderDetails: order_detail(*, 
            product: product!inner(name, sellerId, 
                seller: user!inner(nickname)
            )
        ),
        payHistory: pay_history(*)
    `
    )
    .eq("userId", userId);

  const { data, error } = await q;
  if (error) throw error;
  if (!data) throw new Error("유저의 주문 데이터를 찾지 못했어요.");

  return data ?? [];
};

export const useGetUserOrderProductQuery = (props: Props) => {
  return useSuspenseQuery({
    queryKey: [queryKey.user, queryKey.order, props.userId],
    queryFn: () => getUserOrderProduct(props),
  });
};
