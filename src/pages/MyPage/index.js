import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartListQuery } from "@/features/cart/api/get_list-cart";
import { useGetOrderListQuery } from "@/features/order/api/get-order_list";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H3, H4, Muted } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import Header from "@/widgets/Header";
import MainLayout from "@/widgets/MainLayout";
import { ShoppingBag, ShoppingCart, UserRound } from "lucide-react";
import { cloneElement } from "react";
import { Link } from "react-router-dom";
const _MyPage = () => {
    const user = useAuthStore((state) => state.getUser());
    const { data: cartData } = useCartListQuery({ userId: user.id });
    const { data: orderData } = useGetOrderListQuery({ userId: user.id });
    return (_jsxs(Row, { className: "gap-5", children: [_jsx(Card, { className: "w-1/2 p-8 h-fit", children: _jsxs(Row, { className: "justify-between", children: [_jsxs(Row, { className: "items-center gap-2", children: [_jsx(UserRound, { size: 52, color: "white", className: "bg-slate-400 rounded-full p-2" }), _jsxs(H4, { children: [user.nickname, " \uB2D8"] })] }), _jsx(Button, { variant: "outline", children: "\uB0B4 \uC815\uBCF4 \uC218\uC815" })] }) }), _jsx(Card, { className: "w-1/2 p-8", children: _jsxs(Column, { className: "gap-5", children: [orderData && _jsx(IconWrapper, { icon: _jsx(ShoppingBag, {}), label: "\uC8FC\uBB38 \uB0B4\uC5ED", count: orderData.length, link: ROUTES.MY__ORDERS }), cartData && _jsx(IconWrapper, { icon: _jsx(ShoppingCart, {}), label: "\uC7A5\uBC14\uAD6C\uB2C8", count: cartData.length, link: ROUTES.CART })] }) })] }));
};
const IconWrapper = ({ icon, label, count, link }) => {
    return (_jsx(Link, { to: link, children: _jsxs(Row, { className: "gap-3 items-center", children: [_jsx("div", { className: "flex items-center justify-center w-16 h-16 bg-slate-200 rounded-full p-3", children: cloneElement(icon, { size: 24 }) }), _jsxs(Column, { children: [_jsx(Muted, { children: label }), _jsx(H3, { children: count })] })] }) }));
};
export default function MyPage() {
    return (_jsx(MainLayout, { headerChildren: _jsx(Header, {}), children: _jsx(_MyPage, {}) }));
}
