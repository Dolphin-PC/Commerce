import { ProductImage } from "@/features/product_image/type/type";
import { ProductFormDataType } from "../model/product.zod";
import { ProductCategory } from "../type/type";
interface Props {
    productCategory?: ProductCategory;
    productImages?: ProductImage[];
    onSave: (formData: ProductFormDataType, images: File[]) => void;
}
/**
 * @desc 상품 등록 폼
 * @param {ProductCategory} - 상품 정보(카테고리 포함)
 * @param {ProductImage} - 상품 이미지
 *
 * @example <ProductForm productCategory={productCategory} productImage={productImage} />
 */
declare const ProductForm: ({ productCategory: prdt, productImages, onSave }: Props) => import("react/jsx-runtime").JSX.Element;
export default ProductForm;
