import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
const getSellerOrderDetail = async ({ sellerId, orderDetailStatus, orderStatus }) => {
    const q = supabase
        .from("order_detail")
        .select(`
    *, 
    product!inner(*),
    order!inner(
      *,
      payHistory:pay_history(*)
    )
  `)
        .eq("product.sellerId", sellerId);
    if (orderStatus)
        q.eq("order.status", orderStatus);
    if (orderDetailStatus)
        q.eq("status", orderDetailStatus);
    const { data, error } = await q.order("id");
    if (error)
        throw error;
    return data;
};
export const useGetSellerOrderDetailQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.order_detail, props.orderStatus, props.orderDetailStatus, props.sellerId],
        queryFn: () => getSellerOrderDetail(props),
        staleTime: staleTime.order_detail,
    });
};
