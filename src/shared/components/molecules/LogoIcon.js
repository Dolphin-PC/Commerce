import { jsx as _jsx } from "react/jsx-runtime";
import { ROUTES } from "@/shared/consts/route.const";
import { Banana } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const LogoIcon = () => {
    return (_jsx(Button, { className: "w-16 h-16 bg-yellow-400", asChild: true, children: _jsx(Link, { to: ROUTES.HOME, children: _jsx(Banana, {}) }) }));
};
export default LogoIcon;
