import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import Row from "../atoms/Row";
import { Muted } from "../atoms/Typography";
import { Button } from "../ui/button";
import { CenterError } from "./Error";
import { ROUTES } from "@/shared/consts/route.const";
const ErrorFallback = ({ error, resetErrorBoundary }) => {
    console.error(error);
    return (_jsxs(CenterError, { children: [_jsx("div", { className: "w-1/2 p-4 m-2 bg-slate-100 rounded-md", children: _jsx(Muted, { children: error.message }) }), _jsxs(Row, { className: "gap-3", children: [_jsx(Button, { variant: "destructive", onClick: resetErrorBoundary, children: "\uC7AC\uC2DC\uB3C4" }), _jsx(Button, { variant: "default", asChild: true, onClick: resetErrorBoundary, children: _jsx(Link, { to: ROUTES.HOME, children: "\uD648\uC73C\uB85C" }) })] })] }));
};
export default ErrorFallback;
