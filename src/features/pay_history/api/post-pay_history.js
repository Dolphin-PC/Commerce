import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
/**
 * @desc 결제 내역 추가
 */
const postPayHistory = async ({ insert }) => {
    const q = supabase.from("pay_history").insert([insert]).select().maybeSingle();
    const { data, error } = await q;
    if (error)
        throw error;
    if (!data)
        throw new Error("결제 내역 추가 실패");
    return data;
};
export const usePostPayHistoryMutation = () => {
    return useMutation({
        mutationKey: ["usePostPayHistoryMutation"],
        mutationFn: postPayHistory,
        onError: (error) => {
            console.error(error);
            throw error;
        },
    });
};
