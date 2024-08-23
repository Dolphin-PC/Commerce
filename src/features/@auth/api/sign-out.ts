import { supabase } from "../../../shared/config/@db/supabase.config";

/**
 * 사용자 로그아웃
 */

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};
