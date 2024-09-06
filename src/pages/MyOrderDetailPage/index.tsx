import MainLayout from "@/widgets/MainLayout";
import { useParams } from "react-router-dom";

/**
 * @desc 내 주문 상세 페이지
 *  - /my/orders/:id
 */
const _MyOrderDetailPage = () => {
  const { id } = useParams();
  const orderId = Number(id);
  return <div>index</div>;
};

export default function MyOrderDetailPage() {
  return (
    <MainLayout>
      <_MyOrderDetailPage />
    </MainLayout>
  );
}
