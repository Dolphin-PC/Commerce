import { useQuery } from "@tanstack/react-query";
import { supabase } from "../@db/supabase.config";
import { Category } from "./type";

/** 카테고리 이름으로 목록 조회 */
export const getCategoryList = async (
  categoryName?: string
): Promise<Category[]> => {
  const res = await supabase
    .from("category")
    .select("*")
    .like("categoryName", `%${categoryName ?? ""}%`);

  return res.data ?? [];
};

const getCategoryById = async (id: number): Promise<Category | null> => {
  const res = await supabase.from("category").select("*").eq("id", id).single();

  return res.data;
};

export const useCategoryQuery = (id: number | undefined) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategoryById(id!),
    staleTime: Infinity,
    enabled: !!id,
  });
};
