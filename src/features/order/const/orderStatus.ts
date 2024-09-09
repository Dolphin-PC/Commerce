import { OrderStatus } from "../type";

export const orderStatus: Record<OrderStatus, string> = {
  PAY_BEFORE: "결제 전",
  PAY_CANCEL: "결제 취소",
  PAY_COMPLETE: "결제 완료",
  PAY_COMPLETE_CONFIRM: "결제 완료 확인",
  REFUND_REQUEST: "환불 요청",

  //   미사용(enum 삭제가 안됨)
  _REFUND_COMPLETE: "",
  _SELLER_CONFIRM: "",
  _SHIP_COMPLETE: "",
  _SHIPPING: "",
};
