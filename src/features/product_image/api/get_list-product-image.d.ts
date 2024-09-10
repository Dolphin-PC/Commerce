import { ProductImage } from "../type/type";
import { Product } from "@/features/product/type/type";
/**
 * @desc 제품 이미지 목록 조회
 */
interface Props {
    productId: Product["id"];
    limit?: number;
}
type Return = ProductImage[];
export declare const getProductImage: ({ productId, limit }: Props) => Promise<Return>;
export declare const useProductImageQuery: (props: Props) => import("@tanstack/react-query").UseQueryResult<Return, Error>;
export {};
