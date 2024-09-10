import { FetchQueryOptions } from "@tanstack/react-query";
import { Product, ProductCategory } from "../type/type";
/**
 * 제품 상세 조회(카테고리 포함, 수량 제외)
 */
interface Props {
    id: Product["id"];
    sellerId?: Product["sellerId"];
}
interface Return extends Omit<ProductCategory, "quantity"> {
}
export declare const useProductCategoryQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export declare const useProductCategorySuspenseQuery: (props: Props) => import("@tanstack/react-query").UseSuspenseQueryResult<Return, Error>;
/** preFetching */
export declare const productCategoryPrefetchOptions: (props: Props) => FetchQueryOptions;
export {};
