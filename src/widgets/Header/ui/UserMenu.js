import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import CartIconButton from "@/features/cart/ui/CartIconButton";
import DropdownItem from "@/shared/components/molecules/DropdownItem";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { ROUTES } from "@/shared/consts/route.const";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserActionHook } from "../hook/useUserActionHook";
import DashboardButton from "./DashboardButton";
import LogoutButton from "./LogoutButton";
/**
 * @desc 로그인 한 사용자 메뉴
 */
const UserMenu = () => {
    const navigate = useNavigate();
    const user = useAuthStore((state) => state.user);
    const { handleSignOut } = useUserActionHook();
    if (!user)
        return null;
    return (_jsxs(DropdownMenu, { children: [_jsx(DropdownMenuTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", "data-testid": "user-icon-button", children: _jsx(CircleUserRound, {}) }) }), _jsxs(DropdownMenuContent, { className: "min-w-fit w-80", children: [_jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "\uB0B4 \uACC4\uC815" }), _jsxs(DropdownItem, { onClick: () => navigate(ROUTES.MY), children: [_jsx(Button, { variant: "outline", size: "icon", children: _jsx(CircleUserRound, {}) }), _jsx(DropdownMenuLabel, { children: "\uB0B4 \uC815\uBCF4" })] }), _jsxs(DropdownItem, { onClick: () => navigate(ROUTES.CART), children: [_jsx(CartIconButton, { userId: user.id }), _jsx(DropdownMenuLabel, { children: "\uC7A5\uBC14\uAD6C\uB2C8" })] })] }), _jsx(DropdownMenuSeparator, {}), user.isseller && (_jsxs(DropdownMenuGroup, { children: [_jsx(DropdownMenuLabel, { children: "\uD310\uB9E4\uC790" }), _jsxs(DropdownItem, { onClick: () => navigate(ROUTES.DASHBOARD), children: [_jsx(DashboardButton, {}), _jsx(DropdownMenuLabel, { children: "\uB300\uC2DC\uBCF4\uB4DC" })] })] })), _jsx(DropdownMenuSeparator, {}), _jsx(DropdownMenuGroup, { children: _jsxs(DropdownItem, { onClick: handleSignOut, children: [_jsx(LogoutButton, {}), _jsx(DropdownMenuLabel, { children: "\uB85C\uADF8\uC544\uC6C3" })] }) })] })] }));
};
export default UserMenu;
