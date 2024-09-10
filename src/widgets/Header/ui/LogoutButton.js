import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@/shared/components/ui/button";
import { LogOut } from "lucide-react";
const LogoutButton = () => {
    return (_jsx(Button, { size: "icon", variant: "outline", children: _jsx(LogOut, {}) }));
};
export default LogoutButton;
