import { User } from "@/features/user/model/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Order } from "../type";

/**
 * @desc 주문 get API
 */

interface Props {
  userId: User["id"];
  orderId: Order["id"];
}

interface Return extends Order {}

export const getOrder = async ({ orderId, userId }: Props): Promise<Return> => {
  const { data, error } = await supabase.from("order").select().eq("id", orderId).eq("userId", userId).single();

  if (error) throw error;

  return data;
};

export const useGetOrderSuspenseQuery = (props: Props) => {
  return useSuspenseQuery({
    queryKey: [queryKey.order, props.orderId],
    queryFn: () => getOrder(props),
  });
};
