import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Order } from "../type";
import { queryKey } from "@/shared/consts/react-query";

/**
 * @desc 주문 delete API
 */

interface Props {
  id: Order["id"];
}

const deleteOrder = async ({ id }: Props): Promise<void> => {
  const q = supabase.from("order").delete().eq("id", id);

  const { error } = await q;
  if (error) throw error;
};

export const useDeleteOrder = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["useDeleteOrder"],
    mutationFn: deleteOrder,
    onSuccess: () => {
      qc.removeQueries({ queryKey: [queryKey.order] });
    },
  });
};
