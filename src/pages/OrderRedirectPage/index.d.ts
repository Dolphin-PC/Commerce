/**
 * @desc 결제 완료시, Redirect
 *  - queryParam
 *   - paymentId: 결제 ID
 *   - code: 결제 상태 코드
 *   - message: 결제 상태 메시지
 * @see https://developers.portone.io/opi/ko/integration/start/v2/checkout?v=v2#3-%EA%B2%B0%EC%A0%9C-%EC%99%84%EB%A3%8C-%EC%B2%98%EB%A6%AC-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80
 */
declare const OrderRediretPage: () => import("react/jsx-runtime").JSX.Element;
export default OrderRediretPage;
