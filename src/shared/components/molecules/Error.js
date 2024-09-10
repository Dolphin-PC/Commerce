import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Column from "../atoms/Column";
import { H2 } from "../atoms/Typography";
import { Ban } from "lucide-react";
import CenterLayout from "../templates/CenterLayout";
const Error = () => {
    return (_jsxs(Column, { className: "items-center", children: [_jsx(Ban, { size: 100, className: "text-red-600" }), _jsx(H2, { children: "\uC5D0\uB7EC\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4." })] }));
};
export default Error;
export const CenterError = ({ children }) => {
    return (_jsxs(CenterLayout, { children: [_jsx(Error, {}), children] }));
};
