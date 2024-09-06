import { Tables, TablesInsert, TablesUpdate } from "@/shared/config/@db/database-generated.type";

export type OrderDetail = Tables<"order_detail">;
export type OrderDetailInsert = TablesInsert<"order_detail">;
export type OrderDetailUpdate = TablesUpdate<"order_detail">;
