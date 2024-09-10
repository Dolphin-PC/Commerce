import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation } from "@tanstack/react-query";
const postRefundHistory = async ({ inserts }) => {
    const { data, error } = await supabase.from("refund_history").insert(inserts).select();
    if (error)
        throw error;
    return data;
};
export const usePostRefundHistoryMutation = () => {
    return useMutation({
        mutationKey: ["usePostRefundHistoryMutation"],
        mutationFn: postRefundHistory,
    });
};
