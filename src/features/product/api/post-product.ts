import { supabase } from "@/shared/config/@db/supabase.config";
import { Product, ProductInsert } from "../type/type";

/**
 * 제품 등록 
 */

type Props = ProductInsert;

type Return = Product | null


export const addProduct = async (insert:Props):Promise<Return> => {
  const { data, error } = await supabase
    .from("product")
    .insert([insert])
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data
};
