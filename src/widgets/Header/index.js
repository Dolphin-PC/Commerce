import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import LogoIcon from "@/shared/components/molecules/LogoIcon";
import Row from "../../shared/components/atoms/Row";
import ProductSearchDrawer from "../ProductSearchDrawer";
import UserMenu from "./ui/UserMenu";
import LoginButton from "./ui/LoginButton";
/**
 * @desc 공통 헤더
 */
const Header = ({ children }) => {
    return (_jsx("div", { className: "container", children: _jsxs(Row, { className: "w-full justify-between items-center", children: [_jsx(LogoIcon, {}), children, _jsxs(Row, { className: "gap-[40px]", children: [_jsx(LoginButton, {}), _jsx(UserMenu, {})] })] }) }));
};
Header.SearchDrawer = ProductSearchDrawer;
export default Header;
