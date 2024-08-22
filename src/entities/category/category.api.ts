import { supabase } from "../@db/supabase.config";
import { Category } from "./type";

export const getCategoryList = async (
  categoryName?: string
): Promise<Category[]> => {
  const res = await supabase
    .from("category")
    .select("*")
    .like("categoryName", `%${categoryName ?? ""}%`);

  return res.data ?? [];
};
