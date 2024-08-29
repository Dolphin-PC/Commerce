import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import SearchInput from "@/shared/components/atoms/SearchInput";
import { Lead } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";
import { ROUTES } from "@/shared/consts/route.const";
import { X } from "lucide-react";
import { FormEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchDrawerStore } from "../store/useSearchDrawerStore";
import CategoryBadgeList from "./CategoryBadgeList";
import PriceRangeSlider from "./PriceRangeSlider";

/**
 * @desc 상품 검색
 *  - searchText : 검색어
 *  - categoryIds : 카테고리 배열
 *  - priceRange : 가격 범위
 */
const ProductSearchDrawer = () => {
  const navigate = useNavigate();

  const drawerStore = useSearchDrawerStore((state) => ({
    searchText: state.searchText,
    setSearchText: state.setSearchText,
    onSearch: state.onSearch,
    isOpen: state.isOpen,
    setIsOpen: state.setIsOpen,
    initSearch: state.initSearch,
  }));

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();

    drawerStore.onSearch();
    drawerStore.setIsOpen(false);
    navigate(ROUTES.PRODUCTS);
  };

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    drawerStore.setSearchText(e.target.value);
  };

  useEffect(() => {
    drawerStore.initSearch();
  }, []);

  return (
    <Drawer direction="bottom" handleOnly open={drawerStore.isOpen} onOpenChange={drawerStore.setIsOpen}>
      <DrawerTrigger>
        <div className="w-[300px]">
          <SearchInput size={"md"} value={drawerStore.searchText} onChange={handleChangeSearchText} />
        </div>
      </DrawerTrigger>
      <DrawerContent direction={"bottom"} className="h-5/6" aria-describedby="">
        <DrawerHeader className="hidden">
          <DrawerTitle>검색창</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="outline">
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <Column className="items-center mt-5 gap-5 w-1/2 mx-auto">
          {/* 검색 Input Form */}
          <form onSubmit={handleSearch} className="w-full">
            <Row className="gap-3 h-full">
              <SearchInput size={"lg"} value={drawerStore.searchText} onChange={handleChangeSearchText} />
              <Button type="submit" variant="default" className="h-full">
                검색
              </Button>
            </Row>
          </form>

          {/* 카테고리 뱃지 목록 */}
          <Column className="gap-2 w-full">
            <Lead>카테고리</Lead>
            <CategoryBadgeList />
          </Column>

          {/* 상품가격 범위 */}
          <Column className="gap-2 w-full">
            <Lead>상품 가격</Lead>
            <PriceRangeSlider />
          </Column>
        </Column>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductSearchDrawer;
