import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { useDeleteCart } from "../api/delete-cart";
import { Cart } from "../type";

interface Props {
  id: Cart["id"];
  isNeedConfirm?: boolean;
}

/**
 * @desc 장바구니 상품 삭제 버튼
 */
const CartDeleteButton = ({ id, isNeedConfirm }: Props) => {
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

  if (isNeedConfirm) {
    return (
      <ConfirmDialog
        title="장바구니 삭제"
        description="정말 삭제하시겠습니까?"
        cancelText="취소"
        cancelAction={() => {}}
        confirmAction={handleDeleteCart}
        confirmText="삭제"
        triggerComponent={
          <Button variant={"ghost"} size={"icon"} className="w-full">
            삭제
          </Button>
        }
      />
    );
  }

  return (
    <Button variant={"ghost"} size={"icon"} onClick={handleDeleteCart} className="w-full">
      삭제
    </Button>
  );
};

export default CartDeleteButton;
