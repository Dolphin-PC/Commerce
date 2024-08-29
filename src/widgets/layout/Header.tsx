import { signOut } from "@/features/@auth/api/sign-out";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import CartIconButton from "@/features/cart/ui/CartIconButton";
import LogoIcon from "@/shared/components/molecules/LogoIcon";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";
import Row from "../../shared/components/atoms/Row";
import { Button } from "../../shared/components/ui/button";
import { LogOut, Store } from "lucide-react";
import TooltipHover from "@/shared/components/molecules/TooltipHover";
import ProductSearchDrawer from "../product-search-drawer/ui/ProductSearchDrawer";

/**
 * @desc 공통 헤더
 */
const Header = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="container">
      <Row className="w-full justify-between items-center">
        <LogoIcon />
        <ProductSearchDrawer />

        <Row className="gap-[40px]">
          {!user && (
            <Link to={ROUTES.SIGNIN}>
              <Button>로그인</Button>
            </Link>
          )}
          {user && (
            <Row className="gap-5">
              {user.isseller && <DashboardButton />}
              <CartIconButton userId={user.id} />
              <LogoutButton />
            </Row>
          )}
        </Row>
      </Row>
    </div>
  );
};
export default Header;

const DashboardButton = () => {
  return (
    <TooltipHover
      triggerComponent={
        <Button variant="outline" size="icon" asChild>
          <Link to={ROUTES.DASHBOARD}>
            <Store />
          </Link>
        </Button>
      }
      tooltipContent={"판매자 대시보드"}
    />
  );
};

const LogoutButton = () => {
  const setSignedIn = useAuthStore((state) => state.setSignedIn);

  const handleSignOut = () => {
    signOut().then(() => {
      setSignedIn(null);
      toast({
        title: "로그아웃 되었습니다.",
      });
    });
  };
  return (
    <TooltipHover
      triggerComponent={
        <Button onClick={handleSignOut} size={"icon"} variant={"outline"}>
          <LogOut />
        </Button>
      }
      tooltipContent={"로그아웃"}
    />
  );
};
