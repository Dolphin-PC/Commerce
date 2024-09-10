import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { useCartProductCategoryQuery } from "@/features/cart/api/get_list-cart_product_category";
import Cart from "@/features/cart/ui/Cart";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { H3, H4 } from "@/shared/components/atoms/Typography";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { ROUTES } from "@/shared/consts/route.const";
import MainLayout from "@/widgets/MainLayout";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useCartHook } from "./hook/useCartHook";
/**
 * @desc 장바구니 화면
 */
const _CartPage = () => {
    const user = useAuthStore((state) => state.getUser());
    const { data: cartList } = useCartProductCategoryQuery({ userId: user.id });
    const { checkedAll, checkedCartList, handleCheckedAll, handleCheckedChange, handleDeleteCartList, handleOrder } = useCartHook();
    return (_jsxs(Fragment, { children: [_jsxs(Column, { className: "gap-2 mb-20", children: [_jsx(H3, { children: "\uC7A5\uBC14\uAD6C\uB2C8" }), cartList && cartList.length > 0 && (_jsxs(Fragment, { children: [_jsxs(Row, { className: "items-center gap-2 justify-end", children: [_jsx("label", { htmlFor: "all-carts", children: _jsx(H4, { children: "\uC804\uCCB4 \uC120\uD0DD" }) }), _jsx(Checkbox, { id: "all-carts", className: "h-6 w-6", checked: checkedAll, onCheckedChange: handleCheckedAll(cartList) })] }), _jsx(Column, { className: "gap-3", children: cartList.map((cart) => (_jsx(Cart, { cart: cart, children: _jsx(Card, { children: _jsxs(Row, { className: "items-center justify-between mr-4", children: [_jsx(Link, { to: ROUTES.PRODUCTS_ID_(cart.productId), children: _jsx(Cart.Product, {}) }), _jsx(Checkbox, { id: "all-carts", className: "h-6 w-6", onCheckedChange: handleCheckedChange(cart), checked: !!checkedCartList.find((e) => e.id === cart.id) })] }) }) }, cart.id))) })] }))] }), _jsx("div", { className: "fixed left-1/2 -translate-x-1/2 bottom-0 w-full bg-white container p-4", style: { boxShadow: "0px -1px 0px 0px gray" }, children: _jsxs(Row, { className: "justify-between ", children: [_jsx(ConfirmDialog, { title: "\uC7A5\uBC14\uAD6C\uB2C8 \uC0AD\uC81C", description: "\uC815\uB9D0 \uC0AD\uC81C\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?", cancelText: "\uCDE8\uC18C", cancelAction: () => { }, confirmAction: handleDeleteCartList, confirmText: "\uC0AD\uC81C", triggerComponent: _jsx(Button, { variant: "outline", disabled: !checkedCartList.length, children: "\uC120\uD0DD\uC0AD\uC81C" }) }), _jsxs(Row, { className: "items-center gap-3", children: [_jsxs(Row, { className: "gap-1", children: [_jsx(H4, { className: "font-thin", children: "\uCD1D" }), _jsx(H4, { children: checkedCartList.length }), _jsx(H4, { className: "font-thin", children: "\uAC74" })] }), _jsx(H4, { className: "font-thin", children: "\uC8FC\uBB38\uAE08\uC561" }), _jsxs(H4, { children: [checkedCartList
                                            .reduce((acc, cart) => {
                                            if (cart === null || cart.product === null)
                                                return acc;
                                            return acc + cart.product.price * cart.quantity;
                                        }, 0)
                                            .toLocaleString("ko-KR"), "\uC6D0"] }), _jsx(Button, { disabled: !checkedCartList.length, className: "w-40", onClick: handleOrder, children: "\uAD6C\uB9E4\uD558\uAE30" })] })] }) })] }));
};
export default function CartPage() {
    return (_jsx(MainLayout, { children: _jsx(_CartPage, {}) }));
}
