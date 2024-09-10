import { jsx as _jsx } from "react/jsx-runtime";
const Grid = ({ children, className }) => {
    return _jsx("div", { className: `grid ${className}`, children: children });
};
export default Grid;
