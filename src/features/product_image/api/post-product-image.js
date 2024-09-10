import { supabase } from "@/shared/config/@db/supabase.config";
import { upload } from "../../@storage/storage.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
import { resizeImageFile } from "@/shared/lib/image";
export const addProductImage = async ({ file, productId }) => {
    const resizeImage = await resizeImageFile({ file: file, width: 500, height: 500 });
    const resizeThumnail = await resizeImageFile({ file: file, width: 300, height: 300 });
    const imgUrl = await upload(resizeImage, productId);
    const thumnailUrl = await upload(resizeThumnail, productId);
    const { data, error } = await supabase.from("product_image").insert({ productId, imgUrl, thumnailUrl }).select().single();
    if (error)
        throw error;
    return data;
};
export const useAddProductImage = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (props) => addProductImage(props),
        onSuccess: (res) => {
            queryClient.refetchQueries({ queryKey: [queryKey.product, queryKey.image, res.productId] });
        },
    });
};
