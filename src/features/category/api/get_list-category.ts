/**
 * 카테고리 이름으로 목록 조회
 */

import { supabase } from "@/shared/config/@db/supabase.config";
import { Category } from "../model/type";
import { Tables } from "@/shared/config/@db/database-generated.type";
import { useQuery } from "@tanstack/react-query";
import { K } from "@/shared/consts/queryKey";

interface Props {
  categoryName?: Tables<"category">["categoryName"];
}

type Return = Category[];

export const getCategoryList = async ({ categoryName }: Props): Promise<Return> => {
  const res = await supabase
    .from("category")
    .select("*")
    .like("categoryName", `%${categoryName ?? ""}%`);

  return res.data ?? [];
};

export const useCategoryListQuery = (props: Props) => {
  return useQuery({
    queryKey: [K.category_list, { ...props }],
    queryFn: () => getCategoryList(props),
    staleTime: Infinity,
  });
};
