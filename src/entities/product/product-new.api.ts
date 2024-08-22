import { supabase } from "../@db/supabase.config";
import { Database } from "../@db/supabase.types";

export const addProduct = async (
  data: Database["public"]["Tables"]["product"]["Insert"]
) => {
  const res = supabase.from("product").insert([data]).select();

  return res;
};
