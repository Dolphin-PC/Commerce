import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order, OrderUpdate } from "../type";
import { queryKey } from "@/shared/consts/react-query";

/**
 * @desc 주문 update API
 */

interface Props {
  id: Order["id"];
  update: OrderUpdate;
}

interface Return extends Order {}

const putOrder = async ({ id, update }: Props): Promise<Return> => {
  const q = supabase.from("order").update(update).eq("id", id).select().single();

  const { data, error } = await q;
  if (error) throw error;

  return data;
};

export const usePutOrderMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["usePutOrderMutation"],
    mutationFn: putOrder,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey.order] });
    },
  });
};
