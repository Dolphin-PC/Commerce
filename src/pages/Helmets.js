import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";
/**
 * @desc 페이지들의 Helmet
 */
const title = "Banana Shop";
export const HomePageHelmet = () => {
    return (_jsx(Helmet, { children: _jsx("title", { children: title }) }));
};
export const ProductPageHelmet = () => {
    return (_jsx(Helmet, { children: _jsxs("title", { children: [title, " | \uC0C1\uD488 \uBAA9\uB85D"] }) }));
};
export const ProductDetailPageHelmet = () => {
    return (_jsx(Helmet, { children: _jsxs("title", { children: [title, " | \uC0C1\uD488 \uC0C1\uC138"] }) }));
};
export const DashBoardPageHelmet = () => {
    return (_jsx(Helmet, { children: _jsxs("title", { children: [title, " | \uB300\uC2DC\uBCF4\uB4DC"] }) }));
};
