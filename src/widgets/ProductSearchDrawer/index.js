import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import SearchInput from "@/shared/components/atoms/SearchInput";
import { Lead } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";
import { ROUTES } from "@/shared/consts/route.const";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchDrawerStore } from "./store/useSearchDrawerStore";
import CategoryBadgeList from "./ui/CategoryBadgeList";
import PriceRangeSlider from "./ui/PriceRangeSlider";
import { useSearchStore } from "./store/useSearchStore";
import { toast } from "@/shared/components/ui/use-toast";
import { Checkbox } from "@/shared/components/ui/checkbox";
/**
 * @desc 상품 검색창 하단 Drawer
 */
const ProductSearchDrawer = () => {
    const navigate = useNavigate();
    const drawerStore = useSearchDrawerStore();
    const searchStore = useSearchStore();
    const [isCheckPrice, setIsCheckPrice] = useState(!!(searchStore.isEnable && searchStore.priceRange));
    const handleChangeSearchText = (e) => {
        drawerStore.setSearchText(e.target.value);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        searchStore.setSearchText(drawerStore.searchText);
        searchStore.setCategoryIds(drawerStore.categoryIds);
        searchStore.setPriceRange(isCheckPrice ? drawerStore.priceRange : null);
        searchStore.setIsEnable(true);
        drawerStore.setIsOpen(false);
        navigate(ROUTES.PRODUCTS);
    };
    const handleFilterReset = () => {
        drawerStore.reset();
        searchStore.reset();
        setIsCheckPrice(false);
        toast({ title: "검색 조건이 초기화 되었습니다." });
    };
    useEffect(() => {
        if (searchStore.isEnable && drawerStore.isOpen) {
            drawerStore.setSearchText(searchStore.searchText);
            drawerStore.setCategoryIds(searchStore.categoryIds);
            searchStore.priceRange && drawerStore.setPriceRange(searchStore.priceRange);
        }
    }, [drawerStore.isOpen]);
    return (_jsxs(Drawer, { direction: "bottom", handleOnly: true, open: drawerStore.isOpen, onOpenChange: drawerStore.setIsOpen, children: [_jsx(DrawerTrigger, { children: _jsx("div", { className: "w-[300px]", children: _jsx(SearchInput, { size: "md", value: drawerStore.searchText, onChange: handleChangeSearchText }) }) }), _jsxs(DrawerContent, { direction: "bottom", className: "h-5/6", "aria-describedby": "", children: [_jsxs(DrawerHeader, { className: "hidden", children: [_jsx(DrawerTitle, { children: "\uAC80\uC0C9\uCC3D" }), _jsx(DrawerClose, { asChild: true, children: _jsx(Button, { variant: "outline", children: _jsx(X, {}) }) })] }), _jsxs(Column, { className: "items-center mt-5 gap-5 w-1/2 mx-auto", children: [_jsx("form", { onSubmit: handleSearch, className: "w-full", children: _jsxs(Row, { className: "gap-3 h-full", children: [_jsx(SearchInput, { size: "lg", value: drawerStore.searchText, onChange: handleChangeSearchText }), _jsx(Button, { type: "submit", variant: "default", className: "h-full", children: "\uAC80\uC0C9" })] }) }), _jsxs(Column, { className: "gap-2 w-full", children: [_jsx(Lead, { children: "\uCE74\uD14C\uACE0\uB9AC" }), _jsx(CategoryBadgeList, {})] }), _jsxs(Column, { className: "gap-2 w-full", children: [_jsxs(Row, { className: "items-center gap-3", children: [_jsx("label", { htmlFor: "price-range", children: "\uC0C1\uD488 \uAC00\uACA9" }), _jsx(Checkbox, { id: "price-range", checked: isCheckPrice, onCheckedChange: () => setIsCheckPrice((p) => !p) })] }), isCheckPrice && _jsx(PriceRangeSlider, {})] })] }), _jsx(DrawerFooter, { className: "w-1/2 mx-auto", children: _jsx(Button, { variant: "outline", onClick: handleFilterReset, children: "\uD544\uD130 \uCD08\uAE30\uD654" }) })] })] }));
};
export default ProductSearchDrawer;
