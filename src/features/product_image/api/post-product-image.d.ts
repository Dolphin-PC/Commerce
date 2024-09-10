import { ProductImage } from "../type/type";
/**
 * @desc 제품이미지 등록
 *  - 500*500 사이즈 (imgUrl)
 *  - 200*200 사이즈 (thumbnailUrl)
 */
interface Props {
    productId: number;
    file: File;
}
type Return = ProductImage;
export declare const addProductImage: ({ file, productId }: Props) => Promise<Return>;
export declare const useAddProductImage: () => import("@tanstack/react-query").UseMutationResult<{
    id: number;
    imgUrl: string;
    productId: number;
    thumnailUrl: string;
}, Error, Props, unknown>;
export {};
