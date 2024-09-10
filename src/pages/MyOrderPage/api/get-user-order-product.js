import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
const getUserOrderProduct = async ({ userId }) => {
    const q = supabase
        .from("order")
        .select(`
        *, 
        orderDetails: order_detail(*, 
            product: product!inner(name, sellerId, 
                seller: user!inner(nickname)
            )
        ),
        payHistory: pay_history(*)
    `)
        .eq("userId", userId);
    const { data, error } = await q.order("id", { ascending: false });
    if (error)
        throw error;
    if (!data)
        throw new Error("유저의 주문 데이터를 찾지 못했어요.");
    return data ?? [];
};
export const useGetUserOrderProductQuery = (props) => {
    return useSuspenseQuery({
        queryKey: [queryKey.user, queryKey.order, props.userId],
        queryFn: () => getUserOrderProduct(props),
    });
};
