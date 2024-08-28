import { cva, VariantProps } from "class-variance-authority";
import { Input } from "../ui/input";
import { cn } from "@/shared/lib/shadcn-util";
import { Search } from "lucide-react";

interface Props extends React.ButtonHTMLAttributes<HTMLInputElement>, VariantProps<typeof searchInputVariants> {}

/**
 * @desc 검색어 input
 */
const SearchInput = ({ size, ...props }: Props) => {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 trasform -translate-y-1/2 text-gray-400" />
      <Input type="text" placeholder="검색어를 입력해주세요." className={cn(searchInputVariants({ size }), "pl-10")} {...props} />
    </div>
  );
};

export default SearchInput;

const searchInputVariants = cva("", {
  variants: {
    size: {
      sm: "h-8",
      md: "p-4 h-10",
      lg: "p-6 h-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});
