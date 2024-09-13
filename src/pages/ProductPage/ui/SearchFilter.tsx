import { useCategoryListQuery } from "@/features/category/api/get_list-category";
import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import { T } from "@/shared/components/atoms/Typography";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { useSearchDrawerStore } from "@/widgets/ProductSearchDrawer/store/useSearchDrawerStore";
import { useSearchStore } from "@/widgets/ProductSearchDrawer/store/useSearchStore";
import { Plus, SlidersHorizontal } from "lucide-react";

const SearchFilter = () => {
  const searchFilter = useSearchStore((state) => state.getSearch());
  const drawerStore = useSearchDrawerStore((state) => ({ setIsOpen: state.setIsOpen }));
  const { data: categorys } = useCategoryListQuery({});

  if (searchFilter === null)
    return (
      <Button size={"icon"} onClick={() => drawerStore.setIsOpen(true)} variant="outline">
        <SlidersHorizontal size={20} />
      </Button>
    );

  return (
    <div onClick={() => drawerStore.setIsOpen(true)}>
      <Row className="gap-5">
        <Column className="gap-2">
          <Row className="gap-1 items-center">
            {categorys &&
              searchFilter.categoryIds
                .map((categoryId) => {
                  const category = categorys.filter((c) => c.id === categoryId)[0];
                  return (
                    <Badge key={category.id} size="small" variant="outline">
                      {category.categoryName}
                    </Badge>
                  );
                })
                .slice(0, 5)}
            {searchFilter.categoryIds.length > 5 && <Plus />}
          </Row>
          {searchFilter.priceRange && (
            <T.Small>
              가격범위 : {searchFilter.priceRange[0].toLocaleString("ko-KR")} ~ {searchFilter.priceRange[1].toLocaleString("ko-KR")}
            </T.Small>
          )}
        </Column>
        <Button size={"icon"}>
          <SlidersHorizontal size={20} />
        </Button>
      </Row>
    </div>
  );
};

export default SearchFilter;
