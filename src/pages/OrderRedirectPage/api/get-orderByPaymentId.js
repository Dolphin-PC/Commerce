import { supabase } from "@/shared/config/@db/supabase.config";
export const getOrderByPaymentId = async ({ paymentId }) => {
    const q = supabase.from("pay_history").select("*, order(*)").eq("paymentId", paymentId).single();
    const { data, error } = await q;
    if (error)
        throw error;
    if (!data)
        throw Error("결제 내역이 조회되지 않았어요.");
    if (!data.order)
        throw Error("주문이 조회되지 않았어요.");
    return data.order;
};
