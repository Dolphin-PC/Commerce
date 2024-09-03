import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
import { Order } from "../type";

/**
 * @desc 주문 delete API
 */

interface Props {
  id: Order["id"];
}

const deleteOrder = async ({ id }: Props): Promise<void> => {
  const q = supabase.from("order").delete().eq("id", id).select().maybeSingle();

  const { data, error } = await q;
  if (error) throw error;
  if (data) throw Error("주문이 삭제되지 않았어요.");
};

export const useDeleteOrder = () => {
  return useMutation({
    mutationKey: ["useDeleteOrder"],
    mutationFn: deleteOrder,
    onSuccess: () => {},
  });
};
