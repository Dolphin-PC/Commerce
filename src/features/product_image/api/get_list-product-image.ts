import { useQuery } from "@tanstack/react-query";
import { ProductImage } from "../type/type";
import { supabase } from "@/shared/config/@db/supabase.config";
import { bucketBaseUrl } from "../const/bucket";
import { Product } from "@/features/product/type/type";

/**
 * 제품 이미지 목록 조회
 */

interface Props {
  productId: Product["id"];
}

type Return = ProductImage[];


export const getProductImage = async ({productId}: Props): Promise<Return> => {
  const res = await supabase
    .from("product_image")
    .select("*")
    .eq("productId", productId);

  if (res.data === null) return [];

  return res.data.map((img) => ({
    ...img,
    imgUrl: bucketBaseUrl + "/" + img.imgUrl,
  }));
};

export const useProductImageQuery = (props:Props) => {
  return useQuery({
    queryKey: ["product_image", {...props}],
    queryFn: () => getProductImage(props),
    staleTime: Infinity,
    enabled: !!props.productId,
  });
};
