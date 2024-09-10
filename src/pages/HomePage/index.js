import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MainLayout from "@/widgets/MainLayout";
import CategoryProductList from "./ui/CategoryProductList";
import { HomePageHelmet } from "../Helmets";
import { Fragment } from "react/jsx-runtime";
const _HomePage = () => {
    return (_jsx(Fragment, { children: _jsx(CategoryProductList, {}) }));
};
export default function HomePage() {
    return (_jsxs(MainLayout, { children: [_jsx(HomePageHelmet, {}), _jsx(_HomePage, {})] }));
}
