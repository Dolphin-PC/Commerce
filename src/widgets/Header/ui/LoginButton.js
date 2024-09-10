import { jsx as _jsx } from "react/jsx-runtime";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { Fragment } from "react";
import { Link } from "react-router-dom";
const LoginButton = () => {
    const user = useAuthStore((state) => state.user);
    if (user)
        return null;
    return (_jsx(Fragment, { children: _jsx(Link, { to: ROUTES.SIGNIN, children: _jsx(Button, { children: "\uB85C\uADF8\uC778" }) }) }));
};
export default LoginButton;
