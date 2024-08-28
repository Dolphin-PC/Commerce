import { upload } from "@/features/@storage/storage.api";
import { supabase } from "@/shared/config/@db/supabase.config";
import { ProductImage } from "../type/type";

/**
 * 제품이미지 등록
 */

interface Props {
  productId: number;
  file: File;
}

type Return = ProductImage | null;

export const addProductImage = async ({ file, productId }: Props): Promise<Return> => {
  const fullPath = await upload(file, productId);

  const { data: productImage, error } = await supabase.from("product_image").insert({
    productId,
    imgUrl: fullPath,
  });

  if (error) {
    throw error;
  }
  return productImage;
};
