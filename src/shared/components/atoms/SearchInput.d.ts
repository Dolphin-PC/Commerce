import { VariantProps } from "class-variance-authority";
interface Props extends React.ButtonHTMLAttributes<HTMLInputElement>, VariantProps<typeof searchInputVariants> {
}
/**
 * @desc 검색어 input
 */
declare const SearchInput: ({ size, ...props }: Props) => import("react/jsx-runtime").JSX.Element;
export default SearchInput;
declare const searchInputVariants: (props?: ({
    size?: "sm" | "lg" | "md" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
