import { supabase } from "@/shared/config/@db/supabase.config";
import { User } from "../model/type";

/**
 * 사용자 정보 조회
 */

//* 추상
interface Props {
  id: string;
}

type Return = User | null;


//* 구현
export const getUserInfo = async ({id}:Props): Promise<Return> => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;

  return data;
};
