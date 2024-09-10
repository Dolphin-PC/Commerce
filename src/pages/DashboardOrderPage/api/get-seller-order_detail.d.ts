import { Order } from "@/features/order/type";
import { OrderDetail } from "@/features/order_detail/type";
import { PayHistory } from "@/features/pay_history/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
/**
 * @desc 판매자 상품 주문 내역 조회
 */
interface Props {
    sellerId: User["id"];
    orderStatus: Order["status"] | null;
    orderDetailStatus: OrderDetail["status"] | null;
}
interface Return extends OrderDetail {
    product: Product;
    order: Order & {
        payHistory: PayHistory | null;
    };
}
export declare const useGetSellerOrderDetailQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return[], Error>;
export {};
