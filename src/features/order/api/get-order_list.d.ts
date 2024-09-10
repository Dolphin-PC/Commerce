import { User } from "@/features/user/model/type";
import { Order } from "../type";
/**
 * @desc 주문목록 get API
 */
interface Props {
    userId: User["id"];
}
type Return = Order[];
export declare const useGetOrderListQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};
