import { Enums, Tables, TablesInsert, TablesUpdate } from "@/shared/config/@db/database-generated.type";

export type Order = Tables<"order">;
export type OrderInsert = TablesInsert<"order">;
export type OrderUpdate = TablesUpdate<"order">;

export type OrderStatus = Enums<"ORDER_STATUS">;
