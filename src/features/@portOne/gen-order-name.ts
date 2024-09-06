import { Product } from "../product/type/type";

interface Props {
  products: Product[];
}

/**
 * @desc 아임포트 orderName 생성
 *  - 주문상세 > 상품명을 +로 결합하여 생성
 *  - 최대 20자 제한
 */
export const genOrderName = ({ products }: Props): string => {
  if (products.length === 0) return "주문";

  const orderNames = products.map((product) => product.name);
  const orderName = orderNames.join(" + ");

  return orderName.length > 20 ? `${orderName.slice(0, 20)}...` : orderName;
};
