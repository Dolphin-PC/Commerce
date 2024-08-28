import Column from "@/shared/components/atoms/Column";
import { CartProductCategory } from "../type";
import CartProductCard from "./CartProductCard";

interface Props {
  data: CartProductCategory[];
}

/**
 * @desc 장바구니 상품 목록 리스트
 */
const CartProductCardList = ({ data }: Props) => {
  return (
    <Column className="ml-2 mr-2 gap-2 overflow-scroll scrollbar-hide">
      {data.map((cart) => (
        <CartProductCard key={cart.id} cart={cart} />
      ))}
    </Column>
  );
};

export default CartProductCardList;
