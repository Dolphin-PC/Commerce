import { OrderDetailStatus } from "../type";

export const orderDetailStatus: Record<OrderDetailStatus, string> = {
  PAY_BEFORE: "결제 전",
  ORDER_COMPLETE: "주문 완료",
  ORDER_CANCEL: "주문 취소",
  SHIP_WAIT: "배송 대기",
  SHIP_START: "배송 시작",
  SHIP_COMPLETE: "배송 완료",
};
