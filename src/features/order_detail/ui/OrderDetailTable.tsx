import { orderStatusObj } from "@/features/order/const/orderStatus";
import { SellerOrderDetail } from "@/features/order_detail/api/get-list-seller-order_detail";
import { orderDetailStatusObj } from "@/features/order_detail/const/orderDetailStatus";
import { Badge } from "@/shared/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { ReactNode } from "react";

interface Props {
  orderDetails?: SellerOrderDetail[];
  tableBody?: ReactNode;
}

/**
 * @desc 대시보드 > 주문내역 Table
 */
const OrderDetailTable = ({ orderDetails, tableBody }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>상품명</TableHead>
          <TableHead>주문수량</TableHead>
          <TableHead>주문금액</TableHead>
          <TableHead className="w-[150px] text-center">결제상태</TableHead>
          <TableHead className="w-[100px] text-center">주문상태</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orderDetails &&
          orderDetails.map((orderDetail) => {
            return (
              <TableRow key={orderDetail.id}>
                <TableCell>{orderDetail.product.name}</TableCell>
                <TableCell>{orderDetail.quantity}</TableCell>
                <TableCell>{(orderDetail.quantity * orderDetail.product.price).toLocaleString("ko-KR")}원</TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{orderStatusObj[orderDetail.order.status]}</Badge>
                </TableCell>
                <TableCell className="text-center">
                  <Badge variant="outline">{orderDetailStatusObj[orderDetail.status]}</Badge>
                </TableCell>
              </TableRow>
            );
          })}
        {tableBody}
      </TableBody>
    </Table>
  );
};

export default OrderDetailTable;
