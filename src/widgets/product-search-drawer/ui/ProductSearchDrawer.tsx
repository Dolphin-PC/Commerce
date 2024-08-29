import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import SearchInput from "@/shared/components/atoms/SearchInput";
import { Lead } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";
import { ROUTES } from "@/shared/consts/route.const";
import { X } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchDrawerStore } from "../store/useSearchDrawerStore";
import CategoryBadgeList from "./CategoryBadgeList";
import PriceRangeSlider from "./PriceRangeSlider";
import { useSearchStore } from "../store/useSearchStore";
import { toast } from "@/shared/components/ui/use-toast";
import { Checkbox } from "@/shared/components/ui/checkbox";

/**
 * @desc 상품 검색
 *  - searchText : 검색어
 *  - categoryIds : 카테고리 배열
 *  - priceRange : 가격 범위
 */
const ProductSearchDrawer = () => {
  const navigate = useNavigate();

  const drawerStore = useSearchDrawerStore();
  const searchStore = useSearchStore();
  const [isCheckPrice, setIsCheckPrice] = useState(!!(searchStore.isEnable && searchStore.priceRange));

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    drawerStore.setSearchText(e.target.value);
  };

  const handleSearch = (e: FormEvent) => {
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
    if (searchStore.isEnable) {
      drawerStore.setSearchText(searchStore.searchText);
      drawerStore.setCategoryIds(searchStore.categoryIds);
      drawerStore.setPriceRange(searchStore.priceRange);
    }
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
            <Row className="items-center gap-3">
              <label htmlFor="price-range">상품 가격</label>
              <Checkbox id="price-range" checked={isCheckPrice} onCheckedChange={() => setIsCheckPrice((p) => !p)} />
            </Row>
            {isCheckPrice && <PriceRangeSlider />}
          </Column>
        </Column>
        <DrawerFooter className="w-1/2 mx-auto">
          <Button variant={"outline"} onClick={handleFilterReset}>
            필터 초기화
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductSearchDrawer;
