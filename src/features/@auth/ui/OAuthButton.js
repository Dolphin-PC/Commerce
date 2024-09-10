import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import GoogleIcon from "@/shared/assets/icons/google.svg?react";
import { Button } from "@/shared/components/ui/button";
export { GoogleLoginButton };
const GoogleLoginButton = ({ onClick }) => {
    return (_jsxs(Button, { variant: "outline", className: "flex items-center w-full gap-[5px] pl-0 pr-3", onClick: onClick, children: [_jsx(GoogleIcon, {}), _jsx("span", { children: "Google\uB85C \uB85C\uADF8\uC778" })] }));
};
