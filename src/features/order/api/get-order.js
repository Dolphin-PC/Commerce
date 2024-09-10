import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";
export const getOrder = async ({ orderId, userId }) => {
    const { data, error } = await supabase.from("order").select().eq("id", orderId).eq("userId", userId).single();
    if (error)
        throw error;
    return data;
};
export const useGetOrderSuspenseQuery = (props) => {
    return useSuspenseQuery({
        queryKey: [queryKey.order, props.orderId],
        queryFn: () => getOrder(props),
    });
};
