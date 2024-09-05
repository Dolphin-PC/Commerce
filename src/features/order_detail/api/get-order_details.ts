import { supabase } from "@/shared/config/@db/supabase.config";
import { OrderDetail } from "../type";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";

/**
 * @desc 주문 상세 get API
 */

interface Props {
  orderId: number;
}

interface Return {
  data: OrderDetail[];
}

const getOrderDetails = async ({ orderId }: Props): Promise<Return> => {
  const q = supabase.from("order_detail").select().eq("order_id", orderId);

  const { data, error } = await q;
  if (error) throw error;
  if (data.length == 0) throw Error("주문 데이터가 조회되지 않았어요.");

  return { data };
};

export const useGetOrderDetailsSuspenseQuery = (props: Props) => {
  return useSuspenseQuery({
    queryKey: [queryKey.order_detail, props.orderId],
    queryFn: () => getOrderDetails(props),
  });
};
