import { useQuery } from "@tanstack/react-query";
import { Product, ProductCategory } from "../type/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { K } from "@/shared/consts/queryKey";

/**
 * 제품 상세 조회(카테고리 포함)
 */

//* 추상
interface Props {
  id: Product["id"];
  sellerId?: Product["sellerId"];
}

type Return = ProductCategory | null;

//* 구현
const getProductCategory = async ({ id, sellerId }: Props): Promise<Return> => {
  let q = supabase.from("product").select("*, category(*)");

  q = q.eq("id", id);
  if (sellerId) q = q.eq("sellerId", sellerId);

  const { data, error } = await q.maybeSingle();
  if (error) throw error;

  return data;
};

export const useProductCategoryQuery = (props: Props) => {
  return useQuery({
    queryKey: [K.product, props.id, K.category],
    queryFn: () => getProductCategory(props),
    staleTime: Infinity,
  });
};
