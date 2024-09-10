import { jsx as _jsx } from "react/jsx-runtime";
const CenterLayout = ({ children }) => {
    return (_jsx("div", { className: "flex flex-col justify-center items-center h-screen", children: children }));
};
export default CenterLayout;
