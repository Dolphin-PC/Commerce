import Column from "@/shared/components/atoms/Column";
import Row from "@/shared/components/atoms/Row";
import SearchInput from "@/shared/components/atoms/SearchInput";
import { Lead } from "@/shared/components/atoms/Typography";
import { Button } from "@/shared/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/shared/components/ui/drawer";
import { X } from "lucide-react";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryBadgeList from "./CategoryBadgeList";
import PriceRange from "./PriceRange";

/**
 * @desc 상품 검색
 *  - search : 검색어
 *  - tag : 태그
 *  - categoryId : 카테고리
 */
const ProductSearchDrawer = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    navigate("/products");
  };

  const handleChangeSearchText = (e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value);

  return (
    <Drawer direction="bottom" handleOnly>
      <DrawerTrigger>
        <div className="w-[300px]">
          <SearchInput size={"md"} value={searchText} onChange={handleChangeSearchText} />
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
          <form onSubmit={handleSearch} className="w-full">
            <Row className="gap-3 h-full">
              <SearchInput size={"lg"} value={searchText} onChange={handleChangeSearchText} />
              <Button type="submit" variant="default" className="h-full">
                검색
              </Button>
            </Row>
          </form>

          <Column className="gap-2 w-full">
            <Lead>카테고리</Lead>
            <CategoryBadgeList />
          </Column>
          <Column className="gap-2 w-full">
            <Lead>상품 가격</Lead>
            <PriceRange />
          </Column>
        </Column>
        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ProductSearchDrawer;
