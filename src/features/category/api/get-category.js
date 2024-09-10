import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";
const getCategoryById = async ({ id }) => {
    const res = await supabase.from("category").select("*").eq("id", id).single();
    return res.data;
};
export const useCategoryQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.category, { ...props }],
        queryFn: () => getCategoryById(props),
        staleTime: Infinity,
        enabled: !!props.id,
    });
};
