import { Product, ProductCategory } from "../type/type";
import { Category } from "@/features/category/model/type";
/**
 * @desc 제품 목록 조회 (카테고리 포함, 페이지네이션)
 */
interface Props {
    sellerId?: Product["sellerId"];
    categoryId?: Category["id"];
    pageNumber?: number;
    pageSize?: number;
    order?: {
        column: "createdAt" | "price";
        ascending: boolean;
    };
    filter?: {
        searchText: string;
        categoryIds: Category["id"][];
        priceRange: number[] | null;
    } | null;
}
interface Return {
    data: ProductCategory[];
    /** 조회된 데이터의 개수와 pageSize를 비교하여 도출 */
    hasNextPage: boolean;
    nextPageNumber: number;
}
/** 무한 스크롤 */
export declare const useProductListCategoryInfiniteQuery: (props: Props) => import("@tanstack/react-query").UseSuspenseInfiniteQueryResult<import("@tanstack/react-query").InfiniteData<Return, unknown>, Error>;
/** 목록 조회 */
export declare const useProductListCategoryQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};
