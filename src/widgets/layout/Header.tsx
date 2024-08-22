import { signOut } from "@/entities/@auth/sign-out.api";
import { useAuthStore } from "@/features/auth/auth.store";
import LogoIcon from "@/shared/components/molecules/LogoIcon";
import { toast } from "@/shared/components/ui/use-toast";
import { ROUTES } from "@/shared/consts/route.const";
import { Link } from "react-router-dom";
import Row from "../../shared/components/styles/Row";
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
    <Row className="w-full justify-between gap-[40px]">
      <LogoIcon />
      {!user && (
        <Link to={ROUTES.SIGNIN}>
          <Button>로그인</Button>
        </Link>
      )}
      {user && <Button onClick={handleSignOut}>로그아웃</Button>}
    </Row>
  );
};

export default Header;
