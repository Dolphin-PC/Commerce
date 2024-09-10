import { Product } from "@/features/product/type/type";
import { ReactNode } from "react";
import { ProductImage } from "../type/type";
/**
 * @desc 상품 이미지 캐러셀
 *  - Container : 상품 데이터를 조회해서 표시하는 컴포넌트
 *  - Presenter : 상품 데이터를 Props로 받아서 표시하는 컴포넌트
 */
declare const ProductImageCarousel: {
    Container: typeof Container;
    Presenter: typeof Presenter;
};
export default ProductImageCarousel;
interface Props {
    isButton?: boolean;
    height: number;
}
interface ContainerProps extends Props {
    productId: Product["id"];
}
interface PresenterProps extends Props {
    data: ProductImage[];
}
/** 상품 이미지 캐러셀 컨테이너 */
declare function Container(props: ContainerProps): ReactNode;
/** 상품 이미지 캐러셀 프레젠터 */
declare function Presenter({ data, height, isButton }: PresenterProps): ReactNode;
