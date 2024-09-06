import { Order } from "@/features/order/type";
import { PayHistory } from "@/features/pay_history/type";
import { supabase } from "@/shared/config/@db/supabase.config";

/**
 * @desc paymentId로 주문 조회
 */

interface Props {
  paymentId: PayHistory["paymentId"];
}

interface Return extends Order {}

export const getOrderByPaymentId = async ({ paymentId }: Props): Promise<Return> => {
  const q = supabase.from("pay_history").select("*, order(*)").eq("paymentId", paymentId).single();

  const { data, error } = await q;
  if (error) throw error;
  if (!data) throw Error("결제 내역이 조회되지 않았어요.");
  if (!data.order) throw Error("주문이 조회되지 않았어요.");

  return data.order;
};
