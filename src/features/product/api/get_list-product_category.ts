import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery, useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Product, ProductCategory } from "../type/type";
import { K } from "@/shared/consts/queryKey";
import { Category } from "@/features/category/model/type";

/**
 * 제품 목록 조회 (카테고리 포함, 페이지네이션)
 */

//* 추상
interface Props {
  sellerId?: Product["sellerId"];
  categoryId?: Category["id"];

  pageNumber?: number;
  pageSize?: number;
}

interface Return {
  data: ProductCategory[];

  /** 조회된 데이터의 개수와 pageSize를 비교하여 도출 */
  hasNextPage: boolean;
  nextPageNumber: number;
}

//* 구현
const getProductListWithCategory = async ({ sellerId, categoryId, pageNumber = 0, pageSize = 10 }: Props): Promise<Return> => {
  let q = supabase.from("product").select("*, category(*)").neq("isDelete", true);
  q = q.range(pageNumber * pageSize, pageNumber * pageSize + pageSize);

  // 조건 필터링
  if (sellerId) q = q.eq("sellerId", sellerId);
  if (categoryId) q = q.eq("categoryId", categoryId);

  q = q.order("createdAt", { ascending: false });

  const { data, error } = await q;
  if (error) throw error;

  return {
    data: data as ProductCategory[],
    hasNextPage: data.length === pageSize,
    nextPageNumber: pageNumber + 1,
  };
};

/** 무한 스크롤 */
export const useProductListCategoryInfiniteQuery = (props: Props) => {
  return useSuspenseInfiniteQuery({
    initialPageParam: 0,
    queryKey: [K.product, K.infinite, { ...props }],
    queryFn: ({ pageParam }) => getProductListWithCategory({ ...props, pageNumber: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPageNumber : undefined;
    },
  });
};

/** 목록 조회 */
export const useProductListCategoryQuery = (props: Props) => {
  return useQuery({
    queryKey: [K.product, K.category, { ...props }],
    queryFn: () => getProductListWithCategory({ ...props }),
    staleTime: 1000 * 60 * 5,
  });
};
