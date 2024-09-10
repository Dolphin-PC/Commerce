import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery } from "@tanstack/react-query";
import { queryKey, staleTime } from "@/shared/consts/react-query";
const getCartList = async ({ userId }) => {
    const { data, error } = await supabase.from("cart").select().eq("userId", userId);
    if (error)
        throw error;
    return data;
};
export const useCartListQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.cart, queryKey.list, props.userId],
        queryFn: () => getCartList(props),
        staleTime: staleTime.cart,
    });
};
