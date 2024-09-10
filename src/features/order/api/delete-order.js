import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
const deleteOrder = async ({ id }) => {
    const q = supabase.from("order").delete().eq("id", id);
    const { error } = await q;
    if (error)
        throw error;
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
