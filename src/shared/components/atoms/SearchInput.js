import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cva } from "class-variance-authority";
import { Input } from "../ui/input";
import { cn } from "@/shared/lib/shadcn-util";
import { Search } from "lucide-react";
/**
 * @desc 검색어 input
 */
const SearchInput = ({ size, ...props }) => {
    return (_jsxs("div", { className: "relative w-full", children: [_jsx(Search, { className: "absolute left-2 top-1/2 trasform -translate-y-1/2 text-gray-400" }), _jsx(Input, { type: "text", placeholder: "\uAC80\uC0C9\uC5B4\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.", className: cn(searchInputVariants({ size }), "pl-10"), ...props })] }));
};
export default SearchInput;
const searchInputVariants = cva("", {
    variants: {
        size: {
            sm: "h-8",
            md: "p-4 h-10",
            lg: "p-6 h-12",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
