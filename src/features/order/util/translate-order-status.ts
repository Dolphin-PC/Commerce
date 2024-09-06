import { OrderStatus } from "../type";

/**
 * @desc OrderStatus enum 이름 변환
 */
export const translateOrderStatus = (status: OrderStatus) => {
  switch (status) {
    case "PAY_BEFORE":
      return "결제 전";
    case "PAY_COMPLETE":
      return "결제 완료";
    case "PAY_COMPLETE_CONFIRM":
      return "결제 완료 확인";
    case "REFUND_COMPLETE":
      return "환불 완료";
    case "REFUND_REQUEST":
      return "환불 요청";
    case "SHIPPING":
      return "배송 중";
    case "SELLER_CONFIRM":
      return "판매자 확인";
    case "SHIP_COMPLETE":
      return "배송 완료";
    case "PAY_CANCEL":
      return "결제 취소";
  }
};
