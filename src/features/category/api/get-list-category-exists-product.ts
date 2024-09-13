import { supabase } from "@/shared/config/@db/supabase.config";
import { queryKey, staleTime } from "@/shared/consts/react-query";
import { useQuery } from "@tanstack/react-query";
import { Category } from "../model/type";

/**
 * 상품이 존재하는 카테고리 목록 조회
 */

interface Return extends Category {
  product: {
    count: number;
  }[];
}

export const getCategoryListOnExistsProduct = async (): Promise<Return[]> => {
  let q = supabase.from("category").select("*, product(count)");

  const { data, error } = await q;
  if (error) throw error;

  return data.filter((d) => d.product[0].count > 0);
};

export const useGetCategoryListOnExistsProduct = () => {
  return useQuery({
    queryKey: [queryKey.category_list],
    queryFn: () => getCategoryListOnExistsProduct(),
    staleTime: staleTime.category,
  });
};
