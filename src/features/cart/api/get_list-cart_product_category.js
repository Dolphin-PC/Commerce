import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
export const getCartProductCategory = async ({ userId }) => {
    const q = supabase.from("cart").select("*, product(*, category(*))").eq("userId", userId);
    const { data, error } = await q;
    if (error)
        throw error;
    return data;
};
export const useCartProductCategoryQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.cart, queryKey.product, props.userId],
        queryFn: () => {
            if (props.userId) {
                return getCartProductCategory({ userId: props.userId });
            }
        },
        staleTime: staleTime.cart,
        enabled: !!props.userId,
    });
};
