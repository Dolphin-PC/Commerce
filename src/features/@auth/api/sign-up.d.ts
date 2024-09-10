import { Session, User } from "@supabase/supabase-js";
interface Props {
    email: string;
    password: string;
}
interface Return {
    user: User | null;
    session: Session | null;
}
export declare const signup: ({ email, password, }: Props) => Promise<Return>;
export {};
