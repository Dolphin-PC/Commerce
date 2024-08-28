import { useCategoryListQuery } from "@/features/category/api/get_list-category";
import { Category } from "@/features/category/model/type";
import Column from "@/shared/components/atoms/Column";
import { Badge } from "@/shared/components/ui/badge";
import { Fragment, useMemo, useState } from "react";
import { useSearchStore } from "../store/useSearchStore";

/**
 * @desc 검색창 > 카테고리 뱃지 리스트
 */
const CategoryBadgeList = () => {
  const [categoryIds, setCategoryIds] = useSearchStore((state) => [state.categoryIds, state.setCategoryIds]);
  const { data: category } = useCategoryListQuery({});

  // 카테고리 추가(중복 제거)
  const handleAddCategory = (category: Category) => {
    const set = new Set(categoryIds);
    set.add(category.id);
    setCategoryIds(Array.from(set));
  };

  /** 카테고리 제거 */
  const handleDeleteCategory = (id: Category["id"]) => {
    setCategoryIds(categoryIds.filter((categoryId) => categoryId !== id));
  };

  return (
    <Column className="gap-3">
      <div className="flex flex-wrap gap-1">
        {category?.map((item) => {
          const isActive = categoryIds.includes(item.id);
          return (
            <Badge key={item.id} variant={isActive ? "default" : "outline"} onClick={() => handleAddCategory(item)} className="cursor-pointer">
              {item.categoryName}
            </Badge>
          );
        })}
      </div>

      {/* 선택된 카테고리 */}
      {categoryIds.length > 0 && category && (
        <Fragment>
          <hr />
          <div className="flex flex-wrap gap-1">
            {categoryIds.map((id) => (
              <Badge key={id} onClick={() => handleDeleteCategory(id)} className="cursor-pointer">
                {category.find((item) => item.id === id)?.categoryName}
              </Badge>
            ))}
          </div>
        </Fragment>
      )}
    </Column>
  );
};

export default CategoryBadgeList;
