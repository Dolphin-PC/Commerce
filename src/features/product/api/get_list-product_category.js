import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { queryKey, staleTime } from "@/shared/consts/react-query";
//* 구현
const getProductListWithCategory = async ({ sellerId, categoryId, pageNumber = 0, pageSize = 10, order, filter }) => {
    let q = supabase.from("product").select("*, category(*)").neq("isDelete", true);
    q = q.range(pageNumber * pageSize, pageNumber * pageSize + pageSize - 1);
    // 조건 필터링
    if (sellerId)
        q = q.eq("sellerId", sellerId);
    if (categoryId)
        q = q.eq("categoryId", categoryId);
    if (filter) {
        if (filter.searchText)
            q = q.like("name", `%${filter.searchText}%`);
        if (filter.categoryIds.length > 0)
            q = q.in("categoryId", filter.categoryIds);
        if (filter.priceRange) {
            const [min, max] = filter.priceRange;
            q = q.gte("price", min);
            if (max != Infinity)
                q = q.lte("price", max);
        }
    }
    // 정렬
    if (order)
        q = q.order(order.column, { ascending: order.ascending });
    else
        q = q.order("createdAt", { ascending: false });
    q.order("id", { ascending: false }); // 생성일자가 동일할 떄, 데이터가 겹치는 경우 방비
    const { data, error } = await q;
    if (error)
        throw error;
    return {
        data: data,
        hasNextPage: data.length === pageSize,
        nextPageNumber: pageNumber + 1,
    };
};
/** 무한 스크롤 */
export const useProductListCategoryInfiniteQuery = (props) => {
    return useSuspenseInfiniteQuery({
        initialPageParam: 0,
        queryKey: [queryKey.product, queryKey.infinite, { ...props }],
        queryFn: ({ pageParam }) => getProductListWithCategory({ ...props, pageNumber: pageParam }),
        getNextPageParam: (lastPage) => {
            return lastPage.hasNextPage ? lastPage.nextPageNumber : undefined;
        },
        staleTime: staleTime.product,
    });
};
/** 목록 조회 */
export const useProductListCategoryQuery = (props) => {
    return useQuery({
        queryKey: [queryKey.product, queryKey.list, props.categoryId],
        queryFn: () => getProductListWithCategory({ ...props }),
        staleTime: staleTime.product,
    });
};
