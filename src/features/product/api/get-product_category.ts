import { useQuery } from "@tanstack/react-query";
import { ProductCategory } from "../model/type";
import { supabase } from "@/entities/@db/supabase.config";

/**
 * 제품 상세 조회(카테고리 포함)
 */

//* 추상
interface Props {
  id: number;
  sellerId?: number;
}

interface Return {
  data: ProductCategory | null;
}


//* 구현
const getProductCategory = async ({id,sellerId}:Props): Promise<Return> => {
  let q = supabase.from("product").select("*, category(*)")

  q = q.eq("id", id);
  if(sellerId) q = q.eq("sellerId", sellerId);

  const { data, error } = await q.maybeSingle();
  if (error) throw error;

  return {data};
};

export const useProductCategoryQuery = (props:Props) => {
  return useQuery({
    queryKey: ["product_category", {...props}],
    queryFn: () => getProductCategory(props),
    staleTime: Infinity,
  });
};
