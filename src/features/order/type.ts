import { Enums, Tables, TablesInsert } from "@/shared/config/@db/database-generated.type";

export type Order = Tables<"order">;
export type OrderInsert = TablesInsert<"order">;

/**
 * @desc 주문 상태
 */
export const orderStatus: Record<Enums<"ORDER_STATUS">, Enums<"ORDER_STATUS">> = {
  PAY_BEFORE: "PAY_BEFORE",
  PAY_COMPLETE: "PAY_COMPLETE",
  REFUND_COMPLETE: "REFUND_COMPLETE",
  REFUND_REQUEST: "REFUND_REQUEST",
  SHIPPING: "SHIPPING",
  SELLER_CONFIRM: "SELLER_CONFIRM",
  SHIP_COMPLETE: "SHIP_COMPLETE",
};
