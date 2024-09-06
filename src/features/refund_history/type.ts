import { Tables, TablesInsert } from "@/shared/config/@db/database-generated.type";

export interface RefundHistory extends Tables<"refund_history"> {}
export interface RefundHistoryInsert extends TablesInsert<"refund_history"> {}
