import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Loading from "@/shared/components/molecules/Loading";
import { Button } from "@/shared/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/shadcn-util";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useCategoryListQuery } from "../api/get_list-category";
/**
 * @desc 카테고리 선택 콤보박스
 * - 내부에서 카테고리 목록을 조회하여 사용
 */
const CategoryComboBox = ({ onSelect, defaultCategoryId }) => {
    const [open, setOpen] = useState(false);
    const { data: categoryList, isLoading } = useCategoryListQuery({});
    const [selected, setSelected] = useState(null);
    const handleSelect = (categoryName) => {
        if (!categoryList)
            throw new Error("Category list is not loaded");
        if (categoryName === "전체") {
            setSelected(null);
            onSelect(0);
            setOpen(false);
            return;
        }
        const category = categoryList.find((c) => c.categoryName === categoryName);
        if (!category)
            throw new Error(`Category not found: ${categoryName}`);
        setSelected(category);
        onSelect(category.id);
        setOpen(false);
    };
    /** categoryId 기본값 설정 */
    useEffect(() => {
        if (defaultCategoryId && categoryList) {
            const category = categoryList.find((c) => c.id === defaultCategoryId);
            if (!category)
                throw new Error(`Category not found: ${defaultCategoryId}`);
            setSelected(category);
        }
    }, [defaultCategoryId, categoryList]);
    if (isLoading)
        return _jsx(Loading, {});
    if (!categoryList)
        return _jsx("p", { children: "\uB4F1\uB85D\uB41C \uCE74\uD14C\uACE0\uB9AC\uAC00 \uC5C6\uC5B4\uC694." });
    return (_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", role: "combobox", "aria-expanded": open, className: "w-[200px] justify-between", children: [selected ? selected.categoryName : "카테고리 선택", _jsx(ChevronsUpDown, { className: "ml-2 h-4 w-4 shrink-0 opacity-50" })] }) }), _jsx(PopoverContent, { className: "w-[200px] p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search category..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "\uAC80\uC0C9\uB41C \uCE74\uD14C\uACE0\uB9AC\uAC00 \uC5C6\uC5B4\uC694." }), _jsxs(CommandGroup, { children: [_jsxs(CommandItem, { value: "\uC804\uCCB4", onSelect: () => handleSelect("전체"), children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", selected?.categoryName === "전체" ? "opacity-100" : "opacity-0") }), "\uC804\uCCB4"] }, "all"), categoryList.map((c) => (_jsxs(CommandItem, { value: c.categoryName, onSelect: handleSelect, children: [_jsx(Check, { className: cn("mr-2 h-4 w-4", selected?.categoryName === c.categoryName ? "opacity-100" : "opacity-0") }), c.categoryName] }, c.id)))] })] })] }) })] }));
};
export default CategoryComboBox;
