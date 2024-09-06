import { supabase } from "@/shared/config/@db/supabase.config";
import { PayHistory } from "../type";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";

interface Props {
  id?: PayHistory["id"];
  orderId?: PayHistory["orderId"];
  paymentId?: PayHistory["paymentId"];
}

interface Return extends PayHistory {}

/**
 * @desc 결제 내역 단건 조회
 */

export const getPayHistory = async ({ id, orderId, paymentId }: Props): Promise<Return> => {
  let q = supabase.from("pay_history").select();

  if (id) q = q.eq("id", id);
  if (orderId) q = q.eq("orderId", orderId);
  if (paymentId) q = q.eq("paymentId", paymentId);

  const { data, error } = await q.single();
  if (error) throw error;

  return data;
};

export const useGetPayHistoryQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.pay_history, props.id],
    queryFn: () => getPayHistory(props),
  });
};
