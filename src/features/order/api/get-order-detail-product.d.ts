import { Order, OrderStatus } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { PayHistory } from "@/features/pay_history/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
/**
 * @desc 주문 > [주문상세 > 상품 정보] 단건 조회
 *  - order > order_detail > product
 */
interface Props {
    orderId: Order["id"];
    userId: User["id"];
    status?: OrderStatus;
}
interface Return extends Order {
    orderDetails: (OrderDetail & {
        product: Product & {
            seller: User;
        };
    })[];
    payHistory: PayHistory | null;
}
export declare const useGetOrderDetailProductSuspenseQuery: (props: Props) => import("@tanstack/react-query").UseSuspenseQueryResult<Return, Error>;
export {};
