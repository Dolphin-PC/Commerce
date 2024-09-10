import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
export const getProductImage = async ({ productId, limit }) => {
    const q = supabase.from("product_image").select("*").eq("productId", productId);
    if (limit)
        q.limit(limit);
    const { data, error } = await q;
    if (error)
        throw error;
    return data ?? [];
};
export const useProductImageQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.product, queryKey.image, props.productId, props.limit],
        queryFn: () => getProductImage(props),
        staleTime: Infinity,
        enabled: !!props.productId,
    });
};
