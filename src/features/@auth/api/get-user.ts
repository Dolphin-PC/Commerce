import { supabase } from "@/shared/config/@db/supabase.config";
import { User } from "@supabase/supabase-js";

/**
 * Auth 정보 조회
 */

interface Return {
  user: User | null;
}

export const getAuthUser = async (): Promise<Return> => {
  const { data, error } = await supabase.auth.getUser();

  if (error) throw error;

  return data;
};
