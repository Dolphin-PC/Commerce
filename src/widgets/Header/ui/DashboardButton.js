import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { Store } from "lucide-react";
import { Link } from "react-router-dom";
const DashboardButton = () => {
    return (_jsx(Button, { variant: "outline", size: "icon", asChild: true, children: _jsx(Link, { to: ROUTES.DASHBOARD, children: _jsx(Store, {}) }) }));
};
export default DashboardButton;
