import { ProductImage } from "@/features/product_image/type/type";
interface Props {
    images: File[];
    setImages: React.Dispatch<React.SetStateAction<File[]>>;
    savedImages?: ProductImage[];
}
/**
 * @desc 이미지 업로드 섹션
 */
declare const ProductImageSection: ({ images, setImages, savedImages }: Props) => import("react/jsx-runtime").JSX.Element;
export default ProductImageSection;
