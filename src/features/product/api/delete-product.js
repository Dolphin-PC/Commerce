/**
 * 제품 삭제
 */
import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
const deleteProduct = async ({ productId }) => {
    await supabase.from("product").update({ isDelete: true }).eq("id", productId);
    return productId;
};
export const useDeleteProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteProduct"],
        mutationFn: deleteProduct,
        onSuccess: (productId) => queryClient.removeQueries({ queryKey: [queryKey.product, productId] }),
    });
};
