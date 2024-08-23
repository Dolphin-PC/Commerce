import { supabase } from "@/shared/config/@db/supabase.config";
import { useQuery } from "@tanstack/react-query";
import { Product } from "../type/type";

/**
 * 제품 상세 조회
 */

//* 추상
interface Props {
  id: number;
  sellerId?: number;
}

type Return = Product | null


//* 구현
const getProduct = async ({id,sellerId}:Props): Promise<Return> => {
  let q = supabase.from("product").select("*")

  q = q.eq("id", id);
  if(sellerId) q = q.eq("sellerId", sellerId);

  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  return data
};

export const useProductQuery = (props:Props) => {
  return useQuery({
    queryKey: ["product", {...props}],
    queryFn: () => getProduct(props),
    staleTime: Infinity,
  });
};
