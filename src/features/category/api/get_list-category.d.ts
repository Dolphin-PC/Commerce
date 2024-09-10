/**
 * 카테고리 이름으로 목록 조회
 */
import { Category } from "../model/type";
import { Tables } from "@/shared/config/@db/database-generated.type";
interface Props {
    categoryName?: Tables<"category">["categoryName"];
}
type Return = Category[];
export declare const getCategoryList: ({ categoryName }: Props) => Promise<Return>;
export declare const useCategoryListQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};
