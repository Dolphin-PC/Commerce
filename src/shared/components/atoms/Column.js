import { jsx as _jsx } from "react/jsx-runtime";
export const Column = ({ children, className }) => {
    return _jsx("div", { className: `flex flex-col ${className ? className : ""}`, children: children });
};
export default Column;
