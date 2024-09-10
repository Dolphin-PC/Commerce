import { jsx as _jsx } from "react/jsx-runtime";
import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
/**
 * @desc 판매자 주문 상세 페이지
 *  - /dashboard/orders/:id
 */
const _DashboardOrderDetailPage = () => {
    return _jsx("div", { children: "_DashboardOrderDetailPage" });
};
export default function DashboardOrderDetailPage() {
    return (_jsx(DashBoardLayout, { children: _jsx(_DashboardOrderDetailPage, {}) }));
}
