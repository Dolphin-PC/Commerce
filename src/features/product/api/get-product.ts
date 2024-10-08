import { supabase } from "@/shared/config/@db/supabase.config";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Product } from "../type/type";
import { queryKey, staleTime } from "@/shared/consts/react-query";

/**
 * 제품 상세 조회
 */

//* 추상
interface Props {
  id: number;
  sellerId?: number;
}

type Return = Product;

//* 구현
export const getProduct = async ({ id, sellerId }: Props): Promise<Return> => {
  let q = supabase.from("product").select("*");

  q = q.eq("id", id);
  if (sellerId) q = q.eq("sellerId", sellerId);

  const { data, error } = await q.maybeSingle();
  if (error) throw error;
  if (!data) throw new Error("Product not found");

  return data;
};

export const useProductSuspenseQuery = (props: Props) => {
  return useSuspenseQuery({
    queryKey: [queryKey.product, props.id],
    queryFn: () => getProduct(props),
    staleTime: staleTime.product,
  });
};
