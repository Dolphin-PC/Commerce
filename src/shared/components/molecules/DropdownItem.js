import { jsx as _jsx } from "react/jsx-runtime";
import Row from "../atoms/Row";
import { DropdownMenuItem } from "../ui/dropdown-menu";
/**
 * @desc DropdownMenuItem Wapper
 */
const DropdownItem = ({ children, onClick }) => {
    return (_jsx(DropdownMenuItem, { className: "cursor-pointer", onClick: onClick, children: _jsx(Row, { className: "items-center gap-2", children: children }) }));
};
export default DropdownItem;
