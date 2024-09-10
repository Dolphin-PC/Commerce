import { User } from "@/features/user/model/type";
import { Order } from "../type";
/**
 * @desc 주문 get API
 */
interface Props {
    userId: User["id"];
    orderId: Order["id"];
}
interface Return extends Order {
}
export declare const getOrder: ({ orderId, userId }: Props) => Promise<Return>;
export declare const useGetOrderSuspenseQuery: (props: Props) => import("@tanstack/react-query").UseSuspenseQueryResult<Return, Error>;
export {};
