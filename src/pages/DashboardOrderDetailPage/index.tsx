import DashBoardLayout from "@/shared/components/templates/DashBoardLayout";
import { useParams } from "react-router-dom";

/**
 * @desc 판매자 주문 상세 페이지
 *  - /dashboard/orders/:id
 */
const _DashboardOrderDetailPage = () => {
  const { id } = useParams();
  const orderId = Number(id);

  return <div>_DashboardOrderDetailPage</div>;
};

export default function DashboardOrderDetailPage() {
  return (
    <DashBoardLayout>
      <_DashboardOrderDetailPage />
    </DashBoardLayout>
  );
}
