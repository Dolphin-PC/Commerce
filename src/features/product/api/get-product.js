import { supabase } from "@/shared/config/@db/supabase.config";
import { useSuspenseQuery } from "@tanstack/react-query";
import { queryKey, staleTime } from "@/shared/consts/react-query";
//* 구현
export const getProduct = async ({ id, sellerId }) => {
    let q = supabase.from("product").select("*");
    q = q.eq("id", id);
    if (sellerId)
        q = q.eq("sellerId", sellerId);
    const { data, error } = await q.maybeSingle();
    if (error)
        throw error;
    if (!data)
        throw new Error("Product not found");
    return data;
};
export const useProductSuspenseQuery = (props) => {
    return useSuspenseQuery({
        queryKey: [queryKey.product, props.id],
        queryFn: () => getProduct(props),
        staleTime: staleTime.product,
    });
};
