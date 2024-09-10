import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { H2 } from "@/shared/components/atoms/Typography";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { DashBoardPageHelmet } from "../Helmets";
const _DashBoardPage = () => {
    return _jsx(H2, { children: "\uB300\uC2DC\uBCF4\uB4DC" });
};
export default function DashBoardPage() {
    return (_jsxs(DashBoardLayout, { children: [_jsx(DashBoardPageHelmet, {}), _jsx(_DashBoardPage, {})] }));
}
