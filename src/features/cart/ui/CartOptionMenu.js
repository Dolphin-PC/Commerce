import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { CircleEllipsis } from "lucide-react";
import CartDeleteButton from "./CartDeleteButton";
import CartUpdateButton from "./CartUpdateButton";
/**
 * 장바구니 옵션 드롭다운 메뉴
 */
const CartOptionMenu = ({ cart }) => {
    return (_jsx("div", { className: "relative", children: _jsx("div", { className: "absolute top-0 left-0", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", children: _jsx(CircleEllipsis, {}) }) }), _jsxs(DropdownMenuContent, { children: [_jsx(DropdownMenuLabel, { children: "\uC7A5\uBC14\uAD6C\uB2C8" }), _jsx(DropdownMenuSeparator, {}), _jsx(CartDeleteButton, { id: cart.id, isNeedConfirm: true }), _jsx(CartUpdateButton, { id: cart.id })] })] }) }) }));
};
export default CartOptionMenu;
