import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@/shared/lib/shadcn-util";
import Header from "../Header";
const MainLayout = ({ children, className, mainClassName, headerChildren, subHeaderChildren }) => {
    if (!headerChildren) {
        headerChildren = (_jsx(Header, { children: _jsx(Header.SearchDrawer, {}) }));
    }
    return (_jsxs("div", { className: className, children: [_jsxs("div", { className: "sticky top-0 z-50", children: [_jsx("div", { className: "bg-white p-4", style: { boxShadow: "0px 2px 2px -2px gray" }, children: headerChildren }), subHeaderChildren && subHeaderChildren] }), _jsx("main", { className: cn("container mt-8 mb-2", mainClassName), children: children })] }));
};
export default MainLayout;
