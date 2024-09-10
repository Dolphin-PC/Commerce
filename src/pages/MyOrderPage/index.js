import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { genOrderName } from "@/features/@portOne/gen-order-name";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H4, Muted } from "@/shared/components/atoms/Typography";
import { CenterLoading } from "@/shared/components/molecules/Loading";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { formatDate, parseDate } from "@/shared/lib/date";
import Header from "@/widgets/Header";
import MainLayout from "@/widgets/MainLayout";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import { useGetUserOrderProductQuery } from "./api/get-user-order-product";
import { ROUTES } from "@/shared/consts/route.const";
import { orderStatusObj } from "@/features/order/const/orderStatus";
/**
 * @desc 내 주문내역
 *  - /my/orders
 */
const _MyOrderPage = () => {
    const user = useAuthStore((state) => state.getUser());
    const { data: orderData, isLoading } = useGetUserOrderProductQuery({ userId: user.id });
    if (isLoading)
        return _jsx(CenterLoading, {});
    if (!orderData)
        return _jsx(Muted, { children: "\uC8FC\uBB38 \uB0B4\uC5ED\uC774 \uC5C6\uC5B4\uC694." });
    return (_jsx(Column, { className: "gap-3", children: orderData.map((order) => {
            const productNames = order.orderDetails.map((detail) => detail.product.name);
            const productName = genOrderName({ productNames });
            return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(Row, { className: "items-center justify-between", children: [_jsx(Badge, { variant: "outline", size: "large", children: orderStatusObj[order.status] }), _jsx(Button, { variant: "link", asChild: true, className: "w-fit", children: _jsx(Link, { to: ROUTES.MY__ORDERS_ID_(String(order.id)), children: "\uACB0\uC81C\uC0C1\uC138" }) })] }) }), _jsx(CardContent, { children: _jsxs(Column, { className: "gap-2", children: [_jsx(H4, { children: productName }), _jsxs(Row, { className: "items-center gap-2", children: [_jsx(Badge, { children: "\uC8FC\uBB38\uBC88\uD638" }), _jsx(Muted, { children: order.id })] }), order.payHistory && (_jsxs(Fragment, { children: [_jsxs(Row, { className: "items-center gap-2", children: [_jsx(Badge, { children: "\uACB0\uC81C\uAE08\uC561" }), _jsxs(Muted, { children: [order.payHistory.payAmount?.toLocaleString("ko-KR"), " \uC6D0"] })] }), _jsxs(Row, { className: "items-center gap-2", children: [_jsx(Badge, { children: "\uACB0\uC81C\uC77C\uC2DC" }), _jsx(Muted, { children: formatDate(parseDate(order.payHistory.createdAt)) })] })] }))] }) })] }, order.id));
        }) }));
};
export default function MyOrderPage() {
    return (_jsx(MainLayout, { headerChildren: _jsx(Header, {}), subHeaderChildren: _jsx("div", { className: "w-full bg-slate-100 text-center p-2", children: _jsx(Muted, { children: "\uC8FC\uBB38 \uB0B4\uC5ED \uC870\uD68C" }) }), children: _jsx(_MyOrderPage, {}) }));
}
