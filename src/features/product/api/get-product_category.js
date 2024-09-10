import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
//* 구현
const getProductCategory = async ({ id, sellerId }) => {
    let q = supabase.from("product").select(`
    id, name, desc, sellerId,
    price, discountType, discountValue,
    createdAt, updatedAt, isDelete,
    categoryId, category(*)
  `);
    q = q.eq("id", id);
    if (sellerId)
        q = q.eq("sellerId", sellerId);
    const { data, error } = await q.maybeSingle();
    if (error)
        throw error;
    if (!data)
        throw new Error("상품이 존재하지 않습니다.");
    return data;
};
export const useProductCategoryQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.product, queryKey.category, props.id],
        queryFn: () => getProductCategory(props),
        staleTime: staleTime.product,
    });
};
export const useProductCategorySuspenseQuery = (props) => {
    return useSuspenseQuery({
        queryKey: [queryKey.product, queryKey.category, props.id],
        queryFn: () => getProductCategory(props),
        staleTime: staleTime.product,
    });
};
/** preFetching */
export const productCategoryPrefetchOptions = (props) => {
    return {
        queryKey: [queryKey.product, queryKey.category, props.id],
        queryFn: () => getProductCategory(props),
        staleTime: staleTime.product,
    };
};
