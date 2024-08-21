import LogoIcon from "../atoms/LogoIcon";
import Column from "../styles/Column";
import Row from "../styles/Row";

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
      <Column gap={10} className="w-[200px] items-center">
        <LogoIcon />
        <Button variant="outline" className="h-[100px] w-[100px] p-4" asChild>
          <Link to={ROUTES.DASHBOARD}>
            <Column gap={10} className="items-center">
              <LayoutDashboard />
              <small>대시보드</small>
            </Column>
          </Link>
        </Button>
        <Button variant="outline" className="h-[100px] w-[100px] p-4" asChild>
          <Link to={ROUTES.PRODUCTS}>
            <Column gap={10} className="items-center">
              <ShoppingCart />
              <small>상품</small>
            </Column>
          </Link>
        </Button>
      </Column>

      <div className="bg-slate-100 w-full h-screen p-5">{children}</div>
    </Row>
  );
};

export default DashBoardLayout;
