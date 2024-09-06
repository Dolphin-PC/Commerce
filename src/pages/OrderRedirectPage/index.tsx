import { CenterError } from "@/shared/components/molecules/Error";
import { CenterLoading } from "@/shared/components/molecules/Loading";
import CenterLayout from "@/shared/components/templates/CenterLayout";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useConfirmOrder } from "./hook/useConfirmOrder";

/**
 * @desc 결제 완료시, Redirect
 *  - queryParam
 *   - paymentId: 결제 ID
 *   - code: 결제 상태 코드
 *   - message: 결제 상태 메시지
 * @see https://developers.portone.io/opi/ko/integration/start/v2/checkout?v=v2#3-%EA%B2%B0%EC%A0%9C-%EC%99%84%EB%A3%8C-%EC%B2%98%EB%A6%AC-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80
 */
const OrderRediretPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paymentId = searchParams.get("paymentId");
  const code = searchParams.get("code");
  const message = searchParams.get("message");

  const [isConfirmLoading, setIsConfirmLoading] = useState(true);

  const { getOrder, handleConfirmOrder } = useConfirmOrder();

  useEffect(() => {
    if (!paymentId) {
      navigate(ROUTES.HOME);
      return;
    }

    getOrder(paymentId).then((order) => {
      if (order.status !== "PAY_COMPLETE") {
        navigate(ROUTES.HOME);
        return;
      }

      handleConfirmOrder(paymentId).then(() => {
        setIsConfirmLoading(false);
      });
    });
  }, []);

  if (isConfirmLoading) {
    return <CenterLoading />;
  }

  if (code && message) {
    return (
      <CenterLayout>
        <CenterError>
          <div className="w-1/2 p-4 m-2 bg-slate-100 rounded-md">{message}</div>
        </CenterError>
      </CenterLayout>
    );
  }

  return (
    <CenterLayout>
      <CheckCircle size={100} className="text-green-600" />
      <div className="w-1/2 p-4 m-2 bg-slate-100 rounded-md text-center">결제가 완료되었습니다.</div>
      <Button asChild>
        <Link to={ROUTES.HOME}>홈으로 이동</Link>
      </Button>
    </CenterLayout>
  );
};

export default OrderRediretPage;
