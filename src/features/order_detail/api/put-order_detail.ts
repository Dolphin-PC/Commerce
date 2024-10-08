import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderDetail, OrderDetailUpdate } from "../type";
import { queryKey } from "@/shared/consts/react-query";

/**
 * @desc 주문 상세 update API
 */

interface Props {
  id: OrderDetail["id"];
  update: OrderDetailUpdate;
}

interface Return extends OrderDetail {}

const putOrderDetail = async ({ id, update }: Props): Promise<Return> => {
  const q = supabase.from("order_detail").update(update).eq("id", id).select().single();

  const { data, error } = await q;
  if (error) throw error;
  if (!data) throw Error("수정된 데이터가 조회되지 않았어요.");

  return data;
};

export const usePutOrderDetail = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ["usePutOrderDetail"],
    mutationFn: putOrderDetail,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: [queryKey.order_detail] });
    },
  });
};
