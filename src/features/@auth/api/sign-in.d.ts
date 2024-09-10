import { User } from "@supabase/supabase-js";
/**
 * 사용자 로그인
 */
interface Props {
    email: string;
    password: string;
}
type Return = User;
export declare const signInWithPassword: ({ email, password, }: Props) => Promise<Return>;
export {};
