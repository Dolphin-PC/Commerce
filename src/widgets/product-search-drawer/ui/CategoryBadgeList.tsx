import { useCategoryListQuery } from "@/features/category/api/get_list-category";
import { Category } from "@/features/category/model/type";
import Column from "@/shared/components/atoms/Column";
import { Badge } from "@/shared/components/ui/badge";
import { Fragment, useMemo, useState } from "react";

/**
 * @desc 검색창 > 카테고리 뱃지 리스트
 */
const CategoryBadgeList = () => {
  const { data: category } = useCategoryListQuery({});
  const categoryObj = useMemo(() => {
    return category?.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as Record<number, Category>);
  }, [category]);

  const [selectedCategoryList, setSelectedCategoryList] = useState<Category["id"][]>([]);

  // 카테고리 추가(중복 제거)
  const handleAddCategory = (category: Category) => {
    setSelectedCategoryList((prev) => {
      const set = new Set(prev);
      set.add(category.id);
      return Array.from(set);
    });
  };

  /** 카테고리 제거 */
  const handleDeleteCategory = (id: Category["id"]) => {
    setSelectedCategoryList((prev) => prev.filter((item) => item !== id));
  };

  return (
    <Column className="gap-3">
      <div className="flex flex-wrap gap-1">
        {category?.map((item) => {
          const isActive = selectedCategoryList.includes(item.id);
          return (
            <Badge key={item.id} variant={isActive ? "default" : "outline"} onClick={() => handleAddCategory(item)} className="cursor-pointer">
              {item.categoryName}
            </Badge>
          );
        })}
      </div>

      {selectedCategoryList.length > 0 && categoryObj && (
        <Fragment>
          <hr />
          <div className="flex flex-wrap gap-1">
            {selectedCategoryList.map((id) => (
              <Badge key={id} onClick={() => handleDeleteCategory(id)} className="cursor-pointer">
                {categoryObj[id].categoryName}
              </Badge>
            ))}
          </div>
        </Fragment>
      )}
    </Column>
  );
};

export default CategoryBadgeList;
