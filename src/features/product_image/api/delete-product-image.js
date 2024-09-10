import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
import { deleteUpload } from "@/features/@storage/storage.api";
export const deleteProductImage = async (props) => {
    await deleteUpload([props.imgUrl]);
    await deleteUpload([props.thumnailUrl]);
    const { error } = await supabase.from("product_image").delete().eq("id", props.id);
    if (error)
        throw error;
    return props.productId;
};
export const useDeleteProductImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ["deleteProductImage"],
        mutationFn: deleteProductImage,
        onSuccess: (productId) => {
            queryClient.refetchQueries({ queryKey: [queryKey.product, queryKey.image, productId] });
        },
    });
};
