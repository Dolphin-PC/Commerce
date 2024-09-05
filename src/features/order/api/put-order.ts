import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
import { Order, OrderUpdate } from "../type";

/**
 * @desc 주문 update API
 */

interface Props {
  id: Order["id"];
  update: OrderUpdate;
}

interface Return extends Order {}

const putOrder = async ({ id, update }: Props): Promise<Return> => {
  const q = supabase.from("order").update(update).eq("id", id).select().maybeSingle();

  const { data, error } = await q;
  if (error) throw error;
  if (!data) throw Error("수정된 데이터가 조회되지 않았어요.");

  return data;
};

export const usePutOrder = () => {
  return useMutation({
    mutationKey: ["usePutOrder"],
    mutationFn: putOrder,
    onSuccess: () => {},
  });
};
