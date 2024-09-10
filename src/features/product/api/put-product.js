import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const putProduct = async ({ id, update }) => {
    if (id === undefined)
        throw Error("id is required");
    const { data, error } = await supabase.from("product").update(update).eq("id", id).select().single();
    if (error)
        throw error;
    if (!data)
        throw Error("등록된 데이터가 조회되지 않았어요.");
    return data;
};
export const useProductPut = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (props) => putProduct(props),
        onSuccess: (res) => queryClient.refetchQueries({ queryKey: [queryKey.product, res.id, queryKey.category] }),
    });
};
