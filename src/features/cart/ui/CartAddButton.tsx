import { Product_Quantity } from "@/features/product/type/type";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { useCartPost } from "../api/post-cart";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import { Link } from "react-router-dom";
import { ROUTES } from "@/shared/consts/route.const";

interface Props {
  productCount: number;
  product: Product_Quantity;
}

/**
 * @desc 장바구니담기 버튼
 */
const CartAddButton = ({ product, productCount }: Props) => {
  const user = useAuthStore((state) => state.user);

  const mtt = useCartPost();

  const handleAddCart = () => {
    if (!user) {
      toast({
        title: "로그인이 필요해요.",
        action: (
          <Button variant="outline" asChild>
            <Link to={ROUTES.SIGNIN}>로그인 페이지 이동</Link>
          </Button>
        ),
      });
      return;
    }

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

  return (
    <Button onClick={handleAddCart} disabled={productCount === 0}>
      장바구니 담기
    </Button>
  );
};

export default CartAddButton;
