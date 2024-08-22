import { supabase } from "../@db/supabase.config";
import { productImageBuket } from "./storage.const";

export const uploadImage = async (
  file: File,
  productId: number
): Promise<string> => {
  const fileName = `${productId}_${Date.now()}`;

  const { data, error } = await supabase.storage
    .from(productImageBuket)
    .upload(fileName, file);

  if (error) throw error;

  return data.fullPath;
};
