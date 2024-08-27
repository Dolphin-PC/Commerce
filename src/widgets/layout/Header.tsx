import { signOut } from "@/features/@auth/api/sign-out";
import { useAuthStore } from "@/features/@auth/store/auth.store";
import CartIconButton from "@/features/cart/ui/CartIconButton";
import LogoIcon from "@/shared/components/molecules/LogoIcon";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";
import Row from "../../shared/components/atoms/Row";
import { Button } from "../../shared/components/ui/button";

const Header = () => {
  const user = useAuthStore((state) => state.user);
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
    <div className="container">
      <Row className="w-full justify-between gap-[40px] items-center">
        <LogoIcon />
        {!user && (
          <Link to={ROUTES.SIGNIN}>
            <Button>로그인</Button>
          </Link>
        )}
        {user && (
          <Row className="gap-5">
            <CartIconButton userId={user.id} />
            <Button onClick={handleSignOut}>로그아웃</Button>
          </Row>
        )}
      </Row>
    </div>
  );
};

export default Header;
