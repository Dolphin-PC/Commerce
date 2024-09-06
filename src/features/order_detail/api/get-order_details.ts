import { supabase } from "@/shared/config/@db/supabase.config";
import { OrderDetail } from "../type";

/**
 * @desc 주문 상세 get API
 */

interface Props {
  orderId: number;
}

interface Return {
  data: OrderDetail[];
}

export const getOrderDetails = async ({ orderId }: Props): Promise<Return> => {
  const q = supabase.from("order_detail").select().eq("orderId", orderId);

  const { data, error } = await q;
  if (error) throw error;

  return { data };
};
