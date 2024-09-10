import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LogoIcon from "../molecules/LogoIcon";
import Column from "../atoms/Column";
import Row from "../atoms/Row";
import { ROUTES } from "@/shared/consts/route.const";
import { LayoutDashboard, PackageCheck, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const DashBoardLayout = ({ children }) => {
    return (_jsxs(Row, { className: "items-center", children: [_jsxs(Column, { className: "w-[200px] items-center gap-[10px]", children: [_jsx(LogoIcon, {}), _jsx(Button, { variant: "outline", className: "h-[100px] w-[100px] p-4", asChild: true, children: _jsx(Link, { to: ROUTES.DASHBOARD, children: _jsxs(Column, { className: "items-center gap-[10px]", children: [_jsx(LayoutDashboard, {}), _jsx("small", { children: "\uB300\uC2DC\uBCF4\uB4DC" })] }) }) }), _jsx(Button, { variant: "outline", className: "h-[100px] w-[100px] p-4", asChild: true, children: _jsx(Link, { to: ROUTES.DASHBOARD__PRODUCTS, children: _jsxs(Column, { className: "items-center gap-[10px]", children: [_jsx(ShoppingCart, {}), _jsx("small", { children: "\uC0C1\uD488" })] }) }) }), _jsx(Button, { variant: "outline", className: "h-[100px] w-[100px] p-4", asChild: true, children: _jsx(Link, { to: ROUTES.DASHBOARD__ORDERS, children: _jsxs(Column, { className: "items-center gap-[10px]", children: [_jsx(PackageCheck, {}), _jsx("small", { children: "\uC8FC\uBB38\uB0B4\uC5ED" })] }) }) })] }), _jsx("div", { className: "bg-slate-100 w-full h-screen p-5 overflow-scroll", children: children })] }));
};
export default DashBoardLayout;
