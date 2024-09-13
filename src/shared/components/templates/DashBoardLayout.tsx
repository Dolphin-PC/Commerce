import { ROUTES } from "@/shared/consts/route.const";
import { Banana, DoorOpen, LayoutDashboard, PackageCheck, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import Column from "../atoms/Column";
import Row from "../atoms/Row";
import { Button } from "../ui/button";

interface Props {
  children: React.ReactNode;
}
const DashBoardLayout = ({ children }: Props) => {
  return (
    <Row className="items-center">
      <Column className="h-screen items-center justify-between py-10">
        <Button variant="ghost" className="h-[100px] w-[100px] p-4 bg-yellow-200" asChild>
          <Link to={ROUTES.DASHBOARD}>
            <Banana />
          </Link>
        </Button>
        <Column className="w-[200px] items-center gap-[10px]">
          <Button variant="outline" className="h-[100px] w-[100px] p-4" asChild>
            <Link to={ROUTES.DASHBOARD}>
              <Column className="items-center gap-[10px]">
                <LayoutDashboard />
                <small>대시보드</small>
              </Column>
            </Link>
          </Button>
          <Button variant="outline" className="h-[100px] w-[100px] p-4" asChild>
            <Link to={ROUTES.DASHBOARD__PRODUCTS}>
              <Column className="items-center gap-[10px]">
                <ShoppingCart />
                <small>상품</small>
              </Column>
            </Link>
          </Button>
          <Button variant="outline" className="h-[100px] w-[100px] p-4" asChild>
            <Link to={ROUTES.DASHBOARD__ORDERS}>
              <Column className="items-center gap-[10px]">
                <PackageCheck />
                <small>주문내역</small>
              </Column>
            </Link>
          </Button>
        </Column>
        <Button variant="ghost" className="h-[100px] w-[100px] p-4" asChild>
          <Link to={ROUTES.HOME}>
            <Column className="items-center gap-[10px]">
              <DoorOpen />
              <small>홈으로</small>
            </Column>
          </Link>
        </Button>
      </Column>

      <div className="bg-slate-100 w-full h-screen p-5 overflow-scroll">{children}</div>
    </Row>
  );
};

export default DashBoardLayout;
