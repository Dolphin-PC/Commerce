import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
import { OrderDetail, OrderDetailInsert } from "../type";

/**
 * @desc 주문 상세 insert API
 */

interface Props {
  insert: OrderDetailInsert;
}

interface Return extends OrderDetail {}

const postOrderDetail = async ({ insert }: Props): Promise<Return> => {
  const q = supabase.from("order_detail").insert([insert]).select().maybeSingle();

  const { data, error } = await q;
  if (error) throw error;
  if (!data) throw Error("등록된 데이터가 조회되지 않았어요.");

  return data;
};

export const usePostOrderDetail = () => {
  return useMutation({
    mutationKey: ["usePostOrderDetail"],
    mutationFn: postOrderDetail,
    onSuccess: () => {},
  });
};
