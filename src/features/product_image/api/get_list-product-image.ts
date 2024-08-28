import { useQuery } from "@tanstack/react-query";
import { ProductImage } from "../type/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { Product } from "@/features/product/type/type";
import { queryKey } from "@/shared/consts/react-query";

/**
 * 제품 이미지 목록 조회
 */

interface Props {
  productId: Product["id"];
}

type Return = ProductImage[];

export const getProductImage = async ({ productId }: Props): Promise<Return> => {
  const { data, error } = await supabase.from("product_image").select("*").eq("productId", productId);

  if (error) throw error;

  return data;
};

export const useProductImageQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.product, queryKey.image, props.productId],
    queryFn: () => getProductImage(props),
    staleTime: Infinity,
    enabled: !!props.productId,
  });
};
