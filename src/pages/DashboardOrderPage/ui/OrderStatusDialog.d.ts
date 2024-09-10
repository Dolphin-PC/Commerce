import { OrderDetail } from "@/features/order_detail/type";
interface Props {
    orderDetail: OrderDetail;
}
/**
 * @desc 주문내역 > 주문상태 변경 다이얼로그
 */
declare const OrderStatusDialog: ({ orderDetail }: Props) => import("react/jsx-runtime").JSX.Element;
export default OrderStatusDialog;
