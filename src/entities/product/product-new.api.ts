import { supabase } from "../@db/supabase.config";
import { Database } from "../@db/supabase.types";

export const addProduct = async (
  insertData: Database["public"]["Tables"]["product"]["Insert"]
) => {
  const { data, error } = await supabase
    .from("product")
    .insert([insertData])
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};
