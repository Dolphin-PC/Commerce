import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
const getOrderList = async ({ userId }) => {
    const { data, error } = await supabase.from("order").select().eq("userId", userId);
    if (error)
        throw error;
    if (!data)
        throw Error("주문 데이터가 조회되지 않았어요.");
    return data;
};
export const useGetOrderListQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.order, queryKey.list, props.userId],
        queryFn: () => getOrderList(props),
    });
};
