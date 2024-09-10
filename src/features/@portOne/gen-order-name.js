/**
 * @desc 아임포트 orderName 생성
 *  - 주문상세 > 상품명을 +로 결합하여 생성
 *  - 최대 20자 제한
 */
export const genOrderName = ({ productNames }) => {
    if (productNames.length === 0)
        return "주문";
    const orderNames = productNames.map((name) => name);
    const orderName = orderNames.join(" + ");
    return orderName.length > 20 ? `${orderName.slice(0, 20)}...` : orderName;
};
