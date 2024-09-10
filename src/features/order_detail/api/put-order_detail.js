import { supabase } from "@/shared/config/@db/supabase.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
const putOrderDetail = async ({ id, update }) => {
    const q = supabase.from("order_detail").update(update).eq("id", id).select().single();
    const { data, error } = await q;
    if (error)
        throw error;
    if (!data)
        throw Error("수정된 데이터가 조회되지 않았어요.");
    return data;
};
export const usePutOrderDetail = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationKey: ["usePutOrderDetail"],
        mutationFn: putOrderDetail,
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: [queryKey.order_detail] });
        },
    });
};
