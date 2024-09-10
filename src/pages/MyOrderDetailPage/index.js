import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MainLayout from "@/widgets/MainLayout";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailProductSuspenseQuery } from "../../features/order/api/get-order-detail-product";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import Column from "@/shared/components/atoms/Column";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { formatDate, parseDate } from "@/shared/lib/date";
import { T } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
import { ROUTES } from "@/shared/consts/route.const";
import { Button } from "@/shared/components/ui/button";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { useRefundRequestHook } from "./hook/useRefundRequestHook";
import { toast } from "@/shared/components/ui/use-toast";
import { orderStatusObj } from "@/features/order/const/orderStatus";
import Row from "@/shared/components/atoms/Row";
/**
 * @desc 내 주문 상세 페이지
 *  - /my/orders/:id
 */
const _MyOrderDetailPage = () => {
    const { id } = useParams();
    const orderId = Number(id);
    const user = useAuthStore((state) => state.getUser());
    const { data: orderData } = useGetOrderDetailProductSuspenseQuery({ orderId, userId: user.id });
    const { requestRefund } = useRefundRequestHook();
    const handleRequestRefund = async () => {
        await requestRefund({ orderId });
        toast({ title: "환불 요청이 완료되었습니다." });
    };
    return (_jsxs(Column, { className: "gap-5", children: [_jsxs(Row, { className: "items-center justify-between", children: [_jsx(Button, { variant: "link", asChild: true, className: "w-fit", children: _jsx(Link, { to: ROUTES.MY__ORDERS, children: "\uAD6C\uB9E4\uBAA9\uB85D" }) }), orderData.status === "PAY_BEFORE" && (_jsx(Button, { variant: "default", asChild: true, className: "w-fit", children: _jsx(Link, { to: ROUTES.ORDERS_ID_(String(orderId)), children: "\uACB0\uC81C\uD558\uAE30" }) }))] }), orderData.payHistory && (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\uACB0\uC81C\uC815\uBCF4" }) }), _jsxs(CardContent, { className: "flex flex-col gap-3", children: [_jsx(T.Muted, { children: formatDate(parseDate(orderData.payHistory.createdAt)) }), _jsx(BadgeRowLead, { badge: "\uACB0\uC81C\uBC88\uD638", lead: orderData.payHistory.paymentId }), _jsx(BadgeRowLead, { badge: "\uACB0\uC81C\uAC00\uACA9", lead: `${orderData.payHistory.payAmount?.toLocaleString("ko-KR")}원` })] }), _jsxs(CardFooter, { className: "flex-col", children: [orderData.status === "PAY_COMPLETE_CONFIRM" && (_jsx(ConfirmDialog, { title: "\uD658\uBD88 \uC694\uCCAD", description: "\uD658\uBD88 \uC694\uCCAD\uC744 \uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", confirmText: "\uC694\uCCAD", confirmAction: handleRequestRefund, cancelText: "\uCDE8\uC18C", cancelAction: () => { }, triggerComponent: _jsx(Button, { variant: "secondary", className: "w-full", children: "\uD658\uBD88\uC694\uCCAD" }) })), orderData.status === "REFUND_REQUEST" && _jsx(T.Blockquote, { className: "w-full", children: "\uD310\uB9E4\uC790\uAC00 \uD658\uBD88\uC694\uCCAD\uC744 \uD655\uC778\uD558\uACE0 \uC788\uC5B4\uC694." })] })] })), _jsxs(Card, { className: "px-3 flex flex-col gap-3", children: [_jsxs(CardHeader, { className: "flex flex-row items-center gap-3", children: [_jsx(CardTitle, { children: "\uC8FC\uBB38 \uC815\uBCF4" }), _jsx(Badge, { className: "w-fit", children: orderStatusObj[orderData.status] })] }), _jsxs(CardContent, { className: "flex flex-col gap-3", children: [_jsx(T.H4, { children: orderData.orderName }), orderData.shipAddress && _jsx(BadgeRowLead, { badge: "\uBC30\uC1A1\uC9C0", lead: orderData.shipAddress })] }), _jsx("hr", {}), _jsx(CardContent, { className: "flex flex-col gap-3", children: orderData.orderDetails.map((orderDetail) => {
                            const q = orderDetail.quantity;
                            const p = orderDetail.product.price;
                            const total = q * p;
                            return (_jsxs(Card, { className: "p-4 flex flex-col gap-3", children: [_jsx(T.H4, { children: orderDetail.product.name }), _jsx(BadgeRowLead, { badge: "\uC218\uB7C9/\uB2E8\uAC00", lead: `${q.toLocaleString("ko-KR")}개 / ${p.toLocaleString("ko-KR")}원` }), _jsx(BadgeRowLead, { badge: "\uCD1D \uAC00\uACA9", lead: `${total.toLocaleString("ko-KR")}원` }), _jsx(BadgeRowLead, { badge: "\uD310\uB9E4\uC790", lead: orderDetail.product.seller.nickname ?? "" })] }, orderDetail.id));
                        }) })] })] }));
};
export default function MyOrderDetailPage() {
    return (_jsx(MainLayout, { children: _jsx(_MyOrderDetailPage, {}) }));
}
