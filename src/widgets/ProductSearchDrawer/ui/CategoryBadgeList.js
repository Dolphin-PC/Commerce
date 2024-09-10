import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCategoryListQuery } from "@/features/category/api/get_list-category";
import Column from "@/shared/components/atoms/Column";
import { Badge } from "@/shared/components/ui/badge";
import { Fragment } from "react";
import { useSearchDrawerStore } from "../store/useSearchDrawerStore";
/**
 * @desc 검색창 > 카테고리 뱃지 리스트
 */
const CategoryBadgeList = () => {
    const [categoryIds, setCategoryIds] = useSearchDrawerStore((state) => [state.categoryIds, state.setCategoryIds]);
    const { data: category } = useCategoryListQuery({});
    // 카테고리 추가(중복 제거)
    const handleAddCategory = (category) => {
        const set = new Set(categoryIds);
        set.add(category.id);
        setCategoryIds(Array.from(set));
    };
    /** 카테고리 제거 */
    const handleDeleteCategory = (id) => {
        setCategoryIds(categoryIds.filter((categoryId) => categoryId !== id));
    };
    return (_jsxs(Column, { className: "gap-3", children: [_jsx("div", { className: "flex flex-wrap gap-1", children: category?.map((item) => {
                    const isActive = categoryIds.includes(item.id);
                    return (_jsx(Badge, { variant: isActive ? "default" : "outline", onClick: () => handleAddCategory(item), className: "cursor-pointer", children: item.categoryName }, item.id));
                }) }), categoryIds.length > 0 && category && (_jsxs(Fragment, { children: [_jsx("hr", {}), _jsx("div", { className: "flex flex-wrap gap-1", children: categoryIds.map((id) => (_jsx(Badge, { onClick: () => handleDeleteCategory(id), className: "cursor-pointer", children: category.find((item) => item.id === id)?.categoryName }, id))) })] }))] }));
};
export default CategoryBadgeList;
