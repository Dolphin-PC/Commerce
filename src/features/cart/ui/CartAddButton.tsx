import { Product } from "@/features/product/type/type";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { useCartPost } from "../api/post-cart";
import { useAuthStore } from "@/features/@auth/store/auth.store";

interface Props {
  productCount: number;
  product: Product;
}

/**
 * @desc 장바구니담기 버튼
 */
const CartAddButton = ({ product, productCount }: Props) => {
  const user = useAuthStore((state) => state.user);

  const mtt = useCartPost();

  const handleAddCart = () => {
    if (!user) throw new Error("로그인이 필요합니다.");

    if (productCount === 0) {
      toast({
        title: "장바구니 담기 실패",
        description: "1개 이상의 수량을 선택해주세요.",
      });
      return;
    }

    mtt.mutate({ productId: product.id, quantity: productCount, userId: user.id });

    toast({
      title: "장바구니 담기 성공",
      description: `[${product.name}] ${productCount}개를 장바구니에 담았습니다.`,
    });
  };

  return <Button onClick={handleAddCart}>장바구니 담기</Button>;
};

export default CartAddButton;
