import { User } from "@supabase/supabase-js";
/**
 * Auth 정보 조회
 */
interface Return {
    user: User | null;
}
export declare const getAuthUser: () => Promise<Return>;
export {};
