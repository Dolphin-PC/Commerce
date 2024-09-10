/**
 * 카테고리 이름으로 목록 조회
 */
import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";
export const getCategoryList = async ({ categoryName }) => {
    const res = await supabase
        .from("category")
        .select("*")
        .like("categoryName", `%${categoryName ?? ""}%`);
    return res.data ?? [];
};
export const useCategoryListQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.category_list, { ...props }],
        queryFn: () => getCategoryList(props),
        staleTime: Infinity,
    });
};
