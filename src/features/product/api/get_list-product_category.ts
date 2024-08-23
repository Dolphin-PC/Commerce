import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/type";

/**
 * 제품 목록 조회 (카테고리 포함)
 */

//* 추상
interface Props {
  sellerId?: Product["sellerId"];
}

type Return = Product[]



//* 구현
const getProductListWithCategory = async ({sellerId}:Props):Promise<Return> => {
  let q = supabase.from("product").select("*, category(*)");
  if(sellerId){
    q = q.eq("sellerId", sellerId);
  }
  

  const { data, error } = await q;
  if (error) throw error;
  return data
};

export const useProductListCategoryQuery = (props:Props) => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => getProductListWithCategory(props),
    staleTime: Infinity,
  });
};