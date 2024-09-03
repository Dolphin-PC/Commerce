import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
import { OrderDetail } from "../type";

/**
 * @desc 주문 상세 delete API
 */

interface Props {
  id: OrderDetail["id"];
}

const deleteOrderDetail = async ({ id }: Props): Promise<void> => {
  const q = supabase.from("order_detail").delete().eq("id", id).select().maybeSingle();

  const { data, error } = await q;
  if (error) throw error;
  if (data) throw Error("주문 상세가 삭제되지 않았어요.");
};

export const useDeleteOrderDetail = () => {
  return useMutation({
    mutationKey: ["useDeleteOrderDetail"],
    mutationFn: deleteOrderDetail,
    onSuccess: () => {},
  });
};
