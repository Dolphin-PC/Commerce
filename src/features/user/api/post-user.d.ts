import { User, UserInsert } from "../model/type";
type Props = UserInsert;
type Return = User | null;
export declare const addNewUser: ({ email, id, isseller, nickname }: Props) => Promise<Return>;
export {};
