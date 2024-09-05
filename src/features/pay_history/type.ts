import { Enums, Tables, TablesInsert } from "@/shared/config/@db/database-generated.type";

export type PayHistory = Tables<"pay_history">;
export type PayHistoryInsert = TablesInsert<"pay_history">;

export type PayMethod = Enums<"PAY_METHOD">;
export type ChannelType = Enums<"CHANNEL_TYPE">;
