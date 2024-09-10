import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Loader } from "lucide-react";
import Column from "../atoms/Column";
import { H4 } from "../atoms/Typography";
import CenterLayout from "../templates/CenterLayout";
const Loading = ({ text = "로딩 중입니다." }) => {
    return (_jsxs(Column, { className: "items-center", children: [_jsx(Loader, { size: 100, className: "text-red-600" }), _jsx(H4, { children: text })] }));
};
export const CenterLoading = () => {
    return (_jsx(CenterLayout, { children: _jsx(Loading, {}) }));
};
export default Loading;
