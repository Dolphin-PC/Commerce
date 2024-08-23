import { useQuery } from "@tanstack/react-query";
import { supabase } from "../../entities/@db/supabase.config";
import { ProductImage } from "./type";

const baseUrl = import.meta.env.VITE_BUCKET_BASE_URL as string;

export const getProductImage = async (
  productId: number
): Promise<ProductImage[]> => {
  const res = await supabase
    .from("product_image")
    .select("*")
    .eq("productId", productId);

  if (res.data === null) return [];

  return res.data.map((img) => ({
    ...img,
    imgUrl: baseUrl + "/" + img.imgUrl,
  }));
};

export const useProductImageQuery = (productId: number | undefined) => {
  return useQuery({
    queryKey: ["product_image", productId],
    queryFn: () => getProductImage(productId!),
    staleTime: Infinity,
    enabled: !!productId,
  });
};
