import { usePutOrderDetail } from "@/features/order_detail/api/put-order_detail";
import { orderDetailStatusObj } from "@/features/order_detail/const/orderDetailStatus";
import { OrderDetail, OrderDetailStatus } from "@/features/order_detail/type";
import { ConfirmDialog } from "@/shared/components/molecules/ConfirmDialog";
import { Button } from "@/shared/components/ui/button";
import { toast } from "@/shared/components/ui/use-toast";
import { ObjectEntries } from "@/shared/lib/object";
import { useState } from "react";

interface Props {
  orderDetail: OrderDetail;
}

/**
 * @desc 주문내역 > 주문상태 변경 다이얼로그
 */
const OrderStatusDialog = ({ orderDetail }: Props) => {
  const [selectedValue, setSelectedValue] = useState<OrderDetailStatus>(orderDetail.status);

  const putOrderDetailMutation = usePutOrderDetail();

  // 다이얼로그가 열릴 때, 값 초기화
  const handleOpenInit = (open: boolean) => {
    if (open) setSelectedValue(orderDetail.status);
  };

  const handleChangeConfirm = async () => {
    if (selectedValue === orderDetail.status) return;
    await putOrderDetailMutation.mutateAsync({
      id: orderDetail.id,
      update: {
        status: selectedValue,
      },
    });

    toast({
      title: "주문 상태가 변경되었습니다.",
    });
  };

  return (
    <ConfirmDialog
      title="주문상태"
      description="변경하시려는 주문상태를 선택해주세요."
      confirmText="변경"
      confirmAction={handleChangeConfirm}
      cancelText="취소"
      onOpenChange={handleOpenInit}
      triggerComponent={<Button variant="outline">주문상태 변경</Button>}
    >
      <select value={selectedValue} onChange={(e) => setSelectedValue(e.target.value as OrderDetailStatus)}>
        {(Object.entries(orderDetailStatusObj) as ObjectEntries<Record<OrderDetailStatus, string>>).map(([key, value]) => {
          if (key === "ORDER_WAIT") return null;
          return (
            <option key={key} value={key}>
              {value}
            </option>
          );
        })}
      </select>
    </ConfirmDialog>
  );
};

export default OrderStatusDialog;
