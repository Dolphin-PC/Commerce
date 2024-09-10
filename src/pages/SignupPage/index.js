import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SignUpForm } from "@/features/@auth/ui/SignUpForm";
import Column from "@/shared/components/atoms/Column";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";
const _SignupPage = () => {
    return (_jsxs(Column, { className: "items-center gap-[10px]", children: [_jsxs(Card, { className: "w-[350px] flex flex-col", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\uD68C\uC6D0\uAC00\uC785" }) }), _jsx(CardContent, { children: _jsx(SignUpForm, {}) })] }), _jsx(Link, { to: ROUTES.SIGNIN, children: _jsx(Button, { variant: "outline", children: "\uB85C\uADF8\uC778" }) })] }));
};
export default function SignupPage() {
    return (_jsx(CenterLayout, { children: _jsx(_SignupPage, {}) }));
}
