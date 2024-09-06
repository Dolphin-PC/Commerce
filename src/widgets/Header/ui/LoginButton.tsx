import { useAuthStore } from "@/features/@auth/store/auth.store";
import { Button } from "@/shared/components/ui/button";
import { ROUTES } from "@/shared/consts/route.const";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  const user = useAuthStore((state) => state.user);

  if (user) return null;
  return (
    <Fragment>
      <Link to={ROUTES.SIGNIN}>
        <Button>로그인</Button>
      </Link>
    </Fragment>
  );
};

export default LoginButton;
