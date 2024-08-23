import { useQuery } from "@tanstack/react-query";
import { supabase } from "../@db/supabase.config";
import { QueryData } from "@supabase/supabase-js";

/**
 * 제품 목록 조회 (카테고리 포함)
 */

//* 추상
interface Props {
  sellerId?: number;
}

interface Return {
  data : ProductCategoryList
}
export type ProductCategoryList = QueryData<typeof productCategoryListQuery>


//* 구현
const productCategoryListQuery = supabase.from("product").select("*, category(*)");

const getProductListWithCategory = async ({sellerId}:Props):Promise<Return> => {
  let q = productCategoryListQuery;
  if(sellerId){
    q = q.eq("sellerId", sellerId);
  }
  

  const { data, error } = await q;
  if (error) throw error;
  return {data};
};

export const useProductListCategoryQuery = (props:Props) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProductListWithCategory(props),
    staleTime: Infinity,
  });
};