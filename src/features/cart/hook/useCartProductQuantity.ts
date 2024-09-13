import { getProductQuantity } from "@/features/product/api/get-product-quantity";
import { Product } from "@/features/product/type/type";
import { Cart } from "../type";
import { useEffect, useState } from "react";

interface Props {
  cart: Cart;
  product: Product;
}
interface Return {
  isLoading: boolean;
  enable: boolean;
  remainQuantity: number;
}

/**
 * @desc 장바구니 상품의 재고확인
 */
export const useCartProductQuantity = ({ cart, product }: Props): Return => {
  const [isLoading, setIsLoading] = useState(true);
  const [enable, setEnable] = useState(false);
  const [remainQuantity, setRemainQuantity] = useState(0);

  const confirmQuantity = async () => {
    const { quantity } = await getProductQuantity({ id: product.id });

    setRemainQuantity(quantity);
    setEnable(cart.quantity <= quantity);

    setIsLoading(false);
  };

  useEffect(() => {
    confirmQuantity();
  }, []);

  return {
    isLoading,
    enable,
    remainQuantity,
  };
};
