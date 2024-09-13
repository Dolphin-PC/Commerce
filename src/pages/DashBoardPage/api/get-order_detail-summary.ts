import { Order } from "@/features/order/type";
import { PayHistory } from "@/features/pay_history/type";
import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";

/**
 * @desc 판매자의 주문상세 내역 결산
 */

interface Props {
  sellerId: User["id"];
}

interface Return {
  count: number;
  data: {
    order: {
      id: Order["id"];
      pay_history: {
        payAmount: PayHistory["payAmount"];
      };
    };
    product: {
      sellerId: User["id"];
    };
  }[];
}

const getOrderDetailSummary = async ({ sellerId }: Props): Promise<Return> => {
  // 주문내역 개수
  const { data, count, error } = await supabase
    .from("order_detail")
    .select("product!inner(sellerId), order!inner(id, pay_history!inner(payAmount))", { count: "exact" })
    .eq("product.sellerId", sellerId);
  console.log({ data, count });

  if (error) throw error;
  if (count === null) throw "orderDetailSummary:: count is null";

  return {
    data,
    count,
  };
};

export const useOrderDetailSummaryQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.order_detail, "summary", props.sellerId],
    queryFn: () => getOrderDetailSummary(props),
  });
};
