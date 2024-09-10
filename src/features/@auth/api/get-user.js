import { supabase } from "@/shared/config/@db/supabase.config";
export const getAuthUser = async () => {
    const session = await supabase.auth.getSession();
    if (!session.data.session)
        return { user: null };
    const { data, error } = await supabase.auth.getUser();
    supabase.auth.reauthenticate;
    if (error)
        throw error;
    return data;
};
