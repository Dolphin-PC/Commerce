import { supabase } from "../@db/supabase.config";

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};
