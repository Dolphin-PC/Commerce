import { CartProductCategory } from "@/features/cart/type";
import { OrderDetail } from "@/features/order_detail/type";
import { Order } from "../../features/order/type";
import { Product } from "@/features/product/type/type";
import { User } from "@/features/user/model/type";
interface Return {
    /** 장바구니를 통한 Order생성 */
    handleNewOrderByCart: (cartList: CartProductCategory[]) => Promise<Order>;
    handleNewOrder: ({ userId, productId, quantity }: handleNewOrderProps) => Promise<{
        order: Order;
        orderDetail: OrderDetail;
    }>;
}
interface handleNewOrderProps {
    userId: User["id"];
    productId: Product["id"];
    quantity: OrderDetail["quantity"];
}
/**
 * @desc 주문 생성 Hooks
 *  1. 주문::생성
 *  2. 주문상세::생성
 *  3. 상품::재고 수량 감소
 *  4. 장바구니::해당 상품 삭제
 */
export declare const useNewOrderHook: () => Return;
export {};
