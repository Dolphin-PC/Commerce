import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
import { Order } from "../type";

/**
 * @desc 주문목록 get API
 */

interface Props {
  userId: User["id"];
}

type Return = Order[];

const getOrderList = async ({ userId }: Props): Promise<Return> => {
  const { data, error } = await supabase.from("order").select().eq("userId", userId);

  if (error) throw error;
  if (!data) throw Error("주문 데이터가 조회되지 않았어요.");

  return data;
};

export const useGetOrderListQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.order, queryKey.list, props.userId],
    queryFn: () => getOrderList(props),
  });
};
