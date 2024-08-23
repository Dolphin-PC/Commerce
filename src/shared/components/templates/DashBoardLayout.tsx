import LogoIcon from "../molecules/LogoIcon";
import Column from "../atoms/Column";
import Row from "../atoms/Row";

import { ROUTES } from "@/shared/consts/route.const";
import { LayoutDashboard, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface Props {
  children: React.ReactNode;
}
const DashBoardLayout = ({ children }: Props) => {
  return (
    <Row>
      <Column className="w-[200px] items-center gap-[10px]">
        <LogoIcon />
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
      </Column>

      <div className="bg-slate-100 w-full h-screen p-5 overflow-scroll">
        {children}
      </div>
    </Row>
  );
};

export default DashBoardLayout;
