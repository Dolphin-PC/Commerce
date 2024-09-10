import { User } from "@/features/user/model/type";
import { Cart } from "../type";
/**
 * @desc 장바구니 목록 조회
 */
interface Props {
    userId: User["id"];
}
type Return = Cart[];
export declare const useCartListQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};
