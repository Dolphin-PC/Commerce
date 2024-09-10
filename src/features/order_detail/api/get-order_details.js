import { supabase } from "@/shared/config/@db/supabase.config";
export const getOrderDetails = async ({ orderId }) => {
    const q = supabase.from("order_detail").select().eq("orderId", orderId);
    const { data, error } = await q;
    if (error)
        throw error;
    return data;
};
