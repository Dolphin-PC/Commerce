import { useAuthStore } from "@/features/@auth/store/auth.store";
import CartIconButton from "@/features/cart/ui/CartIconButton";
import DropdownItem from "@/shared/components/molecules/DropdownItem";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { ROUTES } from "@/shared/consts/route.const";
import { CircleUserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserActionHook } from "../hook/useUserActionHook";
import DashboardButton from "./DashboardButton";
import LogoutButton from "./LogoutButton";

/**
 * @desc 로그인 한 사용자 메뉴
 */
const UserMenu = () => {
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const { handleSignOut } = useUserActionHook();

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" data-testid="user-icon-button">
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-fit w-80">
        {/* 내 계정 */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>내 계정</DropdownMenuLabel>

          <DropdownItem onClick={() => navigate(ROUTES.MY)}>
            <Button variant="outline" size="icon">
              <CircleUserRound />
            </Button>
            <DropdownMenuLabel>내 정보</DropdownMenuLabel>
          </DropdownItem>

          <DropdownItem onClick={() => navigate(ROUTES.CART)}>
            <CartIconButton userId={user.id} />
            <DropdownMenuLabel>장바구니</DropdownMenuLabel>
          </DropdownItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* 판매자 */}
        {user.isseller && (
          <DropdownMenuGroup>
            <DropdownMenuLabel>판매자</DropdownMenuLabel>
            <DropdownItem onClick={() => navigate(ROUTES.DASHBOARD)}>
              <DashboardButton />
              <DropdownMenuLabel>대시보드</DropdownMenuLabel>
            </DropdownItem>
          </DropdownMenuGroup>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownItem onClick={handleSignOut}>
            <LogoutButton />
            <DropdownMenuLabel>로그아웃</DropdownMenuLabel>
          </DropdownItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
