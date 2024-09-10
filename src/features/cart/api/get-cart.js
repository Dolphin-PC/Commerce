import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
const getCart = async ({ id }) => {
    const { data, error } = await supabase.from("cart").select().eq("id", id).maybeSingle();
    if (error)
        throw error;
    if (!data)
        throw new Error("getCart:: data is not exist");
    return data;
};
export const useCartQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.cart, props.id],
        queryFn: () => getCart(props),
        staleTime: staleTime.cart,
    });
};
