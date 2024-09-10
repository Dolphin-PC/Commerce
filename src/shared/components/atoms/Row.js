import { jsx as _jsx } from "react/jsx-runtime";
const Row = ({ children, className }) => {
    return _jsx("div", { className: `flex flex-row ${className ? className : ""}`, children: children });
};
export default Row;
