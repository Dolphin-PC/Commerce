
/** 
 * 카테고리 이름으로 목록 조회
 */

import { supabase } from "@/shared/config/@db/supabase.config";
import { Category } from "../model/type";
import { Tables } from "@/shared/config/@db/database-generated.type";


interface Props {
    categoryName?: Tables<"category">["categoryName"]
}

type Return = Category[]



export const getCategoryList = async ({categoryName}:Props): Promise<Return> => {
    const res = await supabase
      .from("category")
      .select("*")
      .like("categoryName", `%${categoryName ?? ""}%`);
  
    return res.data ?? [];
  };