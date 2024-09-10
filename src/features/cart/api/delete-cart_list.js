import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const deleteCartList = async ({ ids }) => {
    const { error } = await supabase.from("cart").delete().in("id", ids);
    if (error)
        throw error;
};
export const useDeleteCartList = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationKey: ["useDeleteCartList"],
        mutationFn: deleteCartList,
        onSuccess: () => {
            qc.refetchQueries({ queryKey: [queryKey.cart] });
        },
    });
};
