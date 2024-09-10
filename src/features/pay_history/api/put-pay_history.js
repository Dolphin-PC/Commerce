import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
/**
 * @desc 결제 내역 수정
 */
const putPayHistory = async ({ paymentId, update }) => {
    const q = supabase.from("pay_history").update(update).eq("paymentId", paymentId).select().maybeSingle();
    const { data, error } = await q;
    if (error)
        throw error;
    if (!data)
        throw new Error("결제 내역 수정 실패");
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
