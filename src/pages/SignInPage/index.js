import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signInOAuth } from "@/features/@auth/api/sign-in-oauth";
import { GoogleLoginButton } from "@/features/@auth/ui/OAuthButton";
import { SignInForm } from "@/features/@auth/ui/SignInForm";
import Column from "@/shared/components/atoms/Column";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";
const _SignInPage = () => {
    return (_jsxs(Column, { className: "items-center gap-[10px]", children: [_jsxs(Card, { className: "w-[350px] flex flex-col", children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "\uB85C\uADF8\uC778" }) }), _jsx(CardContent, { children: _jsx(SignInForm, {}) }), _jsx(CardFooter, { children: _jsx(GoogleLoginButton, { onClick: () => signInOAuth({ provider: "google" }) }) })] }), _jsx(Link, { to: ROUTES.SIGNUP, children: _jsx(Button, { variant: "outline", children: "\uD68C\uC6D0\uAC00\uC785" }) })] }));
};
export default function SignInPage() {
    return (_jsx(CenterLayout, { children: _jsx(_SignInPage, {}) }));
}
