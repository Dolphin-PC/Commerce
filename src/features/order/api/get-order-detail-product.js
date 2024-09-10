import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
const getOrderDetailProduct = async ({ orderId, userId, status }) => {
    const q = supabase
        .from("order")
        .select(`
          *,
          orderDetails: order_detail(*, 
            product: product!inner(*,
              seller: user!inner(*)
            )
          ),
          payHistory: pay_history(*)
          `)
        .eq("id", orderId)
        .eq("userId", userId);
    if (status)
        q.eq("status", status);
    const { data, error } = await q.maybeSingle();
    if (error)
        throw error;
    if (!data)
        throw new Error("주문 상품을 찾을 수 없습니다.");
    return data;
};
export const useGetOrderDetailProductSuspenseQuery = (props) => {
    return useSuspenseQuery({
        queryKey: [queryKey.order, queryKey.order_detail, queryKey.product, { ...props }],
        queryFn: () => getOrderDetailProduct(props),
    });
};
