import { supabase } from "@/shared/config/@db/supabase.config";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Product, ProductCategory } from "../type/type";
import { K } from "@/shared/consts/queryKey";

/**
 * 제품 목록 조회 (카테고리 포함, 페이지네이션)
 */

//* 추상
interface Props {
  sellerId?: Product["sellerId"];
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
const getProductListWithCategory = async ({ sellerId, pageNumber = 0, pageSize = 10 }: Props): Promise<Return> => {
  let q = supabase.from("product").select("*, category(*)").neq("isDelete", true);
  if (sellerId) {
    q = q.eq("sellerId", sellerId);
  }

  q = q.order("createdAt", { ascending: false });

  if (pageNumber !== undefined) {
    q = q.range(pageNumber * pageSize, pageNumber * pageSize + pageSize);
  }

  const { data, error } = await q;
  if (error) throw error;

  return {
    data,
    hasNextPage: data.length === pageSize,
    nextPageNumber: pageNumber + 1,
  };
};

export const useProductListCategoryInfiniteQuery = (props: Props) => {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: [K.product, K.infinite, { ...props }],
    queryFn: ({ pageParam }) => getProductListWithCategory({ ...props, pageNumber: pageParam }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasNextPage ? lastPage.nextPageNumber : undefined;
    },
  });
};
