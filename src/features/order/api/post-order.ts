import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
import { Order, OrderInsert } from "../type";

/**
 * @desc 주문 insert API
 */

interface Props {
  insert: OrderInsert;
}

interface Return extends Order {}

const postOrder = async ({ insert }: Props): Promise<Return> => {
  const q = supabase.from("order").insert([insert]).select().maybeSingle();

  const { data, error } = await q;
  if (error) throw error;
  if (!data) throw Error("등록된 데이터가 조회되지 않았어요.");

  return data;
};

export const usePostOrder = () => {
  return useMutation({
    mutationKey: ["usePostOrder"],
    mutationFn: postOrder,
    onSuccess: () => {},
  });
};
