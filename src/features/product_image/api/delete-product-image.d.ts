import { ProductImage } from "../type/type";
/**
 * 제품이미지 삭제
 */
type Props = ProductImage;
export declare const deleteProductImage: (props: Props) => Promise<number>;
export declare const useDeleteProductImage: () => import("@tanstack/react-query").UseMutationResult<number, Error, {
    id: number;
    imgUrl: string;
    productId: number;
    thumnailUrl: string;
}, unknown>;
export {};
