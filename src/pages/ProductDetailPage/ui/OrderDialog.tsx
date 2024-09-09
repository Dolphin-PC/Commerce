import { useAuthStore } from "@/features/@auth/store/auth.store";
import { Product } from "@/features/product/type/type";
import Row from "@/shared/components/atoms/Row";
import { Button } from "@/shared/components/ui/button";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { toast } from "@/shared/components/ui/use-toast";
import { queryKey } from "@/shared/consts/react-query";
import { useNewOrderHook } from "@/widgets/hook/useNewOrderHook";
import { usePaymentHook } from "@/widgets/hook/usePaymentHook";
import { useQueryClient } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

interface OrderDialogMainProps {
  children: ReactNode;
  trigger: ReactNode;
  product: Omit<Product, "quantity">;
  quantity: Product["quantity"];
}

/**
 * @desc 주문 결제창 Dialog
 */
const OrderDialog = ({ children, trigger, product, quantity }: OrderDialogMainProps) => {
  const [open, setOpen] = useState(false);
  const user = useAuthStore((state) => state.getUser());

  const { handleNewOrder } = useNewOrderHook();
  const { cancelPayment, handlePayment, isConfirmOrder, setIsConfirmOrder, setShipAddress, shipAddress } = usePaymentHook();
  const qc = useQueryClient();

  const _handleOrder = async () => {
    setOpen(false);

    const totalAmount = product.price * quantity;

    try {
      // 1. 주문(주문상세) 생성 (재고 수량 테스트)
      const { order, orderDetail } = await handleNewOrder({ productId: product.id, quantity, userId: user.id });

      // 결제처리
      await handlePayment({ orderId: order.id, totalAmount, productNames: [product.name] }).catch((err) => {
        cancelPayment({ orderId: order.id, orderDetails: [orderDetail] });
        throw err;
      });
    } catch (err) {
      console.error(err);
      let description = "";
      if (typeof err === "string") description = err;
      toast({ title: "상품 결제에 실패했습니다.", description });
      qc.refetchQueries({ queryKey: [queryKey.product] });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>상품 주문</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        {children}

        <Input placeholder="배송지를 입력해주세요." value={shipAddress} onChange={(e) => setShipAddress(e.target.value)} />

        <DialogFooter className="justify-between">
          <Row className="items-center gap-3">
            <Checkbox id="confirm-order" checked={isConfirmOrder} onCheckedChange={(check) => setIsConfirmOrder(!!check)} />
            <label htmlFor="confirm-order">주문 내용을 확인했습니다.</label>
          </Row>
          <Button disabled={!(isConfirmOrder && shipAddress)} onClick={_handleOrder}>
            결제하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
