import { supabase } from "@/shared/config/@db/supabase.config";
import { User } from "../model/type";

/**
 * 사용자 정보 조회
 */

//* 추상
interface Props {
  email: string;
}

interface Return {
  data: User;
}


//* 구현
export const getUserInfo = async ({email}:Props): Promise<Return> => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("email", email)
    .maybeSingle();

  if (error) throw error;
  if (!data) throw new Error("사용자를 찾을 수 없습니다.");

  return {data};
};
