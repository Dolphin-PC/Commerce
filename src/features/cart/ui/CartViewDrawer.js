import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H4 } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";
import { ROUTES } from "@/shared/consts/route.const";
import { useMemo } from "react";
import { Link } from "react-router-dom";
import Cart from "./Cart";
import { Card } from "@/shared/components/ui/card";
import CartOptionMenu from "./CartOptionMenu";
/**
 * @desc 장바구니 Drawer (오른쪽)
 */
const CartViewDrawer = ({ data, trigger }) => {
    const totalPrice = useMemo(() => data.reduce((acc, cur) => {
        if (cur.product === null)
            return acc;
        return acc + cur.product.price * cur.quantity;
    }, 0), [data]);
    return (_jsxs(Drawer, { direction: "right", handleOnly: true, children: [_jsx(DrawerTrigger, { asChild: true, children: trigger }), _jsxs(DrawerContent, { className: "w-1/2", direction: "right", children: [_jsxs(DrawerHeader, { children: [_jsx(DrawerTitle, { children: "\uB0B4 \uC7A5\uBC14\uAD6C\uB2C8" }), _jsx(DrawerDescription, { children: "\uB0B4\uAC00 \uB2F4\uC740 \uC0C1\uD488\uB4E4" })] }), _jsx(Column, { className: "ml-2 mr-2 gap-2 overflow-scroll scrollbar-hide", children: data.map((cart) => (_jsx(Cart, { cart: cart, children: _jsxs(Card, { children: [_jsx(CartOptionMenu, { cart: cart }), _jsx(Cart.Product, {})] }) }, cart.id))) }), _jsxs(DrawerFooter, { children: [_jsxs(Row, { className: "items-center gap-3", children: [_jsx(Badge, { children: "\uCD1D \uAC00\uACA9" }), _jsxs(H4, { children: [totalPrice.toLocaleString("ko-KR"), " \uC6D0"] })] }), _jsx(Button, { asChild: true, children: _jsx(Link, { to: ROUTES.CART, children: "\uC7A5\uBC14\uAD6C\uB2C8 \uBCF4\uAE30" }) }), _jsx(Button, { variant: "outline", asChild: true, children: _jsx(DrawerClose, { children: "\uB2EB\uAE30" }) })] })] })] }));
};
export default CartViewDrawer;
