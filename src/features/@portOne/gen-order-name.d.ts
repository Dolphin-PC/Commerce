import { Product } from "../product/type/type";
interface Props {
    productNames: Product["name"][];
}
/**
 * @desc 아임포트 orderName 생성
 *  - 주문상세 > 상품명을 +로 결합하여 생성
 *  - 최대 20자 제한
 */
export declare const genOrderName: ({ productNames }: Props) => string;
export {};
