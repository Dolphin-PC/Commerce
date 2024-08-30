import { supabase } from "../../shared/config/@db/supabase.config";
import { productImageBuket } from "./storage.const";

/**
 * @desc 업로드
 */
export const upload = async (file: File, productId: number): Promise<string> => {
  const fileName = `${productId}/${productId}_${Date.now()}`;

  const { data, error } = await supabase.storage.from(productImageBuket).upload(fileName, file);

  if (error) throw error;

  return data.fullPath;
};

/**
 * @desc 업로드 삭제
 */
export const deleteUpload = async (fullPaths: string[]): Promise<void> => {
  fullPaths = fullPaths.map((fullPath) => fullPath.replace(`${productImageBuket}/`, ""));
  const { data, error } = await supabase.storage.from(productImageBuket).remove(fullPaths);

  console.log({ data, error });

  if (error) throw error;
};
