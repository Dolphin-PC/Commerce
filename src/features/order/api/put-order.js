import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
const putOrder = async ({ id, update }) => {
    const q = supabase.from("order").update(update).eq("id", id).select().single();
    const { data, error } = await q;
    if (error)
        throw error;
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
