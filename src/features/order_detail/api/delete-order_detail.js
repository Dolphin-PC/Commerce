import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
const deleteOrderDetail = async ({ id }) => {
    const q = supabase.from("order_detail").delete().eq("id", id);
    const { error } = await q;
    if (error)
        throw error;
};
export const useDeleteOrderDetail = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationKey: ["useDeleteOrderDetail"],
        mutationFn: deleteOrderDetail,
        onSuccess: () => {
            qc.removeQueries({ queryKey: [queryKey.order_detail] });
        },
    });
};
