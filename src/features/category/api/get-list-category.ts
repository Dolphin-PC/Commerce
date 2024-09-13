import { supabase } from "@/shared/config/@db/supabase.config";
import { Category } from "../model/type";
import { Tables } from "@/shared/config/@db/database-generated.type";
import { useQuery } from "@tanstack/react-query";
import { queryKey } from "@/shared/consts/react-query";

/**
 * 카테고리 이름으로 카테고리 목록 조회
 */

interface Props {
  categoryName?: Tables<"category">["categoryName"];
}

interface Return extends Category {}

export const getCategoryList = async ({ categoryName }: Props): Promise<Return[]> => {
  let q = supabase.from("category").select("*");

  if (categoryName) q = q.like("categoryName", `%${categoryName ?? ""}%`);

  const { data, error } = await q;
  if (error) throw error;

  return data;
};

export const useCategoryListQuery = (props: Props) => {
  return useQuery({
    queryKey: [queryKey.category_list, { ...props }],
    queryFn: () => getCategoryList(props),
    staleTime: Infinity,
  });
};
