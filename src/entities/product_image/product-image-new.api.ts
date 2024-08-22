import { supabase } from "../@db/supabase.config";
import { uploadImage } from "../@storage/storage-upload.api";

export const addProductImage = async (productId: number, file: File) => {
  const fullPath = await uploadImage(file, productId);

  const { data: productImage, error } = await supabase
    .from("product_image")
    .insert({
      productId,
      imgUrl: fullPath,
    });

  if (error) {
    throw error;
  }
  return productImage;
};
