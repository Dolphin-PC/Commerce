import { supabase } from "@/shared/config/@db/supabase.config";
import { User } from "@supabase/supabase-js";

/**
 * Auth 정보 조회
 */

interface Return {
  user: User | null;
}

export const getAuthUser = async (): Promise<Return> => {
  const session = await supabase.auth.getSession();

  if (!session.data.session) return { user: null };

  const { data, error } = await supabase.auth.getUser();
  supabase.auth.reauthenticate;

  if (error) throw error;

  return data;
};
