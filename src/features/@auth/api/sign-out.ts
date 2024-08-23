import { supabase } from "../../../shared/config/@db/supabase.config";

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};
