import { supabase } from "@/shared/config/@db/supabase.config";
import { RefundHistory, RefundHistoryInsert } from "../type";
import { useMutation } from "@tanstack/react-query";

/**
 * @desc 환불 내역 추가
 */

interface Props {
  inserts: RefundHistoryInsert[];
}

interface Return extends RefundHistory {}

const postRefundHistory = async ({ inserts }: Props): Promise<Return[]> => {
  const { data, error } = await supabase.from("refund_history").insert(inserts).select();
  if (error) throw error;
  return data;
};

export const usePostRefundHistoryMutation = () => {
  return useMutation({
    mutationKey: ["usePostRefundHistoryMutation"],
    mutationFn: postRefundHistory,
  });
};
