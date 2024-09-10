import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { orderStatusObj } from "@/features/order/const/orderStatus";
import { orderDetailStatusObj } from "@/features/order_detail/const/orderDetailStatus";
import BadgeRowLead from "@/shared/components/atoms/BadgeRowLead";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { T } from "@/shared/components/atoms/Typography";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { formatDate, parseDate } from "@/shared/lib/date";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useGetSellerOrderDetailQuery } from "./api/get-seller-order_detail";
import OrderStatusDialog from "./ui/OrderStatusDialog";
/**
 * @desc 판매자 주문(상세) 페이지
 *  - /dashboard/orders
 */
const _DashboardOrderPage = () => {
    const user = useAuthStore((state) => state.getUser());
    const [orderStatus, setOrderStatus] = useState(null);
    const [orderDetailStatus, setOrderDetailStatus] = useState(null);
    const { data: orderDetails } = useGetSellerOrderDetailQuery({ sellerId: user.id, orderStatus, orderDetailStatus });
    return (_jsxs(Fragment, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "\uC8FC\uBB38 \uB0B4\uC5ED" }), _jsxs(Card, { className: "p-4", children: [_jsx(T.Large, { children: "\uACB0\uC81C\uC0C1\uD0DC" }), _jsxs(Row, { className: "gap-3 flex-wrap", children: [_jsx(Button, { variant: orderStatus === null ? "default" : "outline", onClick: () => setOrderStatus(null), children: "\uC804\uCCB4" }), Object.entries(orderStatusObj).map(([key, value]) => {
                                        if (value === "")
                                            return null;
                                        return (_jsx(Button, { variant: orderStatus === key ? "default" : "outline", onClick: () => setOrderStatus(key), children: value }, `btn-${key}`));
                                    })] })] }), _jsxs(Card, { className: "p-4", children: [_jsx(T.Large, { children: "\uC8FC\uBB38\uC0C1\uD0DC" }), _jsxs(Row, { className: "gap-3 flex-wrap", children: [_jsx(Button, { variant: orderDetailStatus === null ? "default" : "outline", onClick: () => setOrderDetailStatus(null), children: "\uC804\uCCB4" }), Object.entries(orderDetailStatusObj).map(([key, value]) => {
                                        return (_jsx(Button, { variant: orderDetailStatus === key ? "default" : "outline", onClick: () => setOrderDetailStatus(key), children: value }, `btn-${key}`));
                                    })] })] })] }), _jsx(CardContent, { className: "flex flex-col gap-5", children: orderDetails &&
                    orderDetails.map((orderDetail) => {
                        console.log({ orderDetail });
                        return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(Row, { className: "items-start justify-between px-2", children: [_jsxs(Column, { className: "gap-3", children: [_jsx(BadgeRowLead, { badge: "\uAD6C\uB9E4\uC790 | \uACB0\uC81C\uC0C1\uD0DC", lead: orderStatusObj[orderDetail.order.status] }), _jsx(BadgeRowLead, { badge: "\uD310\uB9E4\uC790 | \uC8FC\uBB38\uC0C1\uD0DC", lead: orderDetailStatusObj[orderDetail.status] })] }), _jsx(OrderStatusDialog, { orderDetail: orderDetail }, orderDetail.id)] }) }), _jsxs(CardContent, { className: "flex flex-col gap-3", children: [_jsx(BadgeRowLead, { badge: "\uC8FC\uBB38\uBC88\uD638", lead: String(orderDetail.orderId) }), _jsxs(Row, { className: "gap-3", children: [_jsx(BadgeRowLead, { badge: "\uC0C1\uD488\uBA85", lead: orderDetail.product.name }), _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS_ID_(orderDetail.productId), children: _jsx(T.Small, { children: "\uC0C1\uD488 \uBCF4\uAE30" }) })] }), _jsx(BadgeRowLead, { badge: "\uC8FC\uBB38\uC218\uB7C9", lead: `${orderDetail.quantity.toLocaleString("ko-KR")}개` }), _jsx(BadgeRowLead, { badge: "\uC8FC\uBB38\uC77C\uC2DC", lead: `${formatDate(parseDate(orderDetail.order.createdAt))}` }), orderDetail.order.payHistory && _jsx(BadgeRowLead, { badge: "\uACB0\uC81C\uC77C\uC2DC", lead: `${formatDate(parseDate(orderDetail.order.payHistory.createdAt))}` })] })] }, orderDetail.id));
                    }) })] }));
};
export default function DashboardOrderPage() {
    return (_jsx(DashBoardLayout, { children: _jsx(_DashboardOrderPage, {}) }));
}
