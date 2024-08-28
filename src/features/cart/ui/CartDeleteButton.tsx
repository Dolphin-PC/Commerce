import { Button } from "@/shared/components/ui/button";
import { useDeleteCart } from "../api/delete-cart";
import { Cart } from "../type";
import { toast } from "@/shared/components/ui/use-toast";

interface Props {
  id: Cart["id"];
}

/**
 * @desc 장바구니 상품 삭제 버튼
 */
const CartDeleteButton = ({ id }: Props) => {
  const mtt = useDeleteCart();

  const handleDeleteCart = () => {
    mtt.mutate(
      { id },
      {
        onSuccess: () => {
          toast({ title: "장바구니에서 삭제되었습니다." });
        },
      }
    );
  };

  return <Button onClick={handleDeleteCart}>삭제</Button>;
};

export default CartDeleteButton;
