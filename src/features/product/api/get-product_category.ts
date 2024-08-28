import { QueryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { Product, ProductCategory } from "../type/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey } from "@/shared/consts/react-query";

/**
 * 제품 상세 조회(카테고리 포함)
 */

//* 추상
interface Props {
  id: Product["id"];
  sellerId?: Product["sellerId"];
}

type Return = ProductCategory;

//* 구현
export const getProductCategory = async ({ id, sellerId }: Props): Promise<Return> => {
  let q = supabase.from("product").select("*, category(*)");

  q = q.eq("id", id);
  if (sellerId) q = q.eq("sellerId", sellerId);

  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("상품이 존재하지 않습니다.");

  return data;
};

export const useProductCategoryQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.product, queryKey.category, props.id],
    queryFn: () => getProductCategory(props),
  });
};

export const useProductCategorySuspenseQuery = (props: Props) => {
  return useSuspenseQuery({
    queryKey: [queryKey.product, queryKey.category, props.id],
    queryFn: () => getProductCategory(props),
  });
};

/** preFetching */
export const productCategoryPrefetchOptions = (props: Props): QueryOptions => {
  return {
    queryKey: [queryKey.product, queryKey.category, props.id],
    queryFn: () => getProductCategory(props),
  };
};
