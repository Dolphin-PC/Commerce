import Loading from "@/shared/components/molecules/Loading";
import { Button } from "@/shared/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover";
import { cn } from "@/shared/lib/shadcn-util";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useCategoryListQuery } from "../api/get_list-category";
import { Category } from "../model/type";

interface Props {
  defaultCategoryId?: number;
  onSelect: (id: number) => void;
}

/**
 * @desc 카테고리 선택 콤보박스
 * - 내부에서 카테고리 목록을 조회하여 사용
 */
const CategoryComboBox = ({ onSelect, defaultCategoryId }: Props) => {
  const [open, setOpen] = useState(false);

  const { data: categoryList, isLoading } = useCategoryListQuery({});
  const [selected, setSelected] = useState<Category | null>(null);

  const handleSelect = (categoryName: string) => {
    if (!categoryList) throw new Error("Category list is not loaded");

    if (categoryName === "전체") {
      setSelected(null);
      onSelect(0);
      setOpen(false);
      return;
    }

    const category = categoryList.find((c) => c.categoryName === categoryName);
    if (!category) throw new Error(`Category not found: ${categoryName}`);

    setSelected(category);
    onSelect(category.id);
    setOpen(false);
  };

  /** categoryId 기본값 설정 */
  useEffect(() => {
    if (defaultCategoryId && categoryList) {
      const category = categoryList.find((c) => c.id === defaultCategoryId);
      if (!category) throw new Error(`Category not found: ${defaultCategoryId}`);

      setSelected(category);
    }
  }, [defaultCategoryId, categoryList]);

  if (isLoading) return <Loading />;
  if (!categoryList) return <p>등록된 카테고리가 없어요.</p>;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
          {selected ? selected.categoryName : "카테고리 선택"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>검색된 카테고리가 없어요.</CommandEmpty>
            <CommandGroup>
              <CommandItem key="all" value="전체" onSelect={() => handleSelect("전체")}>
                <Check className={cn("mr-2 h-4 w-4", selected?.categoryName === "전체" ? "opacity-100" : "opacity-0")} />
                전체
              </CommandItem>
              {categoryList.map((c) => (
                <CommandItem key={c.id} value={c.categoryName} onSelect={handleSelect}>
                  <Check className={cn("mr-2 h-4 w-4", selected?.categoryName === c.categoryName ? "opacity-100" : "opacity-0")} />
                  {c.categoryName}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryComboBox;
