import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
export const getProductQuantity = async ({ id, sellerId }) => {
    let q = supabase.from("product").select(`quantity`);
    q = q.eq("id", id);
    if (sellerId)
        q = q.eq("sellerId", sellerId);
    const { data, error } = await q.maybeSingle();
    if (error)
        throw error;
    if (!data)
        throw new Error("상품이 존재하지 않습니다.");
    return data;
};
export const useProductQuantity = (props) => {
    return useQuery({
        queryKey: [queryKey.product, queryKey.quantity, props.id],
        queryFn: () => getProductQuantity(props),
    });
};
