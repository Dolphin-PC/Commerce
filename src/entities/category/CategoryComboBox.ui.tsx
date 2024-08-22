import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";

import { cn } from "@/shared/lib/shadcn-util";
import { Check, ChevronsUpDown } from "lucide-react";

import { ProductFormDataType } from "@/features/product/product.zod";
import { useEffect, useState } from "react";
import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import { getCategoryList } from "./category.api";
import { Category } from "./type";

interface Props {
  field: ControllerRenderProps<ProductFormDataType>;
  form: UseFormReturn<ProductFormDataType>;
}

const CategoryComboBox = ({ field, form }: Props) => {
  const [open, setOpen] = useState(false);

  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    getCategoryList().then((res) => {
      setCategoryList(res);
    });
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {field.value
            ? categoryList.find((c) => c.categoryName === field.value)
                ?.categoryName
            : "카테고리 선택"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search category..." />
          <CommandList>
            <CommandEmpty>검색된 카테고리가 없어요.</CommandEmpty>
            <CommandGroup>
              {categoryList.map((c) => (
                <CommandItem
                  key={c.id}
                  value={c.categoryName}
                  onSelect={(categoryName) => {
                    form.setValue("categoryName", categoryName);
                    form.trigger("categoryName");
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      field.value === c.categoryName
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
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
