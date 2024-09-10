import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/shadcn-util";
import { ShoppingCart } from "lucide-react";
import { useCartListQuery } from "../api/get_list-cart";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/consts/route.const";
/**
 * @desc 장바구니 아이콘 버튼
 */
const CartIconButton = ({ userId }) => {
    const { data } = useCartListQuery({ userId });
    return (_jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "outline", size: "icon", asChild: true, children: _jsx(Link, { to: ROUTES.CART, children: _jsx(ShoppingCart, {}) }) }), data && data.length > 0 && (_jsxs(Fragment, { children: [_jsx("div", { className: cn(rightCenter, size, "bg-red-500 rounded-full") }), _jsx("span", { className: cn(rightCenter, size, "text-white text-center"), children: data.length })] }))] }));
};
const rightCenter = "absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2";
const size = "w-6 h-6";
export default CartIconButton;
