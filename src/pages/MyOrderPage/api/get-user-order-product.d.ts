import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { PayHistory } from "@/features/pay_history/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
/**
 * @desc 사용자 > 주문 > [주문상세 > 상품 정보] 목록 조회
 *  - user > order > order_detail > product
 */
interface Props {
    userId: User["id"];
}
interface Return extends Order {
    orderDetails: (OrderDetail & {
        product: {
            name: Product["name"];
            sellerId: Product["sellerId"];
        } & {
            seller: {
                nickname: User["nickname"];
            };
        };
    })[];
    payHistory: PayHistory | null;
}
export declare const useGetUserOrderProductQuery: (props: Props) => import("@tanstack/react-query").UseSuspenseQueryResult<Return[], Error>;
export {};
