import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const deleteCart = async ({ id }) => {
    const { error } = await supabase.from("cart").delete().eq("id", id);
    if (error)
        throw error;
};
export const useDeleteCart = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationKey: ["useDeleteCart"],
        mutationFn: deleteCart,
        onSuccess: () => {
            qc.refetchQueries({ queryKey: [queryKey.cart] });
        },
    });
};
