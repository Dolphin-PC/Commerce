import { User } from "../model/type";
/**
 * 사용자 정보 조회
 */
interface Props {
    id: string;
}
type Return = User | null;
export declare const getUserInfo: ({ id }: Props) => Promise<Return>;
export {};
