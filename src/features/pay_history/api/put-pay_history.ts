import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
import { PayHistory, PayHistoryUpdate } from "../type";

interface Props {
  paymentId: PayHistory["paymentId"];
  update: PayHistoryUpdate;
}

interface Return extends PayHistory {}

/**
 * @desc 결제 내역 수정
 */

const putPayHistory = async ({ paymentId, update }: Props): Promise<Return> => {
  const q = supabase.from("pay_history").update(update).eq("paymentId", paymentId).select().maybeSingle();

  const { data, error } = await q;
  if (error) throw error;
  if (!data) throw new Error("결제 내역 수정 실패");

  return data;
};

export const usePutPayHistoryMutation = () => {
  return useMutation({
    mutationKey: ["usePutPayHistoryMutation"],
    mutationFn: putPayHistory,
    onError: (error) => {
      console.error(error);
      throw error;
    },
  });
};
